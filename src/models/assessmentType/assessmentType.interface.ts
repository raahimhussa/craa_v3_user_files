export default interface IAssessmentType {
  _id?: any
  label: string
  baseline: ATBaseline | null
  followups: Array<ATFollowup>
  trainings: Array<ATTraining>
  isDeleted?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export class ATFollowup {
  readonly _id: string = ''
  label: string = ''
  simulationId: string = ''
  testTime: number = 0
  protocolIds: string[] = []
  instructionIds: string[] = []
  studyLogIds: string[] = []
  domain: any
}
export class ATBaseline {
  label: string = ''
  testTime: number = 0
  simulationId: string = ''
  protocolIds: string[] = []
  instructionIds: string[] = []
  studyLogIds: string[] = []
  attemptCount: number = 0
}

export class ATTraining {
  _id: string = ''
  label: string = ''
  protocolIds: string[] = []
  studyLogIds: string[] = []
  domain: any
}
