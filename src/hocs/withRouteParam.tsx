import { WrappingFunction } from '@shopify/react-compose';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';

const withRouteParam: WrappingFunction = (WrappedComponent) =>
  observer((props) => {
    const router = useRouter();
    return <WrappedComponent {...props} {...router.query} />;
  });

export default withRouteParam;
