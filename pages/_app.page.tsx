import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import 'styles/globals.scss';

import dynamic from 'next/dynamic';
import Container from 'components/container';
import RootStore from '../stores/_RootStore';
import { Provider, enableStaticRendering } from 'mobx-react';
import { MantineProvider } from '@mantine/core';
import { GlobalTrendProvider } from 'libs/context/global-trend';

const isServer = typeof window !== undefined;

enableStaticRendering(isServer);

const Page = ({ Component, pageProps }) => {
  return (
    <Provider {...RootStore}>
      <MantineProvider defaultColorScheme="dark">
        <GlobalTrendProvider>
          <Container>
            <Component {...pageProps} />
          </Container>
        </GlobalTrendProvider>
      </MantineProvider>
    </Provider>
  );
};

export default dynamic(() => Promise.resolve(Page), {
  ssr: false,
});
