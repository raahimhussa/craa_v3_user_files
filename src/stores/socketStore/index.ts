import { IReactionDisposer, makeAutoObservable, reaction } from 'mobx';
import { io, Socket } from 'socket.io-client';
import { RootStore } from '../root';

export default class SocketStore {
  rootStore: RootStore;
  socket?: Socket;
  handler: IReactionDisposer | null = null;
  status = '';
  constructor(rootStore: RootStore) {
    console.log('constructing...');
    makeAutoObservable(this, {
      rootStore: false,
    });
    this.rootStore = rootStore;
    // this.socket = io(process.env.NEXT_PUBLIC_BASE_URL!);
    // this.socket.on('connect', () => this.connect());
    // this.socket.on('disconnect', () => this.disconnect());
    // this.handler = reaction(
    //   () => this.status,
    //   (status) => {
    //     console.log('status', status);
    //   }
    // );
  }

  connect() {
    this.status = 'connect';
  }

  disconnect() {
    this.status = 'disconnect';
  }
}
