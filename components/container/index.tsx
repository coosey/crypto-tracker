import Head from 'next/head';

interface ContainerProps {
  children?: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <>
      <Head>
        <title>Crypto portfolio tracker</title>
        <meta
          name="description"
          content="A frontend application built with React and Next.js for tracking Cryptocurrency"
        />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://api.coingecko.com" rel="dns-prefetch" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      {children}
    </>
  );
}
