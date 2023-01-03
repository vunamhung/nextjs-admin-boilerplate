import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AppShell, Header, MantineProvider, Navbar } from '@mantine/core';

import '@/assets/css/style.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NextJS</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <AppShell
          padding="md"
          navbar={
            <Navbar width={{ base: 200 }} p="xs">
              {/* Navbar content */}
            </Navbar>
          }
          header={
            <Header height={60} p="xs">
              <img className="h-6" src="/images/logo.svg" alt="logo" />
            </Header>
          }
          styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
          })}
        >
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>
    </>
  );
}
