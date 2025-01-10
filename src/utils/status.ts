export enum UserStatus {
  Approval = 'approval',
  Dropout = 'dropout',
  Verified = 'verified',
}

export enum AnswerStatus {
  InCorrect = 'incorrect',
  Correct = 'correct',
  NotScored = 'notScored',
  Rejected = 'rejected',
}

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

export enum FindingStatus {
  Active = 'active',
  Inactive = 'inactive',
  Deleted = 'deleted',
}
export enum FollowupStatus {
  HasNotAssigned = 'HasNotAssigned',
  HasNotStarted = 'HasNotStarted',
  InProgress = 'InProgress',
  Complete = 'Complete',
  Published = 'Published',
  Distributed = 'Distributed',
  Assigned = 'Assigned',
  Scoring = 'Scoring',
  Adjudicating = 'Adjudicating',
  Review = 'Review',
  Exported = 'Exported',
}
export enum AssessmentStatus {
  Complete = 'Complete',
  Pending = 'Pending',
  Reopen = 'Reopen',
  InProgress = 'InProgress',
  Published = 'Published',
  Distributed = 'Distributed',
}

export enum AssessmentCycleType {
  Normal = 'NORMAL',
  Prehire = 'PREHIRE',
}

export enum SimulationType {
  None = 'None',
  Baseline = 'Baseline',
  Followup = 'Followup',
}
