import { makeAutoObservable } from 'mobx';
import AssessmentType from 'src/models/assessmentType';
import AssessmentTypeRepository from 'src/repos/v1/assessmenType';
import { RootStore } from '../root';
import RouterStore from '../routerStore';
import { IStore } from '../types';

export default class AssessmentTypeStore implements IStore {
  store: RootStore;
  router: RouterStore;
  assessmentType!: AssessmentType;
  assessmentTypeRepository: AssessmentTypeRepository;

  constructor(
    store: RootStore,
    assessmentTypeRepository: AssessmentTypeRepository
  ) {
    this.store = store;
    this.router = store.routerStore;
    this.assessmentTypeRepository = assessmentTypeRepository;
    makeAutoObservable(this);
  }

  loadData(data: AssessmentType) {
    this.assessmentType = new AssessmentType(this);
    this.assessmentType?.load(data);
  }
}
