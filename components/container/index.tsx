import Head from "next/head";

interface ContainerProps {
  children?: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <>
      <Head>
        <title>Crypto portfolio tracker</title>
        <meta name="description" content="A frontend application built with React and Next.js for tracking Cryptocurrency" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
}