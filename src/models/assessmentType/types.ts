export class ATFollowup {
  readonly _id: string = '';
  domain: {
    _id: string;
    label: string;
  } = {
    _id: '',
    label: '',
  };
  label: string = '';
  simulationId: string = '';
  testTime: number = 0;
  protocolIds: string[] = [];
  instructionIds: string[] = [];
  studyLogIds: string[] = [];
  minimumHour: number = 0;
}
export class ATBaseline {
  label: string = '';
  testTime: number = 0;
  minimumHour: number = 0;
  simulationId: string = '';
  protocolIds: string[] = [];
  instructionIds: string[] = [];
  studyLogIds: string[] = [];
}

export class ATTraining {
  _id: string = '';
  label: string = '';
  protocolIds: string[] = [];
  studyLogIds: string[] = [];
}
