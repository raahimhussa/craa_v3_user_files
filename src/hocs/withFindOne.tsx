import { observer, useLocalObservable } from 'mobx-react';
import { fetcher } from 'src/libs/swr/fetcher';
import useSWRImmutable from 'swr/immutable';
import _ from 'lodash';
import pluralize from 'pluralize';
import Loading from 'src/ui/components/Loading/Loading';
import { useEffect } from 'react';
import { useRootStore } from 'src/stores';
import { RootStoreKeys } from 'src/stores/types';
import { RootStore } from 'src/stores/root';
import { Box } from '@mui/material';

type WithFindArguments = {
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
};
const withFindOne =
  ({
    storeKey = null,
    required = true,
    collectionName = '',
    getFilter = () => null,
    projection = null,
    getOptions = (rest: any) => null,
    propName = '',
    version = 1,
    id = 'custom',
  }: WithFindArguments) =>
  (WrappedComponent: any) =>
    observer(({ ...rest }: any) => {
      const store: RootStore = useRootStore();

      const localState = useLocalObservable(() => ({
        isStoreLoading: false,
      }));

      const params = {
        filter: getFilter(rest) || {},
        options: getOptions(rest),
        projection,
      };
      if (getOptions(rest)) {
        params.options.multi = false;
      } else {
        params.options = {
          multi: false,
        };
      }
      let key = `v${version}/${collectionName}`;
      if (version === 2) {
        key = `v${version}/${collectionName}/${id}`;
      }

      const { data, error, mutate, isValidating } = useSWRImmutable(
        [key, params],
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

export default withFindOne;
