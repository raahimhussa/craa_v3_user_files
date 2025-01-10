import { makeObservable, observable } from 'mobx';

import AssessmentRepository from 'src/repos/v2/assessment';
import { AssessmentStatus } from 'src/utils/status';
import CommonDAO from 'src/commons/interfaces/commonDAO.interface';
import { IAssessment } from 'src/models/assessment/assessment.interface';
import Identifiable from 'src/commons/interfaces/identifiable.interface';
import { RootStore } from '../root';
import Store from '../store';
import _ from 'lodash';
import axios from 'axios';

export default class AssessmentStore extends Store<IAssessment> {
  form: IAssessment = {
    _id: null,
    userSimulationId: '',
    isExpedited: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    firstScorer: {
      _id: '',
      status: AssessmentStatus.Pending,
    },
    secondScorer: {
      _id: '',
      status: AssessmentStatus.Pending,
    },
    adjudicator: {
      _id: '',
      status: AssessmentStatus.Pending,
    },
    status: '',
    publishedAt: null,
    userAssessmentCycle: undefined,
  };

  defaultForm: IAssessment = _.cloneDeep(this.form);
  constructor(store: RootStore, repository: AssessmentRepository) {
    super(store, repository);
    makeObservable(this, {
      form: observable,
    });
  }

  async submitScoring(assessment: IAssessment) {
    const isFirstScorer =
      this.rootStore.authStore.user._id === assessment.firstScorer._id;

    const isSecondScorer =
      this.rootStore.authStore.user._id === assessment.secondScorer._id;

    if (isFirstScorer) {
      this.repository.update({
        filter: {
          _id: assessment._id,
        },
        update: { $set: { 'firstScorer.status': AssessmentStatus.Complete } },
      });
    }
    if (isSecondScorer) {
      this.repository.update({
        filter: {
          _id: assessment._id,
        },
        update: { $set: { 'secondScorer.status': AssessmentStatus.Complete } },
      });
    }
  }

  async submitAdjudicate(assessment: IAssessment) {
    const isAdjudicator =
      this.rootStore.authStore.user._id === assessment.adjudicator._id;

    if (isAdjudicator) {
      this.repository.update({
        filter: {
          _id: assessment._id,
        },
        update: { $set: { 'adjudicator.status': AssessmentStatus.Complete } },
      });
    }
  }

  async publish(assessment: IAssessment) {
    try {
      await axios.patch(`v2/assessments/${assessment._id}/publish`);
    } catch (error) {
      throw error;
    }
  }

  async scoreResult(assessment: IAssessment) {
    try {
      await axios.patch(`v2/assessments/${assessment._id}/preview`);
    } catch (error) {
      throw error;
    }
  }

  async retract(assessment: IAssessment) {
    const filter = {
      _id: assessment._id,
    };
    const update = {
      $set: {
        'adjudicator.status': AssessmentStatus.Complete,
        status: AssessmentStatus.Complete,
      },
    };
    this.repository.update({
      filter,
      update,
    });
  }

  async changeStatus(
    assessmentId: string,
    type: string,
    status: AssessmentStatus
  ) {
    return this.repository.update({
      filter: {
        _id: assessmentId,
      },
      update: {
        $set: { [`${type}Scorer.status`]: status },
      },
    });
  }
}
