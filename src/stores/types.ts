import { RootStore } from './root';

export type K = keyof RootStore;
export type RootStoreKeys = K;

export interface IStore {
  loadData(data: any): void;
}
