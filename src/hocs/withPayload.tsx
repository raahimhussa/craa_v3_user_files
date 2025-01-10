import { observer } from 'mobx-react';
import { WrappingFunction } from '@shopify/react-compose';
import { useRootStore } from 'src/stores';
import ModalStore from 'src/stores/modalStore';

type T = Omit<ModalStore, 'store' | 'router'>;

const withPayload =
  (kind: keyof T): WrappingFunction =>
    (WrappedComponent) =>
      observer((props) => {
        const {
          modalStore,
        }: {
          modalStore: ModalStore;
        } = useRootStore();
        return (
          <WrappedComponent
            {...props}
            {...modalStore[kind]}
            // @ts-ignore
            {...modalStore[kind].payload}
          />
        );
      });

export default withPayload;
