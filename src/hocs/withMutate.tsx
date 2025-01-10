import { observer } from 'mobx-react';
import { WrappingFunction } from '@shopify/react-compose';
import useMatchMutate from 'src/hooks/useMatchMutate';
const withMutate = (): WrappingFunction => (WrappedComponent) => observer((props) => {
  const matchMutate = useMatchMutate({});
  return <WrappedComponent {...props} matchMutate={matchMutate} />;
});

export default withMutate;
