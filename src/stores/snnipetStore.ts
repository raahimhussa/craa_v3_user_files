import { makeAutoObservable } from 'mobx';
import { RootStore } from './root';
import RouterStore from './routerStore';
import { IStore } from './types';
//////////SnippetStore///////////
/////////////////////////////////
//////////Default Settings///////
//////////Copy & Paste///////////

export default class SnippetStore implements IStore {
  store: RootStore;
  router: RouterStore;
  constructor(store: RootStore) {
    this.store = store;
    this.router = store.routerStore;
    makeAutoObservable(this);
  }
  loadData(data: any) {}
}
