import { Role, SignalingClient } from 'amazon-kinesis-video-streams-webrtc';
import AWS from 'aws-sdk';
import { flow, makeAutoObservable } from 'mobx';
import { RootStore } from '../root';
import RouterStore from '../routerStore';
import { IStore } from '../types';
import { AWSCredential, Master, Viewer } from './types';

export default class RTCStore implements IStore {
  store: RootStore;
  router: RouterStore;

  channelName: string = 'default_Channel';
  channelARN: string = '';

  rtcConfiguration: any = {};

  awsCredential: AWSCredential = {
    region: process.env.NEXT_PUBLIC_AWS_REGION || '',
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '',
  };
  kinesisVideoClient: AWS.KinesisVideo = new AWS.KinesisVideo({
    ...this.awsCredential,
    correctClockSkew: true,
  });

  master: Master = {
    signalingClient: null,
    endpointsByProtocol: null,
    peerConnectionByClientId: {},
  };
  viewer: Viewer = {
    signalingClient: null,
    endpointsByProtocol: null,
  };

  role: Role = Role.MASTER;

  constructor(store: RootStore) {
    this.store = store;
    this.router = store.routerStore;
    makeAutoObservable(this, {
      createSignalingChannel: flow,
    });
  }
  loadData(data: any) {}
  *createSignalingChannel(): any {
    try {
      yield this.kinesisVideoClient
        .createSignalingChannel({
          ChannelName: this.channelName,
        })
        .promise();

      const describeSignalingChannelResponse = yield this.kinesisVideoClient
        .describeSignalingChannel({
          ChannelName: this.channelName,
        })
        .promise();

      this.channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
    } catch (error) {
      return '';
    }

    return this.channelARN;
  }

  *getChannelARN(): any {
    const describeSignalingChannelResponse = yield this.kinesisVideoClient
      .describeSignalingChannel({
        ChannelName: this.channelName,
      })
      .promise();

    const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;

    return channelARN;
  }

  *createSignalingClient(role: Role): any {
    this.role = role;

    this.channelARN = yield this.getChannelARN();

    const getSignalingChannelEndpointResponse: any =
      yield this.kinesisVideoClient
        .getSignalingChannelEndpoint({
          ChannelARN: this.channelARN,
          SingleMasterChannelEndpointConfiguration: {
            Protocols: ['WSS', 'HTTPS'],
            Role: this.role,
          },
        })
        .promise();

    const endpointsByProtocol =
      getSignalingChannelEndpointResponse.ResourceEndpointList.reduce(
        (endpoints: any, endpoint: any) => {
          endpoints[endpoint.Protocol] = endpoint.ResourceEndpoint;
          return endpoints;
        },
        {}
      );
    const params: any = {
      channelARN: this.channelARN,
      channelEndpoint: endpointsByProtocol.WSS,
      role: role,
      region: this.awsCredential.region,
      credentials: {
        accessKeyId: this.awsCredential.accessKeyId,
        secretAccessKey: this.awsCredential.secretAccessKey,
      },
      systemClockOffset: this.kinesisVideoClient.config.systemClockOffset,
    };
    if (role === Role.MASTER) {
      this.master.signalingClient = new SignalingClient(params);
      this.master.endpointsByProtocol = endpointsByProtocol;
    } else {
      params.clientId = Math.random().toString(36).substring(2).toUpperCase();

      this.viewer.signalingClient = new SignalingClient(params);
      this.master.endpointsByProtocol = endpointsByProtocol;
    }
  }

