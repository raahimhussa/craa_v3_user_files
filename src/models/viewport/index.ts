import { IModel } from '../types';
import { ISimDoc } from '../simDoc/simDoc.interface';
import { IViewport } from './viewport.interface';
import { PDFDocumentProxy } from 'src/ui/components/PDF/type';
import { SimEvent } from '../log/types';
import ViewportStore from 'src/stores/viewportStore';
import axios from 'axios';
import { makeAutoObservable } from 'mobx';

export default class Viewport implements IModel, IViewport {
  _id: any = null;
  active: boolean = false;
  index: number = 0;
  userId: string = '';
  simulationId: string = '';
  userSimulationId: string = '';
  simDoc: ISimDoc | null = null;
  viewedSimDocIds: Array<number> = [];
  isDeleted: boolean = false;
  isMounted: boolean = false;
  createdAt: number = Date.now();
  updatedAt: number = Date.now();
  isDocOpen: boolean = false;
  isMinimize: boolean = false;

  filter = {
    _id: this._id,
  };
  store: ViewportStore;
  constructor(store: ViewportStore, data: IViewport) {
    makeAutoObservable(this, {
      store: false,
    });
    this.store = store;
    Object.assign(this, data);
  }

  load(data: any) {
    Object.assign(this, data);
  }

  getDefaultFilter() {
    const filter = {
      _id: this._id,
    };
    console.log(filter);
    return filter;
  }

