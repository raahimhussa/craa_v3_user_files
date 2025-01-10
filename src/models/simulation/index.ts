import { makeAutoObservable } from 'mobx';
import SimulationStore from 'src/stores/simulationStore';
import { IModel } from '../types';

export default class Simulation implements IModel {
  _id: any = null;
  name: string = '';
  label: string = '';
  folderIds: string[] = [];
  isDeleted: boolean = false;
  updatedAt: number = Date.now();
  createdAt: number = Date.now();
  store: SimulationStore;

  constructor(store: SimulationStore) {
    makeAutoObservable(this, {
      store: false,
      _id: false,
    });
    this.store = store;
  }

  load(data: any) {
    Object.assign(this, data);
  }
}
