import '../styles/globals.css';
import '../styles/font.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;

import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import { useCallback, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useDispatch } from 'react-redux';
import type { AnyAction } from 'redux';

import { getUserInfoApi } from '../apis/user';
import Head from '../items/Head';
import initMockAPI from '../mocks';
import { login } from '../redux/actions';
import { wrapper } from '../redux/store';
import { kakaoInit } from '../scripts/Kakao';
import { globalStyles } from '../styles/reset';
import { logger } from '../utills/logger';

if (process.env.NEXT_PUBLIC_USE_API_MOCKING === 'true') {
  logger.log('Using mock API');
  void initMockAPI();
}

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const dispatch = useDispatch();

  const getUserInfo = useCallback(async () => {
    try {
      const data = await getUserInfoApi();

      if (data.userName) {
        dispatch(
          login({
            isLogin: true,
            userName: data.userName,
            userSeq: data.userSeq,
          }) as unknown as AnyAction,
        );
      }
    } catch (error) {
      logger.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    void getUserInfo();
  }, [getUserInfo]);

  useEffect(() => {
    kakaoInit();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={globalStyles} />
      <Head />
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default wrapper.withRedux(MyApp);
