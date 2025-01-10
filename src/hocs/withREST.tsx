import { observer, useLocalObservable } from 'mobx-react';

import Loading from 'src/ui/components/Loading/Loading';
import { RootStore } from 'src/stores/root';
import { RootStoreKeys } from 'src/stores/types';
import _ from 'lodash';
import { fetcher } from 'src/libs/swr/fetcher';
import pluralize from 'pluralize';
import { useEffect } from 'react';
import { useRootStore } from 'src/stores';
import useSWRImmutable from 'swr/immutable';

type WithRESTArguments = {
  collectionName: string;
  getFilter?: Function;
  projection?: any;
  getOptions?: Function;
  propName?: string;
  version?: number;
  id?: string;
  storeData?: boolean;
  storeKey?: RootStoreKeys | null;
  required?: boolean;
  path?: (props: any) => string;
  params?: (props: any) => any;
};
const withREST =
  ({
    storeKey = null,
    required = true,
    collectionName = '',
    getFilter = () => null,
    projection = null,
    getOptions = (rest: any) => null,
    propName = '',
    version = 1,
    path = () => '',
    params = () => null,
    id = 'custom',
  }: WithRESTArguments) =>
  (WrappedComponent: any) =>
    observer(({ ...rest }: any) => {
      const store: RootStore = useRootStore();

      const localState = useLocalObservable(() => ({
        isStoreLoading: false,
      }));

      let key = `v${version}/${collectionName}/${path(rest)}`;

      const { data, error, mutate, isValidating } = useSWRImmutable(
        [key, params(rest)],
        fetcher
      );

      let _propName = pluralize.singular(collectionName);
      if (propName) {
        _propName = propName;
      }

      useEffect(() => {
        localState.isStoreLoading = true;
        if (storeKey && data && store[storeKey]) {
          // console.log('loading data', storeKey)
          // @ts-ignore
          store[storeKey]?.loadData && store[storeKey]?.loadData(data);
          localState.isStoreLoading = false;
        }
      }, [data, localState, store]);

      // 로딩관련 작업 필요

      if (required) {
        if (isValidating) return null;

        if (_.isEmpty(data)) return null;

        if (error) return null;

        if (storeKey && localState.isStoreLoading) return null;
      }

      const props = {
        ...rest,
        [_propName]: data,
        [`${_propName}Mutate`]: mutate,
      };

      return <WrappedComponent {...props} />;
    });

export default withREST;
