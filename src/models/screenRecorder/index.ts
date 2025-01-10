import { IModel } from '../types';
import { IScreenRecorder } from './types';
import ScreenRecorderStore from 'src/stores/screenRecorderStore';
import { makeAutoObservable } from 'mobx';

export default class ScreenRecorder implements IModel, IScreenRecorder {
  _id: string = '';
  userSimulationId: string = '';
  recorders: string[] = [];
  isDeleted: boolean = false;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  store: ScreenRecorderStore | null;

  constructor(store: ScreenRecorderStore) {
    makeAutoObservable(this, {
      store: false,
    });
    this.store = store;
  }

  load(data: any) {
    Object.assign(this, data);
  }
}
