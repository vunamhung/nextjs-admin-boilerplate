import Router from 'next/router';
import axios, { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';
import toast from 'react-hot-toast';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
const http2 = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

http.interceptors.request.use(
  async (config) => {
    config.headers['Authorization'] = `Bearer ${getCookie('token')}`;

    return config;
  },
  (error) => Promise.reject(error),
);

http2.interceptors.request.use(
  async (config) => config,
  (error) => Promise.reject(error),
);

http2.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => Promise.reject(error),
);

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status !== 401) {
      toast.error(error?.response?.data?.message || error.message);
    }
    if (error.response?.status === 401) {
      toast.error(error?.response?.data?.message || error.message);
      return Router.push('/login');
    }
    return Promise.reject(error);
  },
);

export { http, http2 };
