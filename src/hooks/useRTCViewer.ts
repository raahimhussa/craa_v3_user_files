import { Role, SignalingClient } from 'amazon-kinesis-video-streams-webrtc';
import AWS from 'aws-sdk';
import { useEffect } from 'react';
function getRandomClientId() {
  return Math.random().toString(36).substring(2).toUpperCase();
}

type KVSConfig = {
  channelName: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
  natTraversalDisabled: boolean;
  forceTURN: boolean;
  useTrickleICE: boolean;
  openDataChannel?: boolean;
  clientId: any;
};

type Viewer = {
  signalingClient: SignalingClient | null;
  stream: MediaStream | null;
  remoteStreams: MediaStream[] | any;
  peerConnection?: any;
  dataChannel?: any;
  peerConnectionStatsInterval?: any;
};

export const useRTCViewer = (
  stream: MediaStream | null,
  config: KVSConfig,
  onStatsReport?: (value: RTCStatsReport) => any,
  onRemoteDataMessage?: RTCDataChannel['onmessage']
) => {
  const viewer: Viewer = {
    signalingClient: null,
    stream: stream,
    remoteStreams: [],
  };

  const kinesisVideoClient = new AWS.KinesisVideo({
    region: config.region,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    // sessionToken: formValues.sessionToken,
    // endpoint: formValues.endpoint,
    correctClockSkew: true,
  });
  async function startViewer() {
    const describeSignalingChannelResponse: any = await kinesisVideoClient
      .describeSignalingChannel({
        ChannelName: config.channelName,
      })
      .promise();
    const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
    console.info('[VIEWER] Channel ARN: ', channelARN);

    // Get signaling channel endpoints
    const getSignalingChannelEndpointResponse: any = await kinesisVideoClient
      .getSignalingChannelEndpoint({
        ChannelARN: channelARN,
        SingleMasterChannelEndpointConfiguration: {
          Protocols: ['WSS', 'HTTPS'],
          Role: Role.VIEWER,
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
    console.info('[VIEWER] Endpoints: ', endpointsByProtocol);

    const kinesisVideoSignalingChannelsClient =
      new AWS.KinesisVideoSignalingChannels({
        region: config.region,
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
        sessionToken: config.sessionToken,
        endpoint: endpointsByProtocol.HTTPS,
        correctClockSkew: true,
      });

    // Get ICE server configuration
    const getIceServerConfigResponse: any =
      await kinesisVideoSignalingChannelsClient
        .getIceServerConfig({
          ChannelARN: channelARN,
        })
        .promise();
    const iceServers = [];
    if (!config.natTraversalDisabled && !config.forceTURN) {
      iceServers.push({
        urls: `stun:stun.kinesisvideo.${config.region}.amazonaws.com:443`,
      });
    }
    if (!config.natTraversalDisabled) {
      getIceServerConfigResponse.IceServerList.forEach((iceServer: any) =>
        iceServers.push({
          urls: iceServer.Uris,
          username: iceServer.Username,
          credential: iceServer.Password,
        })
      );
    }
    console.info('[VIEWER] ICE servers: ', iceServers);

    // Create Signaling Client
    viewer.signalingClient = new SignalingClient({
      channelARN,
      channelEndpoint: endpointsByProtocol.WSS,
      clientId: config.clientId,
      role: Role.VIEWER,
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
        sessionToken: config.sessionToken,
      },
      systemClockOffset: kinesisVideoClient.config.systemClockOffset,
    });

    const configuration: any = {
      iceServers,
      iceTransportPolicy: config.forceTURN ? 'relay' : 'all',
    };

    viewer.peerConnection = new RTCPeerConnection(configuration);
    if (config.openDataChannel) {
      viewer.dataChannel =
        viewer.peerConnection.createDataChannel('kvsDataChannel');
      viewer.peerConnection.ondatachannel = (event: any) => {
        event.channel.onmessage = onRemoteDataMessage;
      };
    }

    // Poll for connection stats
    viewer.peerConnectionStatsInterval = setInterval(
      () => viewer.peerConnection.getStats().then(onStatsReport),
      1000
    );

    viewer.signalingClient.on('open', async () => {
      console.info('[VIEWER] Connected to signaling service');
      // Get a stream from the webcam, add it to the peer connection, and display it in the local view.
      // If no video/audio needed, no need to request for the sources.
      // Otherwise, the browser will throw an error saying that either video or audio has to be enabled.

      viewer.stream &&
        viewer.stream
          .getTracks()
          .forEach((track: any) =>
            viewer.peerConnection.addTrack(track, viewer.stream)
          );

      // Create an SDP offer to send to the master
      console.info('[VIEWER] Creating SDP offer');
      await viewer.peerConnection.setLocalDescription(
        await viewer.peerConnection.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        })
      );

      // When trickle ICE is enabled, send the offer now and then send ICE candidates as they are generated. Otherwise wait on the ICE candidates.
      if (config.useTrickleICE) {
        console.info('[VIEWER] Sending SDP offer');
        viewer.signalingClient?.sendSdpOffer(
          viewer.peerConnection.localDescription
        );
      }
      console.info('[VIEWER] Generating ICE candidates');
    });

    viewer.signalingClient.on('sdpAnswer', async (answer: any) => {
      // Add the SDP answer to the peer connection
      console.info('[VIEWER] Received SDP answer');
      await viewer.peerConnection.setRemoteDescription(answer);
    });

    viewer.signalingClient.on('iceCandidate', (candidate: any) => {
      // Add the ICE candidate received from the MASTER to the peer connection
      console.info('[VIEWER] Received ICE candidate');
      viewer.peerConnection.addIceCandidate(candidate);
    });

    viewer.signalingClient.on('close', () => {
      console.info('[VIEWER] Disconnected from signaling channel');
    });

    viewer.signalingClient.on('error', (error: any) => {
      console.error('[VIEWER] Signaling client error: ', error);
    });

    // Send any ICE candidates to the other peer
    viewer.peerConnection.addEventListener(
      'icecandidate',
      ({ candidate }: any) => {
        if (candidate) {
          console.info('[VIEWER] Generated ICE candidate');

          // When trickle ICE is enabled, send the ICE candidates as they are generated.
          if (config.useTrickleICE) {
            console.info('[VIEWER] Sending ICE candidate');
            viewer.signalingClient?.sendIceCandidate(candidate);
          }
        } else {
          console.info('[VIEWER] All ICE candidates have been generated');

          // When trickle ICE is disabled, send the offer now that all the ICE candidates have ben generated.
          if (!config.useTrickleICE) {
            console.info('[VIEWER] Sending SDP offer');
            viewer.signalingClient?.sendSdpOffer(
              viewer.peerConnection.localDescription
            );
          }
        }
      }
    );

    // As remote tracks are received, add them to the remote view
    viewer.peerConnection.addEventListener(
      'track',
      (event: { streams: any[] }) => {
        console.info('[VIEWER] Received remote track');
        viewer.remoteStreams?.push(event.streams[0]);
      }
    );

    console.info('[VIEWER] Starting viewer connection');
    viewer.signalingClient.open();
  }

  function stopViewer() {
    console.info('[VIEWER] Stopping viewer connection');
    if (viewer.signalingClient) {
      viewer.signalingClient.close();
      viewer.signalingClient = null;
    }

    if (viewer.peerConnection) {
      viewer.peerConnection.close();
      viewer.peerConnection = null;
    }

    if (viewer.stream) {
      viewer.stream
        .getTracks()
        .forEach((track: { stop: () => any }) => track.stop());
      viewer.stream = null;
    }

    if (viewer.remoteStreams) {
      viewer.remoteStreams
        .getTracks()
        .forEach((track: { stop: () => any }) => track.stop());
      viewer.remoteStreams = null;
    }

    if (viewer.peerConnectionStatsInterval) {
      clearInterval(viewer.peerConnectionStatsInterval);
      viewer.peerConnectionStatsInterval = null;
    }

    if (viewer.dataChannel) {
      viewer.dataChannel = null;
    }
  }
  useEffect(() => {
    if (stream) {
      startViewer();
    }

    return () => stopViewer();
  }, [stream]);

  return {
    viewer,
    startViewer,
    stopViewer,
  };
};
