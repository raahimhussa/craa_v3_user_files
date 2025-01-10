import { WrappingFunction } from '@shopify/react-compose';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const withEditMode =
  (_id: string, collectionName: string = ''): WrappingFunction =>
  (WrappedComponent) =>
    observer((props) => {
      const { data, error } = useSWR([
        `v1/${collectionName}`,
        { filter: { _id: _id } },
      ]);
      const router = useRouter();
      return <WrappedComponent {...props} {...router.query} />;
    });

export default withEditMode;
