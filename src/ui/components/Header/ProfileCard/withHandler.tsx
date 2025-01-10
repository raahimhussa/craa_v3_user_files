import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { useRootStore } from 'src/stores';

const withHandler = (WrappedComponent: any) =>
  observer(({ state, matchMutate, ...rest }: any) => {
    const router = useRouter();
    const { authStore } = useRootStore();
    const onClickSignin = () => {
      router.push('/auth/signin');
    };
    const onClickSignup = () => {
      router.push('/auth/signup');
    };

    const onClickLogout = () => {
      authStore.logout();
      matchMutate('v1/auth/token');
    };

    const handlers = {
      onClickSignin,
      onClickSignup,
      onClickLogout,
    };

    return <WrappedComponent {...rest} {...handlers} state={state} />;
  });

export default withHandler;
