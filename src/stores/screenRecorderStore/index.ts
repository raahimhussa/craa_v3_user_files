import { autorun, IReactionDisposer, makeAutoObservable, reaction } from 'mobx';

import { Alert } from '@utils';
import { BaselineStatus } from 'src/models/userSimulation/types';
import { IViewport } from 'src/models/viewport/viewport.interface';
import { RootStore } from '../root';
import RouterStore from '../routerStore';
import ScreenRecorder from 'src/models/screenRecorder';
import ScreenRecorderRepository from 'src/repos/v2/screenRecorder';
import { ScreenRecorderStatus } from './types';
import { SimulationMode } from '../ui';
import Swal, { SweetAlertResult } from 'sweetalert2';
import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import FormData from 'form-data';

// @Esther UserFollowup은 테스트가 안 되어 있으니 테스트하시면서 버그는 수정해주세요.
export default class ScreenRecorderStore {
  rootStore: RootStore;
  router: RouterStore;
  status: ScreenRecorderStatus = ScreenRecorderStatus.Idle;
  mediaStream: MediaStream | null = null;
  mediaRecorder: MediaRecorder | null = null;
  options: MediaRecorderOptions = {
    mimeType: 'video/webm;codecs=vp9',
  };
  constraints: DisplayMediaStreamConstraints | undefined = {
    video: { width: 1280, height: 720 },
    audio: false,
  };
  eventHandler: IReactionDisposer | null = null;
  trainingRoomId: string = '';
  video: HTMLVideoElement | null = null;
  timer: any;
  timeLeft: number = 0;
  showPlayButton: boolean = true;
  screenRecorderRepository: ScreenRecorderRepository;
  screenRecorder: ScreenRecorder | null = null;
  urlArr: Array<any> = [];
  recordId: any;
  index: number = 0;
  simId: string = '';
  isScreenrecording = true;
  isLegal = true;
  isVideoRequested = false;
  interval: any;
  formData: any = new FormData();
  isVideoSaving: boolean = false;

  controlButton = {
    isVisible: false,
    text: 'Start',
  };

  routerHandler: IReactionDisposer | null = null;
  pathname = '';

  constructor(
    rootStore: RootStore,
    screenRecorderRepository: ScreenRecorderRepository
  ) {
    this.rootStore = rootStore;
    this.router = rootStore.routerStore;
    this.screenRecorderRepository = screenRecorderRepository;

    makeAutoObservable(this);

    this.routerHandler = reaction(
      () => this.pathname,
      async (newPathname, oldPathname) => {
        /**
         * @description 베이스라인 경로를 이탈했을 경우 스크린 레코딩 중지
         */
        if (oldPathname === '/baseline') {
          this.stop(false);
        }

        /**
         * @description 베이스라인 경로를 재진입시 스크린 레코딩 시작
         */
        if (newPathname === '/baseline') {
          if (this.router.router?.query.isScreenRecord === 'true') {
            this.start();
          } else {
            this.startWithoutScreenrecording();
          }
        }
      }
    );

    this.eventHandler = autorun(() => {
      if (this.mediaRecorder) {
        this.mediaRecorder.ondataavailable = (ev) => {
          this.onDataAvailable(ev);
        };

        this.mediaRecorder.onstop = (ev) => this.onStop(ev);

        this.mediaRecorder.onerror = (ev) => this.onError(ev);

        this.mediaRecorder.onpause = (ev) => this.onPause(ev);

        this.mediaRecorder.onstart = (ev) => this.onStart(ev);

        this.mediaRecorder.onresume = (ev) => this.onResume(ev);
      }
    });
    // this.eventHandler = reaction(
    //   () => this.mediaRecorder?.state,
    //   () => {
    //     console.log('reaction');
    //     if (this.mediaRecorder) {
    //       this.mediaRecorder.ondataavailable = (ev) => this.onDataAvailable(ev);

    //       this.mediaRecorder.onstop = (ev) => this.onStop(ev);

    //       this.mediaRecorder.onerror = (ev) => this.onError(ev);

    //       this.mediaRecorder.onpause = (ev) => this.onPause(ev);

    //       this.mediaRecorder.onstart = (ev) => this.onStart(ev);

    //       this.mediaRecorder.onresume = (ev) => this.onResume(ev);
    //     }
    //   }
    // );
  }

