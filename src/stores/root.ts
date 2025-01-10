import AgreementRepository from 'src/repos/v1/agreementRepository';
import AgreementStore from './agreementStore';
import AssessmentRepository from 'src/repos/v2/assessment';
import AssessmentStore from './assessmentStore';
import AssessmentTypeRepository from 'src/repos/v1/assessmenType';
import AssessmentTypeStore from './assessmentTypeStore';
import AuthStore from './authStore';
import ClientUnitRepository from 'src/repos/v1/clientUnit';
import ClientUnitStore from './clientUnitStore';
import DialogStore from './dialogStore';
import FileStore from './fileStore';
import FolderRepository from 'src/repos/v2/folder';
import FolderStore from './folderStore';
import LogRepository from 'src/repos/v2/log';
import LogStore from './logStore';
import ModalStore from './modalStore';
import NoteRepository from 'src/repos/v2/note';
import NoteStore from './noteStore';
import RTCStore from './rtcStore';
import RouterStore from './routerStore';
import ScreenRecorderRepository from 'src/repos/v2/screenRecorder';
import ScreenRecorderStore from './screenRecorderStore';
import SettingRepository from 'src/repos/v2/setting';
import SettingStore from './settingStore';
import SimDocRepository from 'src/repos/v1/simDoc';
import SimDocStore from './simDocStore';
import SimulationRepository from 'src/repos/v1/simulation';
import SimulationStore from './simulationStore';
import SocketStore from './socketStore';
import UiState from './ui';
import UserAssessmentCycleRepository from 'src/repos/v1/userAssessmentCycle';
import UserAssessmentCycleStore from './userAssessmentCycleStore';
import UserSimulationRepository from 'src/repos/v2/userSimulation';
import UserSimulationStore from './userSimulationStore';
import { Utils } from '@utils';
import ViewportRepository from 'src/repos/v2/viewport';
import ViewportStore from './viewportStore';

export class RootStore {
  /**
   * @description stores
   */

  authStore: AuthStore;
  routerStore: RouterStore;
  fileStore: FileStore;
  dialogStore: DialogStore;
  rtcStore: RTCStore;
  modalStore: ModalStore;
  logStore: LogStore;
  userSimulationStore: UserSimulationStore;
  assessmentTypeStore: AssessmentTypeStore;
  simulationStore: SimulationStore;
  viewportStore: ViewportStore;
  simDocStore: SimDocStore;
  noteStore: NoteStore;
  screenRecorderStore: ScreenRecorderStore;
  userAssessmentCycleStore: UserAssessmentCycleStore;
  agreementStore: AgreementStore;
  clientUnitStore: ClientUnitStore;
  /**
   * @description Repository
   */

  viewportRepository?: ViewportRepository;
  userSimulationRepository?: UserSimulationRepository;
  clientUnitRepository?: ClientUnitRepository;

  uiState: UiState;
  folderStore: FolderStore;
  socketStore: SocketStore;
  assessmentStore: AssessmentStore;
  settingStore: SettingStore;
  constructor() {
    this.uiState = new UiState(this);

    this.viewportRepository = new ViewportRepository();
    this.userSimulationRepository = new UserSimulationRepository();
    this.agreementStore = new AgreementStore(this, new AgreementRepository());

    this.routerStore = new RouterStore(this);
    this.authStore = new AuthStore(this);
    this.fileStore = new FileStore(this);
    this.dialogStore = new DialogStore(this);
    this.rtcStore = new RTCStore(this);
    this.modalStore = new ModalStore(this);
    this.logStore = new LogStore(this, new LogRepository());
    this.userSimulationStore = new UserSimulationStore(
      this,
      new UserSimulationRepository()
    );
    this.assessmentTypeStore = new AssessmentTypeStore(
      this,
      new AssessmentTypeRepository()
    );
    this.simulationStore = new SimulationStore(
      this,
      new SimulationRepository()
    );
    this.simDocStore = new SimDocStore(this, new SimDocRepository());
    this.viewportStore = new ViewportStore(this, new ViewportRepository());
    this.noteStore = new NoteStore(this, new NoteRepository());
    this.screenRecorderStore = new ScreenRecorderStore(
      this,
      new ScreenRecorderRepository()
    );
    this.userAssessmentCycleStore = new UserAssessmentCycleStore(
      this,
      new UserAssessmentCycleRepository()
    );
    this.folderStore = new FolderStore(this, new FolderRepository());
    this.socketStore = new SocketStore(this);
    this.assessmentStore = new AssessmentStore(
      this,
      new AssessmentRepository()
    );
    this.settingStore = new SettingStore(this, new SettingRepository());
    this.clientUnitStore = new ClientUnitStore(
      this,
      new ClientUnitRepository()
    );
  }
}

let store: RootStore = new RootStore();
export const createRootStore = () => {
  let _store: RootStore = store ? store : new RootStore();

  if (Utils.isServer()) return _store;

  return _store;
};
