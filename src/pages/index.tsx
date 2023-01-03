import Head from 'next/head';
import { Button } from '@mantine/core';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="container">
        <img className="h-8" src="/images/logo.svg" />
        <br />
        <Button variant="gradient">Next</Button>
      </div>
    </>
  );
}
