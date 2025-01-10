import { IStore } from '../types';
import { RootStore } from '../root';
import RouterStore from '../routerStore';
import UserSimulation from 'src/models/userSimulation';
import UserSimulationRepository from 'src/repos/v2/userSimulation';
import { makeAutoObservable } from 'mobx';
import { BaselineStatus } from 'src/utils/status';

export default class UserSimulationStore implements IStore {
  store: RootStore;
  router: RouterStore;
  userSimulationRepository: UserSimulationRepository;
  userSimulation: UserSimulation | null = null;
  userSimulations: any | {} = {};
  baselineStatus: string = '';
  constructor(
    store: RootStore,
    userSimulationRepository: UserSimulationRepository
  ) {
    this.store = store;
    this.router = store.routerStore;
    this.userSimulationRepository = userSimulationRepository;
    makeAutoObservable(this);
  }

  loadData(data: any) {
    if (this.userSimulations[data._id]) {
      return console.info('Exist userSimulation Store');
    }
    this.userSimulations[data._id] = new UserSimulation(this);
    this.userSimulations[data._id].load(data);
    if (this.userSimulation) {
      return console.info('Exist userSimulation Store');
    }
    this.userSimulation = new UserSimulation(this);
    this.userSimulation.load(data);
  }
}