  *getRTCConfiguration(): any {
    const kinesisVideoSignalingChannelsClient =
      new AWS.KinesisVideoSignalingChannels({
        region: this.awsCredential.region,
        accessKeyId: this.awsCredential.accessKeyId,
        secretAccessKey: this.awsCredential.secretAccessKey,
        endpoint:
          this.role === Role.MASTER
            ? this.master.endpointsByProtocol.HTTPS
            : this.viewer.endpointsByProtocol.HTTPS,
        correctClockSkew: true,
      });

    const getIceServerConfigResponse = yield kinesisVideoSignalingChannelsClient
      .getIceServerConfig({
        ChannelARN: this.channelARN,
      })
      .promise();

    const iceServers = [];

    iceServers.push({
      urls: `stun:stun.kinesisvideo.${this.awsCredential.region}.amazonaws.com:443`,
    });

    getIceServerConfigResponse.IceServerList.forEach((iceServer: any) =>
      iceServers.push({
        urls: iceServer.Uris,
        username: iceServer.Username,
        credential: iceServer.Password,
      })
    );

    const configuration: any = {
      iceTransportPolicy: 'all',
      iceServers,
    };

    return configuration;
  }

  // 시험자의 영상 시작
  *startMaster(stream: MediaStream, channelName: string): any {
    this.channelName = channelName;
    try {
      yield this.createSignalingChannel();
    } catch (error) {
      console.error(`${channelName}채널이 존재합니다.`);
    }

    try {
      yield this.createSignalingClient(Role.MASTER);
    } catch (error) {
      console.error(error);
    }

    try {
      this.rtcConfiguration = yield this.getRTCConfiguration();
    } catch (error) {
      console.error('getConfiguration Error!');
    }

    this.master.signalingClient.on('open', async () => {
      console.info('[MASTER] Connected to signaling service');
    });

    this.master.signalingClient.on(
      'sdpOffer',
      async (offer: any, remoteClientId: any) => {
        console.info(
          '[MASTER] Received SDP offer from client: ' + remoteClientId
        );

        const peerConnection = new RTCPeerConnection(this.rtcConfiguration);
        // @ts-ignore
        this.master.peerConnectionByClientId[remoteClientId] = peerConnection;

        // Send any ICE candidates to the other peer
        peerConnection.addEventListener('icecandidate', ({ candidate }) => {
          if (candidate) {
            console.info(
              '[MASTER] Generated ICE candidate for client: ' + remoteClientId
            );
            this.master.signalingClient!.sendIceCandidate(
              candidate,
              remoteClientId
            );
          } else {
            console.info(
              '[MASTER] All ICE candidates have been generated for client: ' +
                remoteClientId
            );
          }
        });

        if (stream) {
          stream
            .getTracks()
            .forEach((track: any) =>
              peerConnection.addTrack(track, stream as MediaStream)
            );
        }

        await peerConnection.setRemoteDescription(offer);
        console.info(
          '[MASTER] Creating SDP answer for client: ' + remoteClientId
        );

        await peerConnection.setLocalDescription(
          await peerConnection.createAnswer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
          })
        );

        // When trickle ICE is enabled, send the answer now and then send ICE candidates as they are generated. Otherwise wait on the ICE candidates.
        console.info(
          '[MASTER] Sending SDP answer to client: ' + remoteClientId
        );
        this.master.signalingClient!.sendSdpAnswer(
          peerConnection.localDescription!,
          remoteClientId
        );
        console.info(
          '[MASTER] Generating ICE candidates for client: ' + remoteClientId
        );
      }
    );

    this.master.signalingClient.on(
      'iceCandidate',
      async (candidate: any, remoteClientId: any) => {
        console.info(
          '[MASTER] Received ICE candidate from client: ' + remoteClientId
        );

        // Add the ICE candidate received from the client to the peer connection
        const peerConnection =
          this.master.peerConnectionByClientId[remoteClientId];
        peerConnection.addIceCandidate(candidate);
      }
    );

    this.master.signalingClient.on('close', () => {
      console.info('[MASTER] Disconnected from signaling channel');
    });

    this.master.signalingClient.on('error', () => {
      console.error('[MASTER] Signaling client error');
    });
    console.info('[MASTER] Starting master connection');
    this.master.signalingClient.open();
  }

  *startViewer(channelName: string): any {
    this.channelName = channelName;
    try {
      yield this.createSignalingChannel();
    } catch (error) {
      console.error(`${this.channelName}채널이 존재합니다.`);
    }

    try {
      yield this.createSignalingClient(Role.VIEWER);
    } catch (error) {
      console.error(error);
    }

    try {
      this.rtcConfiguration = yield this.getRTCConfiguration();
    } catch (error) {
      console.error('getConfiguration Error!');
    }

    this.viewer.peerConnection = new RTCPeerConnection(this.rtcConfiguration);

    this.viewer.signalingClient.on('open', async () => {
      console.info('[VIEWER] Connected to signaling service');
      // Create an SDP offer to send to the master
      console.info('[VIEWER] Creating SDP offer');
      await this.viewer.peerConnection.setLocalDescription(
        await this.viewer.peerConnection.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        })
      );
      // When trickle ICE is enabled, send the offer now and then send ICE candidates as they are generated. Otherwise wait on the ICE candidates.
      console.info('[VIEWER] Sending SDP offer');

      this.viewer.signalingClient.sendSdpOffer(
        this.viewer.peerConnection.localDescription
      );

      console.info('[VIEWER] Generating ICE candidates');
    });

    this.viewer.signalingClient.on('sdpAnswer', async (answer: any) => {
      // Add the SDP answer to the peer connection
      console.info('[VIEWER] Received SDP answer');
      await this.viewer.peerConnection.setRemoteDescription(answer);
    });

    this.viewer.signalingClient.on('iceCandidate', (candidate: any) => {
      // Add the ICE candidate received from the MASTER to the peer connection
      console.info('[VIEWER] Received ICE candidate');
      this.viewer.peerConnection.addIceCandidate(candidate);
    });

    this.viewer.signalingClient.on('close', () => {
      console.info('[VIEWER] Disconnected from signaling channel');
    });

    this.viewer.signalingClient.on('error', (error: any) => {
      console.error('[VIEWER] Signaling client error: ', error);
    });

    // Send any ICE candidates to the other peer
    this.viewer.peerConnection.addEventListener(
      'icecandidate',
      ({ candidate }: any) => {
        if (candidate) {
          console.info('[VIEWER] Generated ICE candidate');

          // When trickle ICE is enabled, send the ICE candidates as they are generated.
          console.info('[VIEWER] Sending ICE candidate');
          this.viewer.signalingClient.sendIceCandidate(candidate);
        } else {
          console.info('[VIEWER] All ICE candidates have been generated');
          // When trickle ICE is disabled, send the offer now that all the ICE candidates have ben generated.
          console.info('[VIEWER] Sending SDP offer');
          this.viewer.signalingClient.sendSdpOffer(
            this.viewer.peerConnection.localDescription
          );
        }
      }
    );

    // As remote tracks are received, add them to the remote view
    this.viewer.peerConnection.addEventListener(
      'track',
      (event: { streams: any[] }) => {
        console.info('[VIEWER] Received remote track');
        this.viewer.remoteStreams.push(event.streams[0]);
      }
    );

    console.info('[VIEWER] Starting viewer connection');
    this.viewer.signalingClient.open();
  }

  stop() {
    if (this.role === Role.VIEWER) {
      this.viewer.signalingClient.close();
      this.viewer.signalingClient = null;

      this.viewer.peerConnection.close();
      this.viewer.peerConnection = null;

      this.viewer.remoteStreams
        ?.getTracks()
        ?.forEach((track: { stop: () => any }) => track.stop());
      this.viewer.remoteStreams = null;
    } else {
      this.master.signalingClient.close();
      this.master.signalingClient = null;

      Object.keys(this.master.peerConnectionByClientId).forEach((clientId) => {
        this.master.peerConnectionByClientId[clientId].close();
      });

      this.master.peerConnectionByClientId = [];
    }
  }
}
