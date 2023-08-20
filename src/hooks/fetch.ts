import { useRouter } from 'next/router';
import { http } from '@/utilities';
import queryString from 'query-string';
import { isNilOrEmpty } from 'ramda-adjunct';
import useSWR from 'swr';

//prettier-ignore
export const fetcher = (url: string) => http(url).then((res) => res.data).catch(({ response }) => response.data);
//prettier-ignore
export const fetcher2 = (url: string, params?: object) => http.post(url, params).then((res) => res.data).catch(({ response }) => response.data);

const onErrorRetry = (error: { status: number }, key: string, { retryCount }: any) => {
  if (error.status === 404) return; // Never retry on 404.
  if (key === '/api/user') return; // Never retry for a specific key.
  if (retryCount >= 3) return; // Only retry up to 5 times.
};

function makeKey(path: string, params?: any) {
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

function useKey2(params?: any) {
  const { query } = useRouter();
  let finalQuery = { ...params, ...query };
  if (query?.page) {
    finalQuery = { ...finalQuery, page: Number(query?.page) - 1 };
  }

  return finalQuery;
}
