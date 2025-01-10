import { makeAutoObservable, observable } from 'mobx';

import AssessmentCycle from './components/assessmentCycle/assessmentCycle';
import BaselineCard from './components/baselineCard';
import Note from './components/note/note';
import { RootStore } from '../root';
import Toolbar from './components/toolbar/toolbar';
import UserSimulation from './pages/userSimulation';
import { Utils } from '@utils';
import Viewport from 'src/models/viewport';
import UserBaseline from './components/userBaseline/userBaseline';
import UserTraining from './pages/userTraining';
import UserAssessmentCycle from './pages/userAssessmentCycle';

export enum SimulationMode {
  Baseline = 'baseline',
  Followup = 'followup',
}

export default class UiState {
  language = 'en_US';
  pendingRequestCount = 0;
  isServer = Utils.isServer();

  simulationMode: SimulationMode = SimulationMode.Baseline;

  windowDimensions = {
    width: !this.isServer ? window.innerWidth : 1,
    height: !this.isServer ? window.innerHeight : 1,
  };
  isProduction = process.env.NODE_ENV === 'production';
  online = true;
  rootStore: RootStore;
  menuBarHeight = 56;
  toolbarHeight = 56;
  pdfControllerHeight = 56;

  viewportHeight =
    this.windowDimensions.height -
    this.menuBarHeight -
    this.toolbarHeight -
    this.pdfControllerHeight;
  userSimulation: UserSimulation;
  baselineCard: BaselineCard;
  toolbar: Toolbar;
  note: Note;
  assessmentCycle: AssessmentCycle;
  userBaseline: UserBaseline;
  userTraining: UserTraining;
  userAssessmentCycle: UserAssessmentCycle;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      windowDimensions: observable.struct,
      rootStore: false,
    });
    if (!this.isServer) {
      window.onresize = () => {
        this.windowDimensions = this.getWindowDimensions();
      };
    }
    this.userSimulation = new UserSimulation(this);
    this.userTraining = new UserTraining(this);
    this.baselineCard = new BaselineCard(this);
    this.toolbar = new Toolbar(this);
    this.note = new Note(this);
    this.assessmentCycle = new AssessmentCycle(this);
    this.userBaseline = new UserBaseline(this);
    this.userAssessmentCycle = new UserAssessmentCycle(this);
  }

  get appIsInSync() {
    return this.pendingRequestCount === 0;
  }

  getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
}
