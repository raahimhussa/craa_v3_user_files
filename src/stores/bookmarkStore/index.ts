import { IReactionDisposer, makeAutoObservable, reaction } from 'mobx';
import { RootStore } from '../root';
import RouterStore from '../routerStore';
import { IStore } from '../types';
export default class BookmarkStore implements IStore {
  store: RootStore;
  router: RouterStore;
  bookmarkHandler: IReactionDisposer | null = null;

  constructor(store: RootStore) {
    this.store = store;
    this.router = store.routerStore;
    this.bookmarkHandler = reaction(
      () => this.store.screenRecorderStore.status,
      (status) => {}
    );
    makeAutoObservable(this, {
      store: false,
    });
  }
  *loadData(data: any) {}
}
