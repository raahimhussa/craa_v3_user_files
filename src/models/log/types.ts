export enum LogScreen {
  Baseline = 'baseline',
  Followups = 'followups',
  Trainings = 'trainings',
  AssessmentCycles = 'AssessmentCycles',
  AssessmentCycle = 'AssessmentCycle',
  SignIn = 'SignIn',
  SignUp = 'SignUp',
}

export enum SimEvent {
  // complete
  OnClickStart = 'start',
  // complete
  OnClickSubmit = 'submit',
  OnClickHome = 'stop',
  OnClickRefresh = 'refresh',
  // complete
  Review = 'review',
  // complete
  OnClickAddViewport = 'addViewport',
  // complete
  ToggleCalendar = 'calendar',
  OnClickSignIn = 'signin',
  OnClickSignUp = 'signup',
  OnClickLogout = 'logout',
  OnClickAddNote = 'addNote',
  OnClickNextPage = 'pdfNext',
  OnClickPrevPage = 'pdfPrev',
  SearchPDFPage = 'searchPDFPage',
  OnClickScaleUp = 'pdfScaleUp',
  OnClickScaleDown = 'pdfScaleDown',
  OnClickFullScreen = 'fullScreen',
  OnClickExitFullScreen = 'exit fullScreen',
  OnClickScreenModeChange = 'Screen mode toggle',
  onClickSave = 'saveNote',
  onClickDelete = 'deleteNote',
  onClickViewport = 'viewport toggle',
  onClickSimDoc = 'select simDoc',
  onClickInstruction = 'view instruction',
  onClickStudyDoc = 'view study doc',
  onClickProtocol = 'view protocol',
  onClickSimTutorial = 'view simulation tutorial',
  onClickTrainingTutorial = 'view training tutorial',
}

export enum Severity {
  Success = 0,
  Info = 1,
  Warning = 2,
  Error = 3,
}