  *markSimDocAsViewed(simDoc: ISimDoc, simId: string) {
    console.log(simDoc);
    try {
      yield this.store?.viewportRepository.update({
        filter: {
          // _id: viewportId,
          userSimulationId: simId,
        },
        update: {
          $addToSet: {
            viewedSimDocIds: simDoc._id,
          },
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    }

    // this.viewedSimDocIds.push(simDoc._id);
    this.store.viewports.map((viewport: any) => {
      viewport.viewedSimDocIds.push(simDoc._id);
    });
  }

  *selectSimDoc(simDoc: ISimDoc, viewportId: string) {
    // console.log('_simDoc', simDoc);
    yield this.store?.viewportRepository.update({
      filter: {
        _id: viewportId,
      },
      update: {
        simDoc: simDoc,
      },
    });
    this.simDoc = simDoc;
    yield this.store?.rootStore.logStore.create(SimEvent.onClickSimDoc);
  }

  *increasePage(amount: number = 1, viewportId: string) {
    this.store?.viewportRepository.update({
      filter: {
        _id: viewportId,
      },
      update: {
        $inc: {
          'simDoc.currentPage': amount,
        },
      },
    });
  }

  *updatePage(page: number = 1, viewportId: string) {
    yield this.store?.viewportRepository.update({
      filter: {
        _id: viewportId,
      },
      update: {
        'simDoc.currentPage': page,
      },
    });
  }

  *updateScale(amount: number = 0.25, viewportId: string) {
    yield this.store?.viewportRepository.update({
      filter: {
        _id: viewportId,
      },
      update: {
        $inc: {
          'simDoc.scale': amount,
        },
      },
    });
  }

  *nextPage(viewportId: string) {
    this.store.viewports[0].isDocOpen = false;
    this.store.viewports[1].isDocOpen = false;
    this.store.viewports[2].isDocOpen = false;
    if (this.simDoc) {
      const isEndPage = this.simDoc.currentPage + 1 === this.simDoc?.totalPage;
      if (isEndPage) return null;
      yield this.increasePage(1, viewportId);
      this.simDoc!.currentPage = this.simDoc!.currentPage + 1;

      yield this.store?.rootStore.logStore.create(SimEvent.OnClickNextPage);
    }
    window.location.hash = `${this.simDoc?._id}_${this.simDoc?.currentPage}`;
  }

  *prevPage(viewportId: string) {
    this.store.viewports[0].isDocOpen = false;
    this.store.viewports[1].isDocOpen = false;
    this.store.viewports[2].isDocOpen = false;
    if (this.simDoc?.currentPage === 0) {
      return null;
    }
    yield this.increasePage(-1, viewportId);
    this.simDoc!.currentPage = this.simDoc!.currentPage - 1;
    yield this.store?.rootStore.logStore.create(SimEvent.OnClickPrevPage);
    window.location.hash = `${this.simDoc?._id}_${this.simDoc?.currentPage}`;
  }

  *searchPage(page: number, viewportId: string) {
    this.store.viewports[0].isDocOpen = false;
    this.store.viewports[1].isDocOpen = false;
    this.store.viewports[2].isDocOpen = false;
    if (!page) {
      yield this.updatePage(0, viewportId);
    }
    if (page > 0) {
      yield this.updatePage(page, viewportId);
      this.simDoc!.currentPage = page - 1;
    }
    yield this.store?.rootStore.logStore.create(SimEvent.SearchPDFPage);
    window.location.hash = `${this.simDoc?._id}_${this.simDoc?.currentPage}`;
  }

  *setCurrentPage(page: number, viewportId: string) {
    if (!page) {
      yield this.updatePage(0, viewportId);
    }
    if (page > 0) {
      yield this.updatePage(page, viewportId);
      this.simDoc!.currentPage = page - 1;
    }
  }

  *scaleUp(viewportId: string) {
    this.store.viewports[0].isDocOpen = false;
    this.store.viewports[1].isDocOpen = false;
    this.store.viewports[2].isDocOpen = false;
    if (this.simDoc) {
      if (this.simDoc.scale > 3.75) {
        return null;
      }

      yield this.updateScale(0.25, viewportId);
      this.simDoc.scale = this.simDoc.scale + 0.25;
    }
    // console.log(this.simDoc?.scale);
    yield this.store?.rootStore.logStore.create(SimEvent.OnClickScaleUp);
  }

  *scaleDown(viewportId: string) {
    this.store.viewports[0].isDocOpen = false;
    this.store.viewports[1].isDocOpen = false;
    this.store.viewports[2].isDocOpen = false;
    if (this.simDoc) {
      if (this.simDoc.scale < 0.5) {
        return null;
      }
      yield this.updateScale(-0.25, viewportId);
      this.simDoc.scale = this.simDoc.scale - 0.25;
    }
    yield this.store?.rootStore.logStore.create(SimEvent.OnClickScaleDown);
  }

  *toggleActive(viewportId: string) {
    this.store.viewports[0].isDocOpen = false;
    this.store.viewports[1].isDocOpen = false;
    this.store.viewports[2].isDocOpen = false;
    yield this.store?.viewportRepository.update({
      filter: { _id: viewportId },
      update: { active: true },
    });

    yield this.store?.viewportRepository.update({
      filter: {
        _id: {
          $ne: viewportId,
        },
      },
      update: {
        active: false,
      },
    });

    this.store?.viewports.forEach((viewport: Viewport) => {
      if (viewport._id === viewportId) {
        viewport.active = true;
      } else {
        viewport.active = false;
      }
    });

    this.store?.rootStore.logStore.create(SimEvent.onClickViewport);
  }

  *onLoadPdf(pdf: PDFDocumentProxy, viewportId: string) {
    if (this.simDoc) {
      yield this.store?.viewportRepository.update({
        filter: {
          _id: viewportId,
        },
        update: {
          'simDoc.totalPage': pdf._pdfInfo.numPages,
        },
      });
      this.simDoc.totalPage = pdf._pdfInfo.numPages;
    }
  }

  *onLoadHtml(pageNum: any, viewportId: string) {
    if (this.simDoc) {
      yield this.store?.viewportRepository.update({
        filter: {
          _id: viewportId,
        },
        update: {
          'simDoc.totalPage': pageNum,
        },
      });
      this.simDoc.totalPage = pageNum;
    }
  }

  *closeFullscreen(index: number) {
    // console.log('closed!');
    this.store.viewports[0].isDocOpen = false;
    this.store.viewports[1].isDocOpen = false;
    this.store.viewports[2].isDocOpen = false;
    this.store.isFullscreen = false;
    const element = document.querySelector(
      '.viewport' + index
    ) as HTMLElement | null;
    if (element != null) {
      element.style.width = '49.5vw';
      element.style.position = 'relative';
      element.style.zIndex = '2';
    }

    yield this.store?.viewportRepository.update({
      filter: { _id: { $in: this.store.preMountedViewportIds } },
      update: { isMounted: true },
    });
    // this.store?.rootStore.uiState.toolbar.mutate &&
    //   this.store?.rootStore.uiState.toolbar.mutate();
    this.store.preMountedViewportIds = [];
    yield this.store?.rootStore.logStore.create(SimEvent.OnClickExitFullScreen);
  }

  *fullscreen(viewportId: string, index: number) {
    this.store.viewports[0].isDocOpen = false;
    this.store.viewports[1].isDocOpen = false;
    this.store.viewports[2].isDocOpen = false;
    this.store.isFullscreen = true;
    const element = document.querySelector(
      '.viewport' + index
    ) as HTMLElement | null;
    if (element != null) {
      element.style.width = '100vw';
      element.style.position = 'absolute';
      element.style.zIndex = '3';
    }

    const viewportIds = this.store?.viewports
      .filter((viewport) => viewport._id != viewportId)
      .filter((viewport) => viewport.isMounted)
      .map((viewport) => viewport._id);

    this.store.preMountedViewportIds = viewportIds;

    yield this.store?.viewportRepository.update({
      filter: { _id: viewportId },
      update: { isMounted: true },
    });

    yield this.store?.viewportRepository.update({
      filter: { _id: { $in: viewportIds } },
      update: { isMounted: false },
    });

    // this.store?.rootStore.uiState.toolbar.mutate &&
    //   this.store?.rootStore.uiState.toolbar.mutate();
    yield this.store?.rootStore.logStore.create(SimEvent.OnClickFullScreen);
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  tranformScaleToPercentage() {
    if (this.simDoc?.scale) return this.simDoc?.scale * 100;
    else return 100;
  }

  getJSON(): IViewport {
    return {
      _id: this._id,
      active: this.active,
      index: this.index,
      userId: this.userId,
      simulationId: this.simulationId,
      userSimulationId: this.userSimulationId,
      simDoc: this.simDoc,
      viewedSimDocIds: this.viewedSimDocIds,
      isDeleted: this.isDeleted,
      isMounted: this.isMounted,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
