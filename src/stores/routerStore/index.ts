import { stubFalse } from 'lodash';
import { IReactionDisposer, makeAutoObservable, reaction } from 'mobx';
import { NextRouter } from 'next/router';
import { RootStore } from '../root';
import { IStore } from '../types';
import { TransitionOptions, Url } from './types';
export default class RouterStore implements IStore {
  router: NextRouter | undefined;
  store: RootStore;
  pathname: string | undefined = '';
  routerHandler: IReactionDisposer | null = null;

  constructor(store: RootStore, router?: NextRouter) {
    makeAutoObservable(this);
    this.router = router;
    this.store = store;

    this.router?.beforePopState(function (state) {
      return true;
    });

    this.routerHandler = reaction(
      () => this.pathname,
      (route) => {
        console.info('router route:', route);
      }
    );
  }

  loadData(data: any) {}

  setRouter(router: NextRouter) {
    this.router = router;
  }

  go(url: Url, as?: Url, options?: TransitionOptions) {
    if (typeof window === 'undefined') return new Error('only client');
    // if (url == '/home') {
    //   this.router &&
    //     this.router.push(url, as, options).then(() => this.router?.reload());
    // } else {
    //   this.router && this.router.push(url, as, options);
    // }
    this.router && this.router.push(url, as, options);
  }

  replace(url: Url, as?: Url, options?: TransitionOptions) {
    if (typeof window === 'undefined') return new Error('only client');
    this.router && this.router.replace(url, as, options);
  }

  setPathname(pathname: string) {
    this.pathname = pathname;
  }
}
