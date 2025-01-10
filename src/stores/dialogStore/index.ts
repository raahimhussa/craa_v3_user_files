import { makeAutoObservable } from 'mobx';
import { RootStore } from '../root';
import RouterStore from '../routerStore';
import { IStore } from '../types';
import { AlertDialog } from './types';

export default class DialogStore implements IStore {
  store: RootStore;
  router: RouterStore;
  alert: AlertDialog = {
    type: 'error',
    isVisible: false,
    title: 'Error',
    msg: '',
  };

  constructor(store: RootStore) {
    this.store = store;
    this.router = store.routerStore;
    makeAutoObservable(this, {
      store: false,
    });
  }
  loadData(data: any) {}

  success(msg?: string) {
    this.alert.type = 'success';
    this.alert.title = 'Success';
    this.alert.msg = msg || 'Success';
    this.alert.isVisible = true;
  }

  failure(msg?: string) {
    this.alert.type = 'error';
    this.alert.title = 'Error';
    this.alert.msg = msg || 'Success';
    this.alert.isVisible = true;
  }
}
