import type { H3Event } from 'h3'
import { defu } from 'defu'
import { isEmpty } from 'underscore';

import { SESSION_KEY, TOKEN_KEY } from '~/utils/constants';

interface Options {
  headers?: object,
  [options: string]: any
}

export const useFetchApi = (e: H3Event) => {
  const sessKey = getCookie(e, SESSION_KEY) as any;

  const makeFetch = (method: string) => {
    return (url: string, params?: any, options?: Options) => {
      const defaults = {
        baseURL: process.env.EDGE_URL,
        method,
        headers: {
          'Content-Type': 'application/json'
        }
      }
  
      if(!isEmpty(params)) {
        if(method === 'get') {
          Object.assign(defaults, {
            query: params
          })
        } else {
          Object.assign(defaults, {
            body: params
          })
        }
      }
  
      if(options?.headers) {
        Object.assign(defaults.headers, options?.headers)
      } else {
        const parseSessKey = JSON.parse(sessKey);

        Object.assign(defaults.headers, {
          Authorization: `Bearer ${parseSessKey.accessToken}`
        })
      }
  
      const opts = defu(options, defaults);
  
      return $fetch(url, opts)
    }
  }

  const useLogin = (url: string, params: object): Promise<any> => {
    const post = makeFetch('post')
    return post(url, params, {
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.EDGE_KEY + ':' + process.env.EDGE_SECRET).toString('base64')}`
      }
    });
  }

  return {
    useGet: makeFetch('get'),
    usePut: makeFetch('put'),
    usePost: makeFetch('post'),
    usePatch: makeFetch('patch'),
    useDelete: makeFetch('delete'),
    useLogin,
  }
};