import * as React from 'react';
import { useUnmountEffect, useUpdateEffect } from '../lifecycle';

export function useEventListener(
  type: keyof WindowEventMap,
  callback: (event: Event) => void,
  element: HTMLElement | Document | (Window & typeof globalThis) = window
): void {
  const callbackRef = React.useRef(callback);
  const listenerRef = React.useRef<EventListenerOrEventListenerObject>(
    callback
  );

  useUpdateEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useUpdateEffect(() => {
    if (element == null) return;
    listenerRef.current = e => callbackRef.current(e);
    element.addEventListener(type, listenerRef.current);
  }, [type, element]);

  useUnmountEffect(() => {
    element.removeEventListener(type, listenerRef.current);
  }, [type, element]);
}
