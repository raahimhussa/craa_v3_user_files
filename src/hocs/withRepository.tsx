import { observer } from 'mobx-react';
import { WrappingFunction } from '@shopify/react-compose';
import { useRootStore } from 'src/stores';
import { RootStore } from 'src/stores/root';
const withRepository =
  (kind: keyof RootStore): WrappingFunction =>
  (WrappedComponent) =>
    observer((props) => {
      const repository = useRootStore()[kind];
      const _props = {
        [kind]: repository,
      };
      return <WrappedComponent {...props} {..._props} />;
    });
export default withRepository;
