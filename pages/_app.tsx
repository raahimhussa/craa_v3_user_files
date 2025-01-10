import * as React from 'react';
import '../styles/globals.css';
import '../src/startup/init';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { SWRConfig } from 'swr';
import { RootStoreProvider, useRootStore } from 'src/stores';
import createEmotionCache from 'src/ui/theme/createEmotionCache';
import customizedTheme from 'src/ui/theme/customizedTheme';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { AppProps } from 'next/app';
import { configure, reaction } from 'mobx';
import DialogMount from './dialog-mount';
import ModalMount from './modal-mount';
import { SnackbarProvider } from 'notistack';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';

configure({
  enforceActions: 'never',
});

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache: any;
};

export default function MyApp({
  Component,
  pageProps,
  ...rest
}: {
  Component: any;
  pageProps: any;
  emotionCache: any;
}) {
  const { emotionCache = clientSideEmotionCache } = rest;
  // const router = useRouter()
  // const { screenRecorderStore } = useRootStore()

  // React.useEffect(() => {
  //   screenRecorderStore.pathname = router.pathname
  // }, [router.pathname])

  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={customizedTheme}>
          <SnackbarProvider>
            <CssBaseline />
            {/* <Box>{router.pathname}</Box> */}
            <RootStoreProvider>
              <DialogMount />
              <ModalMount />
              <div>
                <Component {...pageProps} />
              </div>
            </RootStoreProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    </SWRConfig>
  );
}
