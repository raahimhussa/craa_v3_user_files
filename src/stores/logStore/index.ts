import { LogScreen, SimEvent } from 'src/models/log/types';

import { INote } from 'src/models/note/types';
import { IStore } from '../types';
import Log from 'src/models/log';
import LogRepository from 'src/repos/v2/log';
import { RootStore } from '../root';
import { makeAutoObservable } from 'mobx';

export default class LogStore implements IStore {
  store: RootStore;
  logRepository: LogRepository;

  constructor(store: RootStore, logRepository: LogRepository) {
    this.store = store;
    this.logRepository = logRepository;
    makeAutoObservable(this);
  }
  loadData(data: any) {}

  *create(
    event: SimEvent,
    screen: LogScreen = LogScreen.Baseline,
    note: INote | null = null,
    userId: string | null = ''
  ) {
    try {
      const log = new Log();
      log.event = event;
      log.screen = screen;
      if (
        event !== SimEvent.OnClickSignIn &&
        event !== SimEvent.OnClickLogout &&
        screen !== LogScreen.AssessmentCycle
      ) {
        log.duration =
          this.store.userSimulationStore?.userSimulation?.usageTime! +
          this.store.userSimulationStore?.userSimulation?.screenTime!;
        // yield this.store.userSimulationStore?.userSimulation?.getUsageTime();
        // 필요없습니다. note에 userSimulationId 정도가 존재합니다. 뒤에 수정 예정
        log.userSimulationId =
          this.store?.userSimulationStore?.userSimulation?._id || '';
        log.viewports = this.store.viewportStore.viewports?.map((viewport) =>
          viewport.getJSON()
        );
        log.userSimulationId = log.viewports[0]?.simulationId;
      }
      log.recordId = this.store.screenRecorderStore.recordId;
      log.userId = userId !== '' ? userId : this.store.authStore?.user?._id;
      log.note = note;

      this.logRepository.create(log);
    } catch (error) {
      console.log(error);
    }
  }
}
