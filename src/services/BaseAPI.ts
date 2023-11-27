import axios from 'axios';
import { get } from 'lodash';

import { CookiesStorage } from '@/config/cookie';

const BE_HOSTNAME = process.env.NEXT_PUBLIC_BACKEND_HOSTNAME;
const BE_PORT = process.env.NEXT_PUBLIC_BACKEND_PORT;

const baseURL = `http://${BE_HOSTNAME}:${BE_PORT}/api/v1/`;

const instance = axios.create({
  timeout: 10 * 1000,
  maxContentLength: 10 * 1000,
});

const defaultOptions = {
  baseURL: baseURL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: '',
  },
};

const _get = (url: string, params = {}, options: any = {}) => {
  return instance.get(baseURL + url, {
    ...defaultOptions,
    ...options,
    ...{ params },
  });
};

const post = (url: string, body = {}, options: any = {}) =>
  instance.post(baseURL + url, body, { ...defaultOptions, ...options });

const put = (url: string, body = {}, options: any = {}) =>
  instance.put(baseURL + url, body, { ...defaultOptions, ...options });
const patch = (url: string, body = {}, options: any = {}) =>
  instance.patch(baseURL + url, body, { ...defaultOptions, ...options });
const _delete = (url: string, options: any = {}) =>
  instance.delete(baseURL + url, { ...defaultOptions, ...options });

const interceptorHandleRequest = (config: any) => {
  const accessToken = CookiesStorage.getCookieData('accessToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

const interceptorHandleResponse = (response: any) => response;
const handleError = (error: any) => {
  const errorJson = JSON.parse(JSON.stringify(error));
  // if (errorJson?.status === 401) {
  //   toast.error(errorJson?.error, { description: errorJson?.message });
  // }
  return Promise.reject(get(error, 'response.data') || errorJson);
};

instance.interceptors.request.use(interceptorHandleRequest, handleError);
instance.interceptors.response.use(interceptorHandleResponse, handleError);

export { _get as get, post, put, patch, _delete as destroy };
