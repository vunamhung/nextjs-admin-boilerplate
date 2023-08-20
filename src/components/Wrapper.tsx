import type { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from '@mantine/core';
import { Skeleton } from './Skeleton';
import { FiChevronLeft } from 'react-icons/fi';

export const Wrapper: FC<iWrapper> = ({ title, className = 'container space-y-8', withBack = false, actions, showLoading, children }) => {
  const { back } = useRouter();

  return (
    <div className={className}>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex items-end justify-between">
        <div>
          <h3>{title}</h3>
        </div>
        {(withBack || actions) && (
          <div className="space-x-2">
            {withBack && (
              <Button onClick={back} variant="outline" leftIcon={<FiChevronLeft size={18} />}>
                Back
              </Button>
            )}
            {actions}
          </div>
        )}
      </div>
      {showLoading ? <Skeleton className="rounded bg-white p-4" /> : children}
    </div>
  );
};
