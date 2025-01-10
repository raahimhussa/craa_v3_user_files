import { WrappingFunction } from '@shopify/react-compose';
import { observer } from 'mobx-react';
const withHandler: WrappingFunction = (WrappedComponent) =>
  observer((props) => {
    const onClick = () => {};

    const handlers = {
      onClick,
    };
    return <WrappedComponent {...props} {...handlers} />;
  });

export default withHandler;
