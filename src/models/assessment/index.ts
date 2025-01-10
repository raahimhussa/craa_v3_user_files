import { AssessmentStatus, SimulationType } from 'src/utils/status';
import { IAssessment, Scorer } from './assessment.interface';

import AssessmentStore from 'src/stores/assessmentTypeStore';
import DefaultSchema from 'src/commons/interfaces/defaultSchema.interface';
import Identifiable from 'src/commons/interfaces/identifiable.interface';
import { makeAutoObservable } from 'mobx';

export default class Assessment
  implements IAssessment, Identifiable, DefaultSchema
{
  store: AssessmentStore;
  _id: any;
  userSimulationId!: string;
  scorers: Scorer[] = [];
  isExpedited!: false;
  firstScorer!: { _id: string; status: AssessmentStatus };
  secondScorer!: { _id: string; status: AssessmentStatus };
  adjudicator!: { _id: string; status: AssessmentStatus };
  isDeleted!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  status!: string;
  publishedAt!: Date | null;

  constructor(store: AssessmentStore, data: IAssessment) {
    this.store = store;
    makeAutoObservable(this, {
      store: false,
    });
    Object.assign(this, data);
  }
  userAssessmentCycle: any;
}
