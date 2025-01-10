import { IStore } from '../types';
import { RootStore } from '../root';
import RouterStore from '../routerStore';
import { SimEvent } from 'src/models/log/types';
import { SimulationMode } from '../ui';
import Viewport from 'src/models/viewport';
import ViewportRepository from 'src/repos/v2/viewport';
import _ from 'lodash';
import { makeAutoObservable } from 'mobx';

export default class ViewportStore implements IStore {
  rootStore: RootStore;
  router: RouterStore;
  viewports: Viewport[] = [];
  viewportRepository: ViewportRepository;
  girdSize: number = 12;
  isFullscreen: boolean = false;
  isBrowserFullscreen: boolean = false;
  preMountedViewportIds: string[] = [];
  isTreeOpen: boolean = false;
  isFolderOpen: boolean = false;
  activeViewport: string = '';
  popperBtns: Array<any> = [];
  constructor(rootStore: RootStore, viewportRepository: ViewportRepository) {
    this.rootStore = rootStore;
    this.router = rootStore.routerStore;
    this.viewportRepository = viewportRepository;
    makeAutoObservable(this, {
      rootStore: false,
      // activeViewport: false,
    });
  }

  loadData(data: Viewport[]) {
    this.viewports = data.map((data) => {
      const viewport = new Viewport(this, data);
      return viewport;
    });
  }
  async save(simulationMode: SimulationMode) {
    const filter: any = {
      user: this.rootStore.authStore.user?._id,
      // userSimulationId: userSimulation?._id,
      simulationId: this.rootStore.simulationStore.simulation?._id,
    };
    filter.userSimulationId =
      this.rootStore.userSimulationStore.userSimulation?._id;
    const params = {
      filter: filter || {},
      options: {
        sort: {
          index: 1,
        },
      },
    };
    const data = await this.viewportRepository.find(params);
    this.loadData(data.data);
  }

  getGridSize() {
    const mountedViewportCount = this.viewports.filter(
      (viewport) => viewport.isMounted
    ).length;

    if (mountedViewportCount > 0) {
      if (mountedViewportCount > 2) {
        return this.girdSize / 2;
      }
      return this.girdSize / this.getMountedViewportCount();
    }
    return this.girdSize;
  }

  getMountedViewportCount() {
    return this.mountedViewports()?.length;
  }

  getActiveViewport() {
    return this.viewports.find((viewport) => viewport.active);
  }

  mountedViewports() {
    return this.viewports?.filter((viewport: Viewport) => viewport.isMounted);
  }

  unmountedViewports() {
    return this.viewports?.filter((viewport: Viewport) => !viewport.isMounted);
  }

  *createViewport(viewport: Viewport) {
    console.log(this.viewports);
    const filter: any = {
      user: this.rootStore.authStore.user?._id,
      // userSimulationId: userSimulation?._id,
      simulationId: this.rootStore.simulationStore.simulation?._id,
    };
    filter.userSimulationId =
      this.rootStore.userSimulationStore.userSimulation?._id;
    const params = {
      filter: filter || {},
      options: {
        sort: {
          index: 1,
        },
      },
    };
    const { data } = yield this.viewportRepository.find(params);
    if (data.length < 3) {
      console.log(viewport);
      const { data } = yield this.viewportRepository.create(viewport);
      this.viewports.push(new Viewport(this.rootStore.viewportStore, data));
    }
    this.rootStore.uiState.toolbar?.mutate &&
      this.rootStore.uiState.toolbar?.mutate();
  }
  *addViewport() {
    const element = document.querySelector('.viewport2') as HTMLElement | null;
    if (element != null) {
      element.style.display = 'block';
      console.log(this.viewports);
      yield this.rootStore.logStore.create(SimEvent.OnClickAddViewport);
    }
  }
}
