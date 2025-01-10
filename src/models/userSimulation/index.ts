import { BaselineStatus, SimulationType, UserSimulationDoc } from './types';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { makeAutoObservable, toJS } from 'mobx';

import { AssessmentStatus } from 'src/utils/status';
import ClientUnitRepository from 'src/repos/v1/clientUnit';
import { IAssessment } from '../assessment/assessment.interface';
import { IModel } from '../types';
import { Result } from './userSimulation.interface';
import { SimEvent } from '../log/types';
import UserBaselineStore from 'src/stores/userSimulationStore';
import { Utils } from '@utils';
import _ from 'lodash';
import axios from 'axios';
import { green } from '@mui/material/colors';

export default class UserSimulation implements IModel {
  _id: string = '';
  userId: string = '';
  simulationType: SimulationType = SimulationType.None;
  simulationId: string = '';
  assessmentTypeId: string = '';
  domainId: string = '';
  usageTime: number = 0;
  testTime: number = 0;
  deadline: number = 0;
  reopenCount: number = 0;
  minimumHour: number = 0;
  isAgreed: boolean = false;
  status: BaselineStatus = BaselineStatus.InProgress;
  attemptCount: number = 10;
  results!: Result;
  instructions: UserSimulationDoc[] = [];
  protocols: UserSimulationDoc[] = [];
  studyLogs: UserSimulationDoc[] = [];
  isDeleted: boolean = false;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  startedAt: Date = new Date();
  distributedDate: Date = new Date();
  submittedAt?: Date;
  store: UserBaselineStore;
  mutate: any;
  screenTime: number = 0;
  recordingTime: number = 0;
  prevNote: string = '';
  noteSecond: number = 0;

  constructor(store: UserBaselineStore) {
    this.store = store;
    makeAutoObservable(this, {
      store: false,
      _id: false,
    });
  }

  load(data: any) {
    Object.assign(this, data);
  }

  *updateAttemptCnt(attemptCount: number) {
    const body = {
      filter: {
        _id: this._id,
      },
      update: {
        attemptCount: attemptCount,
      },
    };

    try {
      yield this.store.userSimulationRepository?.update(body);
      yield axios.patch('/v1/userAssessmentCycles/renewSummary', {
        filter: {
          $or: [{ userBaselineId: this._id }, { userFollowupIds: this._id }],
        },
      });
    } catch (error) {
      throw error;
    }
  }

  *updateAgreed(isAgreed: boolean) {
    const body = {
      filter: {
        _id: this._id,
      },
      update: {
        isAgreed: isAgreed,
      },
    };

    try {
      yield this.store.userSimulationRepository?.update(body);
      yield axios.patch('/v1/userAssessmentCycles/renewSummary', {
        filter: {
          $or: [{ userBaselineId: this._id }, { userFollowupIds: this._id }],
        },
      });
      this.isAgreed = isAgreed;
      this.store.userSimulations[this._id].isAgreed = this.isAgreed;
    } catch (error) {
      throw error;
    }
  }

  *changeStatus(status: BaselineStatus) {
    const body = {
      filter: {
        _id: this._id,
      },
      update: {
        status: status,
      },
    };

    try {
      yield this.store.userSimulationRepository?.update(body);
      yield axios.patch('/v1/userAssessmentCycles/renewSummary', {
        filter: {
          $or: [{ userBaselineId: this._id }, { userFollowupIds: this._id }],
        },
      });
    } catch (error) {
      throw error;
    }
  }

  *getUsageTime() {
    const userSimulation: UserSimulation =
      yield this.store.userSimulationRepository.findOne({
        filter: { _id: this._id },
      });

    return userSimulation.usageTime;
  }

  *getStatus() {
    const userSimulation: UserSimulation =
      yield this.store.userSimulationRepository.findOne({
        filter: { _id: this._id },
      });

    return userSimulation.status;
  }

  *updateUsageTime() {
    const userSimulation: UserSimulation =
      yield this.store.userSimulationRepository.findOne({
        filter: { _id: this._id },
      });

      console.log("models::userSimulation::updateUsageTime userSimulation.usageTime: ", userSimulation.usageTime)
    this.usageTime = userSimulation.usageTime;
    this.screenTime = 0;
  }

