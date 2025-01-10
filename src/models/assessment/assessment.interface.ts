import { AssessmentStatus, SimulationType } from 'src/utils/status';

import IFinding from '../finding/finding.interface';

export class Scorer {
  userId: string = '';
  name: string = '';
}

export class Adjudicator {
  userId: string = '';
  name: string = '';
}

export interface IAssessment {
  userAssessmentCycle: any;
  _id: any;
  // results: Result[]
  userSimulationId: string;
  status: string;
  // scorers: Scorer[]
  // adjudicator: Adjudicator
  isExpedited: boolean;
  firstScorer: {
    _id: string;
    status: AssessmentStatus;
  };
  secondScorer: {
    _id: string;
    status: AssessmentStatus;
  };
  adjudicator: {
    _id: string;
    status: AssessmentStatus;
  };

  publishedAt: Date | null;

  createdAt: Date;

  updatedAt: Date;
}