  *onDataAvailable(ev: BlobEvent): any {
    let url: any | null = null;

    // if (!url) {
    //   return null;
    // }
    // this.urlArr.push(url);
    // this.urlArr.push(url);
    this.index++;
    // this.formData.append(
    //   `file_${this.recordId}_${this.index}`,
    //   ev.data,
    //   `file_${this.recordId}_${this.index}.blob`
    // );
    this.formData.append(
      `file_${this.recordId}_${this.index}`,
      ev.data,
      `file_${this.recordId}_${this.index}.blob`
    );
  }
  // 필요시 개발
  onResume(ev: Event) {}
  // 필요시 개발
  onPause(ev: Event) {
    this.stop(false);
    this.isScreenrecording = false;
    this.router.go('/home');
  }
  // 필요시 개발
  onStart(ev: Event) {}
  // 필요시 개발
  onStop(ev: Event) {
    // this.stop(false);
    // this.isScreenrecording = false;
    // this.router.go('/home');
  }
  // 필요시 개발
  onError(ev: MediaRecorderErrorEvent) {}

  // 뷰포트 존재유무 체크
  *isViewportExist(viewport: IViewport) {
    try {
      const { viewportRepository } = this.rootStore;
      const { data } = yield viewportRepository?.findOne({
        filter: {
          _id: viewport._id,
          userSimulationId: viewport.userSimulationId,
          index: viewport.index,
        },
      });
      return !!data;
    } catch (error) {
      throw error;
    }
  }

  *restartScreenrecording() {
    const {
      userSimulationStore: { userSimulation },
    } = this.rootStore;

    this.isVideoSaving = true;
    this.stopScreenrecording();

    this.isVideoRequested = false;
    let userSimulationId: string = userSimulation?._id!;
    this.simId = userSimulationId!;
    const recordId = this.recordId.slice();

    this.formData.set('recordId', recordId);
    this.formData.set('userSimulationId', userSimulationId);
    // this.formData.set(
    //   'startSec',
    //   (userSimulation?.usageTime! + userSimulation?.screenTime!).toString()
    // );

    if (!this.isVideoRequested) {
      try {
        yield axios.post(
          'https://craa-sr-dev-3.hoansoft.com/v1/createBlob',
          this.formData
        );
        // axios.post('http://0.0.0.0:4001/v1/createVideo', data);
      } catch (error) {
        console.log(error);
        // axios.post('http://0.0.0.0:4001/v1/createVideo', formData);
        yield axios.post(
          'https://craa-sr-dev-3.hoansoft.com/v1/createBlob',
          this.formData
        );
        // axio
      }
      this.isVideoRequested = true;
    }
    this.startScreenrecording();
    this.isVideoSaving = false;
  }