  *start() {
    // 로그 기록
    this.store.store.logStore.create(SimEvent.OnClickStart);
    if (this.status === BaselineStatus.Assigned) {
      // 베이스라인 시작시간 업데이트
      yield this.store.userSimulationRepository.update({
        filter: { _id: this._id },
        update: { startedAt: new Date() },
      });
      yield axios.patch('/v1/userAssessmentCycles/renewSummary', {
        filter: {
          $or: [{ userBaselineId: this._id }, { userFollowupIds: this._id }],
        },
      });
      this.startedAt = new Date();
      this.store.userSimulations[this._id].startedAt = this.startedAt;
    }
    // count update
    yield this.updateAttemptCnt(this.attemptCount - 1);

    // 베이스라인 상태 진행중으로 업데이트
    yield this.changeStatus(BaselineStatus.InProgress);

    this.status = BaselineStatus.InProgress;
    this.attemptCount = this.attemptCount - 1;

    this.store.userSimulations[this._id].status = BaselineStatus.InProgress;
    this.store.userSimulations[this._id].attemptCount = this.attemptCount;

    // 스크린레코더 존재여부 체크 있으면 그냥 Skip한다 없으면 생성
    // if (!this.isScreenRecorderExist()) {
    //   this.store.store.screenRecorderStore.screenRecorderRepository.create({
    //     userSimulationId: this._id,
    //     recorders: [],
    //   });
    // }
  }

  // *isScreenRecorderExist() {
  //   const { data }: any =
  //     this.store.store.screenRecorderStore.screenRecorderRepository.findOne({
  //       userSimulationId: this._id,
  //       recorders: [],
  //     });
  //   return !!data;
  // }

  async expiredSubmit() {
    try {
      Swal.fire({
        title: 'Submitting..',
        html: 'Do not close the window.',
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
      });
      const body = {
        filter: {
          _id: this._id,
        },
        update: {
          submittedAt: new Date(),
        },
      };
      await this.changeStatus(BaselineStatus.Scoring);
      await this.store.userSimulationRepository?.update(body);
      try {
        //@ts-ignore
        const assessment = await this.buildAssessment();
        this.status = BaselineStatus.Scoring;
        this.submittedAt = new Date();
        this.store.userSimulations[this._id].status = BaselineStatus.Scoring;
        this.store.userSimulations[this._id].submittedAt = this.submittedAt;

        this.store.store.logStore.create(SimEvent.OnClickSubmit);
        await this.createAssessment(assessment);
      } catch (error) {
        console.log(error);
      }
      Swal.fire({
        title: 'Complete! Good Luck',
        confirmButtonText: 'Go To Overview',
      }).then(() => {
        this.store.store.screenRecorderStore.stop(true);
        this.store.router.go('/home');
      });
      await axios.patch('/v1/userAssessmentCycles/renewSummary', {
        filter: {
          $or: [{ userBaselineId: this._id }, { userFollowupIds: this._id }],
        },
      });
      const uiState = this.store.store.uiState;

      uiState.userSimulation.mutate && uiState.userSimulation.mutate();

      uiState.assessmentCycle.mutate && uiState.assessmentCycle.mutate();
    } catch (error) {
      Utils.errorLog(error);
    }
  }

