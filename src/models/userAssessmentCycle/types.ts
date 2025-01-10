export default interface IUserAssessmentCycle {
  _id: any;
  assessmentCycleId: string;
  assessmentTypeId: string;
  clientUnitId: string;
  businessUnitId: string;
  businessCycleId: string;
  userBaselineId: string;
  userTrainingIds: string[];
  userFollowupIds: string[];
  userId: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  isOpen: boolean;
}