  *start() {
    this.isVideoRequested = false;
    this.status = ScreenRecorderStatus.Start;
    this.urlArr = [];
    this.formData = new FormData();
    this.index = 0;
    const {
      viewportRepository,
      authStore: { user },
      uiState: { simulationMode },
      userSimulationStore: { userSimulation },
      routerStore,
    } = this.rootStore;

    this.recordId = Math.random().toString(36).substring(2, 12);
    this.formData.set(
      'startSec',
      (userSimulation?.usageTime! + userSimulation?.screenTime!).toString()
    );

    let userSimulationId: string = userSimulation?._id!;
    this.simId = userSimulationId!;

    // 스크린레코더 존재여부 점검
    const { _id: isScreenRecorderExist } =
      yield this.screenRecorderRepository.findOne({
        filter: {
          userSimulationId,
          // recorders: [],
        },
      });
    // 스크린레코더 없다면 생성
    if (
      // !!isScreenRecorderExist ||
      isScreenRecorderExist == undefined ||
      isScreenRecorderExist == ''
    ) {
      this.screenRecorderRepository.create({
        userSimulationId,
        recorders: [],
      });
    }
    /**
     * @description constraints에 맞춰서 영상 스트림 생성.
     */
    try {
      this.mediaStream = yield navigator.mediaDevices.getDisplayMedia(
        this.constraints
      );
    } catch (error: any & { name: string }) {
      console.log(error);
      let errMsg = 'Unknown Error. Please Contact CS Team';
      switch (error?.name) {
        case 'NotReadableError':
        case 'AbortError':
          errMsg = `
            <p>
            some problem occurred which prevented the device from being used.
            </p>
          `;
          break;
        case 'NotAllowedError':
          errMsg = `
            <ul>
            <p>
            if one or more of the requested source devices cannot be used at this time.
            This will happen if the browsing context is insecure (that is, the page was loaded using HTTP rather than HTTPS). 
            </p>
            <p>
            It also happens if the user has specified that the current browsing instance is not permitted access to the device, the user has denied access for the current session, or the user has denied all access to user media devices globally.
            </p>
            <ul>
            `;
          break;
        case 'OverconstrainedError':
          errMsg =
            'The specified constraints resulted in no candidate devices which met the criteria requested.';
        default:
          break;
      }

      /**
       * @description Start Button Hide
       */
      this.controlButton.isVisible = false;

      Swal.fire({
        width: 780,
        title: 'Denied by system',
        html: errMsg,
        confirmButtonText: 'Back to home ',
        backdrop:
          'linear-gradient(90deg, #377485 0%, #5B97A8 50.52%, #0A304D 100%)',
      }).then(() => {
        this.rootStore.userSimulationStore.userSimulations[
          userSimulationId
        ]?.updateAttemptCnt(
          this.rootStore.userSimulationStore.userSimulations[userSimulationId]
            ?.attemptCount + 1
        );
        this.rootStore.userSimulationStore.userSimulations[
          userSimulationId
        ].attemptCount =
          this.rootStore.userSimulationStore.userSimulations[userSimulationId]
            ?.attemptCount + 1;
        // 에러 발생으로 Home으로 이동합니다.
        this.rootStore.routerStore.go('/home');
      });
    }
    // Baseline이 한 번도 실행되지 않은 상태일 경우 User의 Viewport 3개를 생성합니다.
    if (userSimulation?.status === BaselineStatus.Assigned) {
      try {
        yield Promise.all(
          [0, 1, 2].map((value) => {
            const viewport: any = {
              userId: user._id,
              userSimulationId,
              // simulationId: assessmentType.baseline?.simulationId,
              index: value,
              active: false,
              isMounted: true,
            };
            // 뷰포트 없으면 생성
            if (!this.isViewportExist(viewport)) {
              return viewportRepository?.create(viewport);
            }
          })
        );
      } catch (error) {
        return console.error(error);
      }
    }

    console.info('after error');

    /**
     * @description 영상 녹음.
     */
    if (this.mediaStream) {
      this.mediaRecorder = yield new MediaRecorder(
        this.mediaStream,
        this.options
      );
    }

    /**
     * @description 영상 녹음 시작 1000(ms) * 1(초) * 1(분). 지금은 1초 간격으로 녹음
     */
    this.mediaRecorder?.start(1000 * 1 * 1);

    console.info('mediaRecording start');

    // 베이스라인인지 팔로우업인지 분기
    userSimulation?.start();
    this.isLegal = true;
    this.controlButton.isVisible = false;
  }

  *startScreenrecording() {
    this.urlArr = [];
    this.formData = new FormData();
    this.index = 0;
    this.isVideoRequested = false;
    const {
      viewportRepository,
      authStore: { user },
      uiState: { simulationMode },
      userSimulationStore: { userSimulation },
      routerStore,
    } = this.rootStore;

    this.recordId = Math.random().toString(36).substring(2, 12);
    let userSimulationId: string = userSimulation?._id!;
    this.simId = userSimulationId!;
    this.formData.set(
      'startSec',
      (userSimulation?.usageTime! + userSimulation?.screenTime!).toString()
    );
    try {
      this.mediaRecorder?.start(1000 * 1 * 1);

      console.info('mediaRecording start');
    } catch (error) {
      console.log(error);
    }
  }