  *submit() {
    console.log(this.store.store.assessmentTypeStore.assessmentType);

    try {
      let minimum = 0;
      if (this.simulationType === 'Baseline') {
        minimum =
          this.store.store.assessmentTypeStore?.assessmentType?.baseline
            ?.minimumHour! *
          60 *
          60;
      } else {
        minimum =
          this.store.store.assessmentTypeStore?.assessmentType?.followups?.find(
            (sim) => sim.simulationId === this.simulationId
          )?.minimumHour! *
          60 *
          60;
      }
      //@ts-ignore
      const usageTime = yield this.getUsageTime();

      if (minimum > usageTime) {        
        const mimHour: SweetAlertResult<any> = yield Swal.fire({
          icon: 'warning',
          title: 'Warning',
          html:
            'This simulation is designed to represent a section of a monitoring visit, therefore it is important to complete it to the best of your ability.<br>' +
            'The data from thousands of simulations shows most CRAs require at least 1 hour to successfully complete. <br>' +
            'By submitting the simulation, you confirm that you have completed it on your own and to the best of your ability.',
          width: 1300,
          cancelButtonText: 'Back to Simulation',
          showCancelButton: false,
          confirmButtonColor: green[500],
        });
        return;
      }
      const result: SweetAlertResult<any> = yield Swal.fire({
        icon: 'warning',
        title: 'Warning',
        html:
          'This simulation is designed to represent a section of a monitoring visit, therefore it is important to complete it to the best of your ability.<br>' +
          'The data from thousands of simulations shows most CRAs require at least 1 hour to successfully complete. <br>' +
          'By submitting the simulation, you confirm that you have completed it on your own and to the best of your ability.',
        width: 1300,
        confirmButtonText: 'SUBMIT',
        cancelButtonText: 'REVIEW',
        showCancelButton: true,
        confirmButtonColor: green[500],
      });

      if (result.isConfirmed) {
        Swal.fire({
          title: 'Submitting..',
          html: 'Do not close the window.',
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        });
        const body = {
          filter: {
            _id: this._id,
          },
          update: {
            submittedAt: new Date(),
          },
        };
        yield this.store.userSimulationRepository?.update(body);
        yield this.changeStatus(BaselineStatus.Scoring);
        try {
          //@ts-ignore
          const assessment = yield this.buildAssessment();
          this.status = BaselineStatus.Scoring;
          this.submittedAt = new Date();
          this.store.userSimulations[this._id].status = BaselineStatus.Scoring;
          this.store.userSimulations[this._id].submittedAt = this.submittedAt;

          this.store.store.logStore.create(SimEvent.OnClickSubmit);
          yield this.createAssessment(assessment);
        } catch (error) {
          console.log(error);
        }
        Swal.fire({
          title: 'Complete! Good Luck',
          confirmButtonText: 'Go To Overview',
        }).then(() => {
          this.store.store.screenRecorderStore.stop(true);
          this.store.router.go('/home');
        });
        this.store.store.viewportStore.viewports[2].active = false;
        const uiState = this.store.store.uiState;

        yield axios.patch('/v1/userAssessmentCycles/renewSummary', {
          filter: {
            $or: [{ userBaselineId: this._id }, { userFollowupIds: this._id }],
          },
        });

        uiState.userSimulation.mutate && uiState.userSimulation.mutate();

        uiState.assessmentCycle.mutate && uiState.assessmentCycle.mutate();
        return 'submit';
      } else {
        this.store.store.logStore.create(SimEvent.Review);
        return 'review';
      }
    } catch (error) {
      Utils.errorLog(error);
    }
  }

  *incUsageTime(amount: number) {
    this.screenTime += amount;
    this.recordingTime += amount;
    if (this.recordingTime > 1800) {
      if (
        !this.store.store.modalStore.note.isVisible ||
        this.store.store.noteStore.isMinimized
      ) {
        this.store.store.screenRecorderStore.restartScreenrecording();
        this.recordingTime = 0;
      } else if (this.store.store.noteStore.form.text === '') {
        this.store.store.screenRecorderStore.restartScreenrecording();
        this.recordingTime = 0;
      } else {
        if (this.prevNote === this.store.store.noteStore.form.text) {
          this.noteSecond++;
        } else {
          this.noteSecond = 0;
        }
        console.log(this.noteSecond);
        if (this.noteSecond > 5) {
          this.store.store.screenRecorderStore.restartScreenrecording();
          this.recordingTime = 0;
          this.noteSecond = 0;
        }
      }
    }

    yield this.store.userSimulationRepository.update({
      filter: { _id: this._id },
      update: {
        $inc: {
          usageTime: amount,
        },
      },
    });
    yield axios.patch('/v1/userAssessmentCycles/renewSummary', {
      filter: {
        $or: [{ userBaselineId: this._id }, { userFollowupIds: this._id }],
      },
    });
    const emptyTime = this.usageTime === 0;
    if (!emptyTime) {
      this.usageTime - amount;
      this.store.userSimulations[this._id].usageTime - amount;
    }
    this.prevNote = this.store.store.noteStore.form.text.slice();
  }

