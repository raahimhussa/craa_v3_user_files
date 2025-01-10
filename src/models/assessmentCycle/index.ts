import { makeAutoObservable } from 'mobx';

export class AssessmentCycle {
  name!: string;

  tutorials!: {
    followupUrl?: string;
    baselineUrl?: string;
    trainingUrl?: string;
  };

  assessmentTypeIds!: string[];

  startDate!: Date;
  endDate!: Date;

  isDeleted!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  _id!: any;

  constructor() {
    makeAutoObservable(this);
  }
}