  *stopScreenrecording() {
    try {
      this.status = ScreenRecorderStatus.Idle;
      if (this.mediaRecorder && this.mediaRecorder.state != 'inactive') {
        this.mediaRecorder?.stop();
        // this.mediaRecorder = null;
        // this.mediaStream?.getTracks().forEach((track) => track.stop());
        // this.mediaStream = null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  *startWithoutScreenrecording() {
    console.log('without');
    const {
      viewportRepository,
      authStore: { user },
      uiState: { simulationMode },
      userSimulationStore: { userSimulation },
      routerStore,
    } = this.rootStore;

    let userSimulationId = userSimulation?._id;

    /**
     * @description Start Button Hide
     */
    this.controlButton.isVisible = false;

    // Baseline이 한 번도 실행되지 않은 상태일 경우 User의 Viewport 3개를 생성합니다.
    if (userSimulation?.status === BaselineStatus.Assigned) {
      try {
        yield Promise.all(
          [0, 1, 2].map((value) => {
            const viewport: any = {
              userId: user._id,
              userSimulationId,
              // simulationId: assessmentType.baseline?.simulationId,
              index: value,
              active: false,
              isMounted: true,
            };
            // 뷰포트 없으면 생성
            if (!this.isViewportExist(viewport)) {
              return viewportRepository?.create(viewport);
            }
          })
        );
      } catch (error) {
        return console.error(error);
      }
    }

    // 베이스라인인지 팔로우업인지 분기
    if (simulationMode === SimulationMode.Baseline) {
      userSimulation?.start();
    } else {
      userSimulation?.start();
    }

    this.controlButton.isVisible = false;
  }

  *stop(isLegal: boolean) {
    const {
      uiState,
      uiState: { simulationMode },
      userSimulationStore: { userSimulation },
      userAssessmentCycleStore,
    } = this.rootStore;

    clearInterval(this.interval);
    let userSimulationId = userSimulation?._id;

    let key =
      simulationMode === SimulationMode.Baseline
        ? 'userSimulationId'
        : 'userSimulationId';

    const filter = {
      userSimulationId,
    };

    try {
      this.status = ScreenRecorderStatus.Idle;
      if (this.mediaRecorder && this.mediaRecorder.state != 'inactive') {
        this.mediaRecorder?.stop();
        this.mediaRecorder = null;
        this.mediaStream?.getTracks().forEach((track) => track.stop());
        this.mediaStream = null;
      }
    } catch (error) {
      console.log(error);
    }

    // this.requestVideo();
    this.isVideoRequested = false;
    this.simId = userSimulationId!;

    this.formData.set('recordId', this.recordId);
    this.formData.set('userSimulationId', userSimulationId);
    this.formData.set(
      'startSec',
      (userSimulation?.usageTime! + userSimulation?.screenTime!).toString()
    );

    if (!this.isVideoRequested) {
      try {
        yield axios.post(
          'https://craa-sr-dev-3.hoansoft.com/v1/createBlob',
          this.formData
        );
        // axios.post('http://0.0.0.0:4001/v1/createVideo', data);
      } catch (error) {
        console.log(error);
        // axios.post('http://0.0.0.0:4001/v1/createVideo', formData);
        yield axios.post(
          'https://craa-sr-dev-3.hoansoft.com/v1/createBlob',
          this.formData
        );
      }
      this.isVideoRequested = true;
    }

    /**
     * @description 영상 경로를 screenRecords collection에 recorders에 push
     */
    // let params = {
    //   filter: filter,
    //   update: {
    //     recorders: {
    //       info: {
    //         startSec: userSimulation?.usageTime,
    //         recordId: this.recordId,
    //       },
    //       urls: {
    //         length: this.urlArr.length,
    //         url: this.urlArr[0],
    //       },
    //     },
    //   },
    // };
    // let params2 = {
    //   filter: filter,
    //   options: {
    //     isUniq: true,
    //   },
    // };
    // let { recorders } = yield this.screenRecorderRepository.findOne({
    //   filter: {
    //     [key]: userSimulationId,
    //   },
    // });
    // try {
    //   if (this.urlArr.length !== 0) {
    //     yield this.screenRecorderRepository.update(params);
    //     yield this.screenRecorderRepository.update(params2);
    //   }
    // } catch (error) {
    //   Swal.fire({
    //     title: 'Error',
    //     icon: 'error',
    //   });
    // }

    // if (this.mediaStream != null) {
    //   const data = {
    //     userSimulationId: userSimulationId,
    //     recordId: this.recordId,
    //   };
    //   if (!this.isVideoRequested) {
    //     try {
    //       axios.post(
    //         'https://craa-sr-service-dev.hoansoft.com/v1/createVideo',
    //         data
    //       );
    //       // axios.post('http://0.0.0.0:4001/v1/createVideo', data);
    //     } catch (error) {
    //       // console.log(error);
    //       // axios.post('http://0.0.0.0:4001/v1/createVideo', data);
    //       axios.post(
    //         'https://craa-sr-service-dev.hoansoft.com/v1/createVideo',
    //         data
    //       );
    //     }
    //     this.isVideoRequested = true;
    //   }
    // }

    try {
      userSimulation?.updateUsageTime();
      userAssessmentCycleStore.inprogressTraining = '';
      userAssessmentCycleStore.openFollowup = '';

      // if (isLegal) {
      this.isLegal = isLegal;
      // }
      // this.isScreenrecording = false;

      uiState.baselineCard.mutate && uiState.baselineCard?.mutate();
      uiState.userSimulation.mutate && uiState.userSimulation?.mutate();
      uiState.note.mutate && uiState.note.mutate();
      uiState.assessmentCycle.mutate && uiState.assessmentCycle?.mutate();
    } catch (error) {}
  }

  resume() {
    this.status = ScreenRecorderStatus.Resume;
    this.mediaRecorder?.resume();
    this.timer.resume();
    this.video?.play();
  }

  pause() {
    this.status = ScreenRecorderStatus.Pause;
    this.timer.pause();
    this.video?.pause();
    this.mediaRecorder?.pause();
  }
}
