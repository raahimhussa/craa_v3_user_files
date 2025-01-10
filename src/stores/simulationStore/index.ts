import { makeAutoObservable } from 'mobx';
import Simulation from 'src/models/simulation';
import SimulationRepository from 'src/repos/v1/simulation';
import { RootStore } from '../root';
import RouterStore from '../routerStore';
import { IStore } from '../types';

export default class SimulationStore implements IStore {
  store: RootStore;
  router: RouterStore;
  simulation: Simulation | null = null;
  simulationRepository: SimulationRepository;
  activeViewport: string = '';

  constructor(store: RootStore, simulationRepository: SimulationRepository) {
    this.store = store;
    this.router = store.routerStore;
    this.simulationRepository = simulationRepository;
    makeAutoObservable(this);
  }

  loadData(data: Simulation) {
    this.simulation = new Simulation(this);
    this.simulation?.load(data);
  }
}
