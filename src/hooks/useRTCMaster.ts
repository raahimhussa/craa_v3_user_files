import { Role, SignalingClient } from 'amazon-kinesis-video-streams-webrtc';
import AWS from 'aws-sdk';
import { useEffect } from 'react';

type KVSConfig = {
  channelName: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  useTrickleICE: boolean;
};

type Master = {
  signalingClient: SignalingClient | null;
  peerConnectionByClientId: any;
  stream: MediaStream | null;
};

export const useRTCMaster = (
  stream: MediaStream,
  config: KVSConfig
): Master => {
  const kinesisVideoClient = new AWS.KinesisVideo({
    region: config.region,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    correctClockSkew: true,
  });
  const master: Master = {
    signalingClient: null,
    peerConnectionByClientId: {},
    stream: stream,
  };

  useEffect(() => {
    if (master.stream) {
      startMaster();
    }
    async function startMaster() {
      const describeSignalingChannelResponse: any = await kinesisVideoClient
        .describeSignalingChannel({
          ChannelName: config.channelName,
        })
        .promise();
      const channelARN =
        describeSignalingChannelResponse.ChannelInfo.ChannelARN;

      const getSignalingChannelEndpointResponse: any = await kinesisVideoClient
        .getSignalingChannelEndpoint({
          ChannelARN: channelARN,
          SingleMasterChannelEndpointConfiguration: {
            Protocols: ['WSS', 'HTTPS'],
            Role: Role.MASTER,
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

      master.signalingClient = new SignalingClient({
        channelARN,
        channelEndpoint: endpointsByProtocol.WSS,
        role: Role.MASTER,
        region: config.region,
        credentials: {
          accessKeyId: config.accessKeyId,
          secretAccessKey: config.secretAccessKey,
        },
        systemClockOffset: kinesisVideoClient.config.systemClockOffset,
      });

      const kinesisVideoSignalingChannelsClient =
        new AWS.KinesisVideoSignalingChannels({
          region: config.region,
          accessKeyId: config.accessKeyId,
          secretAccessKey: config.secretAccessKey,
          endpoint: endpointsByProtocol.HTTPS,
          correctClockSkew: true,
        });

      const getIceServerConfigResponse: any =
        await kinesisVideoSignalingChannelsClient
          .getIceServerConfig({
            ChannelARN: channelARN,
          })
          .promise();

      const iceServers = [];

      iceServers.push({
        urls: `stun:stun.kinesisvideo.${config.region}.amazonaws.com:443`,
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

      master.signalingClient.on('open', async () => {
        console.info('[MASTER] Connected to signaling service');
      });

      master.signalingClient.on(
        'sdpOffer',
        async (offer: any, remoteClientId: any) => {
          console.info(
            '[MASTER] Received SDP offer from client: ' + remoteClientId
          );

          const peerConnection = new RTCPeerConnection(configuration);

          master.peerConnectionByClientId[remoteClientId] = peerConnection;

          // Send any ICE candidates to the other peer
          peerConnection.addEventListener('icecandidate', ({ candidate }) => {
            if (candidate) {
              console.info(
                '[MASTER] Generated ICE candidate for client: ' + remoteClientId
              );
              master.signalingClient!.sendIceCandidate(
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

          if (master.stream) {
            master.stream
              .getTracks()
              .forEach((track: any) =>
                peerConnection.addTrack(track, master.stream as MediaStream)
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
          master.signalingClient!.sendSdpAnswer(
            peerConnection.localDescription!,
            remoteClientId
          );
          console.info(
            '[MASTER] Generating ICE candidates for client: ' + remoteClientId
          );
        }
      );

      master.signalingClient.on(
        'iceCandidate',
        async (candidate: any, remoteClientId: any) => {
          console.info(
            '[MASTER] Received ICE candidate from client: ' + remoteClientId
          );

          // Add the ICE candidate received from the client to the peer connection
          const peerConnection =
            master.peerConnectionByClientId[remoteClientId];
          peerConnection.addIceCandidate(candidate);
        }
      );

      master.signalingClient.on('close', () => {
        console.info('[MASTER] Disconnected from signaling channel');
      });

      master.signalingClient.on('error', () => {
        console.error('[MASTER] Signaling client error');
      });
      console.info('[MASTER] Starting master connection');
      master.signalingClient.open();
    }

    function stopMaster() {
      console.info('[MASTER] Stopping master connection');
      if (master.signalingClient) {
        master.signalingClient.close();
        master.signalingClient = null;
      }

      Object.keys(master.peerConnectionByClientId).forEach((clientId) => {
        master.peerConnectionByClientId[clientId].close();
      });

      master.peerConnectionByClientId = [];

      if (master.stream) {
        master.stream.getTracks().forEach((track: any) => track.stop());
        master.stream = null;
      }
    }
    return () => stopMaster();
  }, [master.stream]);

  return master;
};
