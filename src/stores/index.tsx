import { useUser } from '@hooks';
import _ from 'lodash';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect } from 'react';
// import { useSocket } from 'src/hooks/useSocket';
import { createRootStore } from './root';

const StoreContext = React.createContext<
  ReturnType<typeof createRootStore> | undefined
>(undefined);

export const RootStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router: NextRouter = useRouter();

  const root = createRootStore();

  root.routerStore.setRouter(router);

  const { data: user } = useUser();

  useEffect(() => {
    if (!_.isEmpty(user)) {
      root.authStore.user = user;
    } else {
      //@ts-ignore
      root.authStore.user = null;
    }
  }, [user]);

  React.useEffect(() => {
    root.screenRecorderStore.pathname = router.pathname;
  }, [root.screenRecorderStore, router.pathname]);

  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
};

export const useRootStore = () => {
  const context = React.useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider');
  }
  return context;
};
