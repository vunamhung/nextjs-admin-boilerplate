import { useRouter } from 'next/router';
import { http } from '@/utilities';
import queryString from 'query-string';
import useSWR from 'swr';

//prettier-ignore
export const fetcher = (url: string) => http(url).then((res) => res.data).catch(({ response }) => response.data);

function makeKey(path: string, params?: Record<string, any>) {
  return params ? `${path}?${queryString.stringify(params)}` : `${path}`;
}

function useKey(path: string, params?: any) {
  const { query } = useRouter();
  let finalQuery = { ...params, ...query };
  if (query?.page) {
    finalQuery = { ...finalQuery, page: Number(query?.page) - 1 };
  }

  return makeKey(path, finalQuery);
}
