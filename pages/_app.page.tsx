'use client'

import dynamic from "next/dynamic";
import Container from 'components/container';
import RootStore from 'stores/_RootStore';
import {Provider, enableStaticRendering} from 'mobx-react';
import 'styles/globals.scss';


const isServer = typeof window !== undefined;
enableStaticRendering(isServer);

const Page = ({ Component, pageProps}) => {
  return (
    <Provider {...RootStore}>
      <Container>
        <Component {...pageProps} />
      </Container>
    </Provider>
  );
};

export default dynamic(() => Promise.resolve(Page), {
  ssr: false,
});