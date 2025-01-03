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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
}
