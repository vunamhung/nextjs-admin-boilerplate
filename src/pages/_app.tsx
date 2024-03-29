import type { ToastOptions } from 'react-hot-toast';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppShell, MantineProvider } from '@mantine/core';
import { RouterTransition, Sidebar } from '@/components';
import { config, mantineTheme } from '@/utilities';
import { Toaster } from 'react-hot-toast';
import { SWRConfig } from 'swr';
import '@/assets/css/style.css';

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const toastOptions: ToastOptions = { duration: 4000, style: { background: '#222', color: '#fff' }, className: 'z-[99999]' };

  return (
    <>
      <Head>
        <title>{config.app.name}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <SWRConfig value={{ revalidateOnReconnect: true, errorRetryCount: 2 }}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineTheme}>
          <RouterTransition />
          {['/login', '/forgot-password', '/reset-password', '/signup-confirm', '/organizations'].includes(pathname) ? (
            <>
              <Toaster position="top-right" toastOptions={toastOptions} />
              <Component {...pageProps} />
            </>
          ) : (
            <AppShell padding="md" navbar={<Sidebar />} styles={(theme) => ({ main: { backgroundColor: theme.colors.gray[0] } })}>
              <Toaster position="top-right" toastOptions={toastOptions} />
              <Component {...pageProps} />
            </AppShell>
          )}
        </MantineProvider>
      </SWRConfig>
    </>
  );
}
