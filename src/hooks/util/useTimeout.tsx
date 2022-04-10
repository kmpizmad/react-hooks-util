import * as React from 'react';
import {
  useMountEffect,
  useUnmountEffect,
  useUpdateEffect,
} from '../lifecycle';

export function useTimeout(callback: () => void, ms: number): TimeoutObject {
  const callbackRef = React.useRef<() => void>(callback);
  const timeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined);

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = React.useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), ms);
  }, [ms]);

  const clear = React.useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  const reset = React.useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  useMountEffect(() => {
    set();
  });

  useUpdateEffect(() => {
    set();
  }, [ms, set]);

  useUnmountEffect(() => {
    clear();
  }, [ms, clear]);

  return { reset, clear };
}

export type TimeoutObject = {
  reset: () => void;
  clear: () => void;
};
