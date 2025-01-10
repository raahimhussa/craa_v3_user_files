import { SignalingClient } from 'amazon-kinesis-video-streams-webrtc';

export type KVSConfig = {
  channelName: string;
} & AWSCredential;

export type AWSCredential = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
};

export type Master = {
  signalingClient: SignalingClient | null;
  endpointsByProtocol: any;
} & any;
export type Viewer = {
  signalingClient: SignalingClient | null;
  endpointsByProtocol: any;
} & any;
