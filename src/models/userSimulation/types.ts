export enum BaselineStatus {
  HasNotAssigned = 'HasNotAssigned',
  Assigned = 'Assigned',
  HasNotStarted = 'HasNotStarted',
  InProgress = 'InProgress',
  Complete = 'Complete',
  Published = 'Published',
  Distributed = 'Distributed',
  PAUSE = 'Pause',
  Stopped = 'Stopped',
  Scoring = 'Scoring',
  Adjudicating = 'Adjudicating',
  Review = 'Review',
  Exported = 'Exported',
}

export interface UserSimulationDoc {
  assessmentTypeId: string;
  isViewed: boolean;
}

export enum SimulationType {
  None = 'None',
  Baseline = 'Baseline',
  Followup = 'Followup',
}
