export enum BaselineStatus {
  HasNotAssigned = 'HasNotAssigned',
  HasNotStarted = 'HasNotStarted',
  InProgress = 'InProgress',
  Complete = 'Complete',
  Published = 'Published',
  Distributed = 'Distributed',
  PAUSE = 'Pause',
  Stopped = 'Stopped',
  Assigned = 'Assigned',
  Scoring = 'Scoring',
  Adjudicating = 'Adjudicating',
  Review = 'Review',
  Exported = 'Exported',
}

export interface UserSimulationDoc {
  assessmentTypeId: string;
  isViewed: boolean;
}
