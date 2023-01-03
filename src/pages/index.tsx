import Head from 'next/head';
import { Button } from '@mantine/core';

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="container">
        <Button variant="gradient">Next</Button>
      </div>
    </>
  );
}
