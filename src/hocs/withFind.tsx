import { Alert, AlertTitle } from '@mui/material';
import _ from 'lodash';
import { observer, useLocalObservable } from 'mobx-react';
import React, { useEffect } from 'react';
import { fetcher } from 'src/libs/swr/fetcher';
import { useRootStore } from 'src/stores';
import { RootStore } from 'src/stores/root';
import { RootStoreKeys } from 'src/stores/types';
import Loading from 'src/ui/components/Loading/Loading';
import { SWRConfiguration } from 'swr';
import useSWRImmutable from 'swr/immutable';

type WithFindArguments = {
  collectionName: string | ((props: any) => string);
  getFilter?: Function;
  projection?: any;
  getOptions?: Function;
  propName?: string;
  swrConfig?: SWRConfiguration;
  version?: number;
  storeKey?: RootStoreKeys | null;
};

const withFind =
  ({
    collectionName = '',
    getFilter = () => null,
    projection = null,
    getOptions = () => null,
    propName = '',
    swrConfig = {
      revalidateOnFocus: false,
    },
    version = 1,
    storeKey = 'dialogStore',
  }: WithFindArguments) =>
  (WrappedComponent: any) =>
    observer((props: any) => {
      const store: RootStore = useRootStore();
      const localState = useLocalObservable(() => ({
        isStoreLoading: false,
      }));
      const params = {
        filter: getFilter(props) || {},
        options: getOptions(props),
        projection,
      };
      let _collectionName = '';

      if (typeof collectionName === 'function') {
        _collectionName = collectionName(props);
      } else {
        _collectionName = collectionName;
      }

      if (getOptions(props)) {
        params.options.multi = true;
      } else {
        params.options = {
          multi: true,
        };
      }

      const { data, error, mutate, isValidating } = useSWRImmutable(
        [`v${version}/${_collectionName}`, params],
        fetcher,
        swrConfig
      );
      useEffect(() => {
        if (storeKey == 'viewportStore') {
          console.log(data);
        }
        localState.isStoreLoading = true;
        if (storeKey && data) {
          // @ts-ignore
          store[storeKey].mutate = mutate;
          // @ts-ignore
          store[storeKey]?.loadData && store[storeKey]?.loadData(data);
          localState.isStoreLoading = false;
        }
      }, [data, localState, store]);

      // 로딩 관련 작업 필요(디자인 없음)

      // if (isValidating) return null;
      if (isValidating) {
        // console.log('isValidating..')
        return null;
      }

      if (!data) {
        // console.log('no data..')
        return null;
      }

      if (error) {
        // console.log('error..')
        return null;
      }

      if (storeKey && localState.isStoreLoading) return null;

      let _propName = _collectionName;

      if (propName) {
        _propName = propName;
      }

      const isEmpty = data.length === 0;

      const getPlaceholder = (children?: React.ReactNode) => (
        <Alert severity="info">
          <AlertTitle>Blank</AlertTitle>
          {children}
        </Alert>
      );

      const _props = {
        ...props,
        [_propName]: _.isEmpty(data) ? [] : data,
        [`${_propName}Mutate`]: mutate,
        isEmpty,
        getPlaceholder,
      };
      return <WrappedComponent {..._props} />;
    });

export default withFind;
