import { WrappingFunction } from '@shopify/react-compose';
import { observable } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react';

const withState = (getState = ({ }) => { }, propName = 'state'): WrappingFunction => (WrappedComponent) => observer((props) => {
  // @ts-ignore
  const state: any = useLocalObservable(() => getState(props));
  const _props = {
    ...props,
    [propName]: observable(state),
  };
  return <WrappedComponent {..._props} />;
});

export default withState;
