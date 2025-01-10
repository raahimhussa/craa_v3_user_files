import { makeAutoObservable } from 'mobx';
import { RootStore } from '../root';
import RouterStore from '../routerStore';
import { IStore } from '../types';
import UserBaseline from '../ui/components/userBaseline/userBaseline';
import { Modal } from './types';
export default class ModalStore implements IStore {
  store: RootStore;
  router: RouterStore;
  tutorialType: string = '';
  userSimulation: any = null;
  uacIndex: number = 0;
  tourType: string = '';

  constructor(store: RootStore) {
    this.store = store;
    this.router = store.routerStore;
    makeAutoObservable(this);
  }

  *loadData(data: any) {}

  tour: Modal = {
    isVisible: false,
    payload: {
      type: null,
    },
    buttons: [],
  };
  video: Modal = {
    isVisible: false,
    payload: {
      video: null,
    },
    buttons: [],
  };

  instruction: Modal = {
    isVisible: false,
    payload: {
      instructionId: null,
    },
    buttons: [],
  };

  note: Modal = {
    isVisible: false,
    payload: {
      viewport: null,
    },
    buttons: [],
  };

  viewport: Modal = {
    isVisible: false,
    payload: {
      viewport: null,
      simulationId: null,
    },
    buttons: [],
  };

  protocol: Modal = {
    isVisible: false,
    payload: {
      protocolId: null,
    },
    buttons: [],
  };

  studyDoc: Modal = {
    isVisible: false,
    payload: {
      studyDocId: null,
    },
    buttons: [],
  };
}
