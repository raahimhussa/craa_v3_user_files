import { useUser } from '@hooks';
import { WrappingFunction } from '@shopify/react-compose';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useRootStore } from 'src/stores';
import Loading from 'src/ui/components/Loading/Loading';
const withAuth: WrappingFunction = (WrappedComponent) =>
  observer((props) => {
    const { data: user, error, isValidating } = useUser();
    const { authStore, routerStore } = useRootStore();

    useEffect(() => {
      if (user) {
        // if (user?.role.title !== 'SimUser') {
        //   routerStore.go('auth/signin');
        // }
        authStore.user = user;
      } else if (!isValidating && !user) {
        routerStore.go('auth/signin');
      } else if (error) routerStore.go('auth/signin');
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, error]);

    if (isValidating && !user) {
      return <Loading />;
    }
    if (error) {
      return <Loading />;
    }
    if (!user) {
      return <Loading />;
    }

    return <WrappedComponent {...props} user={user} />;
  });

export default withAuth;
