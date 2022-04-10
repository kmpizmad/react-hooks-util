import * as React from 'react';
import { useUpdateEffect } from '../lifecycle';
import { useTimeout } from './useTimeout';

export function useDebounce(
  callback: () => void,
  ms: number,
  deps: React.DependencyList = []
): void {
  const { reset } = useTimeout(callback, ms);
  useUpdateEffect(reset, [...deps, reset]);
}
