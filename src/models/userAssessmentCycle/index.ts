import { extendObservable, makeAutoObservable } from 'mobx';
import { useRootStore } from 'src/stores';
import UserAssessmentCycleStore from 'src/stores/userAssessmentCycleStore';

import IUserAssessmentCycle from './types';

export default class UserAssessmentCycle implements IUserAssessmentCycle {
  _id: any;
  assessmentCycleId!: string;
  assessmentTypeId!: string;
  clientUnitId!: string;
  clientUnit!: any;
  businessUnitId!: string;
  businessCycleId!: string;
  userBaselineId!: string;
  userTrainingIds!: string[];
  userFollowupIds!: string[];
  userId!: string;
  saleId!: string;
  isDeleted!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  isOpen: boolean = false;
  isSimTutorialViewed: boolean = false;
  isTrainingTutorialViewed: boolean = false;
  simTutorialDuration: number = 0;
  trainingTutorialDuration: number = 0;
  bypass: boolean = false;

  constructor(data: IUserAssessmentCycle) {
    makeAutoObservable(this);
    Object.assign(this, data);
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  *updateTutorialViewed(type: any) {
    const { userAssessmentCycleStore } = useRootStore();
    const param =
      type === 'baseline'
        ? { isSimTutorialViewed: true }
        : { isTrainingTutorialViewed: true };

    yield userAssessmentCycleStore.userAssessmentCycleRepository.update({
      filter: {
        _id: userAssessmentCycleStore.userAssessmentCycles[0]._id,
      },
      update: {
        ...param,
      },
    });
    if (type == 'baseline') {
      this.isSimTutorialViewed = true;
    } else {
      this.isTrainingTutorialViewed = true;
    }
  }
}
