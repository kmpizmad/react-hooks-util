import * as React from 'react';
import { AsyncObject, useAsync } from './useAsync';

const DEFAULT_OPTIONS: RequestInit = {
  headers: { 'Content-Type': 'application/json' },
};

export function useFetch<T = any>(
  config: FetchConfig,
  deps: React.DependencyList = []
): AsyncObject<T> {
  const { url, options } = config;
  return useAsync<T>(() => {
    return fetch(url, { ...DEFAULT_OPTIONS, ...(options || {}) }).then(res => {
      if (res.ok) return res.json();
      return res.json().then(json => Promise.reject(json));
    });
  }, deps);
}

export type FetchConfig = { url: string; options?: RequestInit };
