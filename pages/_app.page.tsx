import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import 'styles/globals.scss';

import dynamic from 'next/dynamic';
import Container from 'components/container';
import { MantineProvider } from '@mantine/core';
import { GlobalTrendProvider } from 'libs/context/global-trend';

const isServer = typeof window !== undefined;

const Page = ({ Component, pageProps }) => {
  return (
    <MantineProvider defaultColorScheme="dark">
      <GlobalTrendProvider>
        <Container>
          <Component {...pageProps} />
        </Container>
      </GlobalTrendProvider>
    </MantineProvider>
  );
};

export default dynamic(() => Promise.resolve(Page), {
  ssr: false,
});
