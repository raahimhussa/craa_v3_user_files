import { makeAutoObservable } from 'mobx';
import AssessmentTypeStore from 'src/stores/assessmentTypeStore';
import { IModel } from '../types';
import { ATBaseline, ATFollowup, ATTraining } from './types';

export default class AssessmentType implements IModel {
  _id: any | null = null;
  label: string = '';
  baseline: ATBaseline | null = null;
  followups: ATFollowup[] = [];
  trainings: ATTraining[] = [];
  isDeleted: boolean = false;
  createdAt: number = Date.now();
  updatedAt: number = Date.now();
  store: AssessmentTypeStore;

  constructor(store: AssessmentTypeStore) {
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
