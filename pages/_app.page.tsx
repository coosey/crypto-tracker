import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import 'styles/globals.scss';

import dynamic from 'next/dynamic';
import Container from 'components/container';
import { MantineProvider } from '@mantine/core';
import { HydrateZustand, AuthProvider } from 'stores';
import { GlobalTrendProvider } from 'libs/context/globalTrend.context';
import { AlertProvider } from 'libs/context/alert.context';
import LoadingComponent from './loadingComponent';

const Page = ({ Component, pageProps }) => {
  return (
    <HydrateZustand>
      <AuthProvider>
        <MantineProvider defaultColorScheme="dark">
          <GlobalTrendProvider>
            <AlertProvider>
              <Container>
                <LoadingComponent />
                <Component {...pageProps} />
              </Container>
            </AlertProvider>
          </GlobalTrendProvider>
        </MantineProvider>
      </AuthProvider>
    </HydrateZustand>
  );
};

export default dynamic(() => Promise.resolve(Page), {
  ssr: false,
});
