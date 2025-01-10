import { observer } from 'mobx-react';
import { WrappingFunction } from '@shopify/react-compose';
import { useRootStore } from 'src/stores';
import { RootStore } from 'src/stores/root';
const withStore =
  (kind: keyof RootStore = 'authStore'): WrappingFunction =>
    (WrappedComponent) =>
      observer((props) => {
        const storeByKind = useRootStore()[kind];
        const store = useRootStore()

        const _props = {
          store: store,
          [kind]: storeByKind,
        };
        return <WrappedComponent {...props} {..._props} />;
      });
export default withStore;