  async syncUsageTime(seconds: number) {
    const usageTimeSynced: any = await this.store.userSimulationRepository.update({
      filter: { _id: this._id },
      update: {
        $set: {
          usageTime: seconds,
        },
      },
    });

    // console.log("usageTimeSynced: ", usageTimeSynced)
    if(usageTimeSynced?.modifiedCount) {
      // const uiState = this.store.store.uiState;
      // uiState.userSimulation.mutate && uiState.userSimulation.mutate();
      this.store.userSimulations[this._id].usageTime = seconds
    } 
  }

  expiryTimestamp(testTime: number): Date {
    const time = new Date();

    const leftTime = testTime - this.usageTime;
    time.setSeconds(time.getSeconds() + leftTime);
    return time;
  }

  controlButton() {
    return {
      text: 'Start',
      start: () => this.start(),
      isVisible: this.status === BaselineStatus.Assigned,
    };
  }

  *resetForTest() {
    try {
      yield this.store.userSimulationRepository.update({
        filter: { _id: this._id },
        update: {
          attemptCount: 3,
          usageTime: 0,
          status: BaselineStatus.Assigned,
        },
      });
    } catch (error) {
      console.error(error);
    }
    this.status = BaselineStatus.Assigned;
    this.usageTime = 0;
    if (this.store.store.screenRecorderStore.screenRecorder) {
      this.store.store.screenRecorderStore.screenRecorder!.recorders = [];
      const screenRecorderId =
        this.store.store.screenRecorderStore.screenRecorder!._id;

      yield this.store.store.screenRecorderStore.screenRecorderRepository.update(
        {
          filter: { _id: screenRecorderId },
          update: { recorders: [] },
        }
      );
    }
    const viewportIds = this.store.store.viewportStore.viewports.map(
      (viewport) => viewport._id
    );
    this.store.store.viewportStore.viewports = [];
    yield this.store.store.viewportRepository?.delete({
      filter: {
        _id: {
          $in: viewportIds,
        },
      },
    });

    yield this.store.store.noteStore.noteRepository?.delete({
      filter: {
        userSimulationId: this._id,
      },
    });

    yield this.store.store.logStore.logRepository.delete({
      filter: {
        userId: this.store.store.authStore.user._id,
      },
    });

    yield this.store.store.screenRecorderStore.screenRecorderRepository.delete({
      filter: {
        userSimulationId: this._id,
      },
    });

    yield this.store.store.assessmentStore.repository.delete({
      filter: {
        userSimulationId: this._id,
      },
    });

    this.store.store.screenRecorderStore.stop(true);

    const uiState = this.store.store.uiState;

    uiState.userSimulation.mutate && uiState.userSimulation.mutate();

    uiState.assessmentCycle.mutate && uiState.assessmentCycle.mutate();

    this.store.router.go('/home');
  }

  *settingUsageTime(sec: number) {
    const time =
      this.store.store.assessmentTypeStore.assessmentType?.baseline?.testTime! +
      sec;

    this.usageTime = time;
    yield this.store.userSimulationRepository.update({
      filter: { _id: this._id },
      update: {
        usageTime: time,
      },
    });
  }

  *createAssessment(assessment: IAssessment) {
    try {
      yield this.store.store.assessmentStore.repository.create(assessment);
    } catch (error) {
      throw error;
    }
  }

  async buildAssessment() {
    try {
      const { store: rootStore } = this.store;

      const userSimulation = rootStore.userSimulationStore.userSimulation;

      const defaultForm = this.store.store.assessmentStore.defaultForm;

      const assessment = _.cloneDeep(defaultForm);
      assessment.userSimulationId = userSimulation?._id!;
      assessment.status = AssessmentStatus.Pending;

      return assessment;
    } catch (error) {
      throw error;
    }
  }
}
