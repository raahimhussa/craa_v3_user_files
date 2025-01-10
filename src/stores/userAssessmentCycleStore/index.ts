import _ from 'lodash';
import { makeAutoObservable, observable } from 'mobx';
import UserAssessmentCycle from 'src/models/userAssessmentCycle';
import IUserAssessmentCycle from 'src/models/userAssessmentCycle/types';
import UserAssessmentCycleRepository from 'src/repos/v1/userAssessmentCycle';
import { RootStore } from '../root';
import RouterStore from '../routerStore';
import { IStore } from '../types';

export default class UserAssessmentCycleStore implements IStore {
  rootStore: RootStore;

  router: RouterStore;

  userAssessmentCycleRepository: UserAssessmentCycleRepository;

  userAssessmentCycles: UserAssessmentCycle[] = [];

  isOpen: boolean = false;

  userAssessmentCycle?: UserAssessmentCycle;

  currentAssessmentCycleIndex: number = 0;

  inprogressTraining: string = '';
  completeTrainings: string[] = [];
  openFollowup: string = '';
  mutate: any;

  constructor(
    rootStore: RootStore,
    userAssessmentCycleRepository: UserAssessmentCycleRepository
  ) {
    this.userAssessmentCycleRepository = userAssessmentCycleRepository;
    this.rootStore = rootStore;
    this.router = rootStore.routerStore;
    makeAutoObservable(this, {
      rootStore: false,
      userAssessmentCycles: observable,
    });
  }

  loadData(data: IUserAssessmentCycle[]) {
    this.userAssessmentCycles = data.map((data, index) => {
      const uac = new UserAssessmentCycle(data);
      if (index === 0) {
        uac.isOpen = true;
        return uac;
      }
      return uac;
    });
  }
}
