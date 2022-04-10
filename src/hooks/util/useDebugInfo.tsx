import * as React from 'react';
import { useRenderCount } from './useRenderCount';

export function useDebugInfo<Props extends Record<string, any>>(
  Component: React.ComponentType<Props>,
  props: Record<string, any>
): DebugInfo {
  const count = useRenderCount();
  const changedProps = React.useRef<Record<string, any>>({});
  const previousProps = React.useRef<Record<string, any>>(props);
  const lastRenderTimestamp = React.useRef<number>(Date.now());

  const propKeys = Object.keys({ ...props, ...previousProps });
  changedProps.current = propKeys.reduce((obj, key) => {
    if (props[key] === previousProps.current[key]) return obj;
    return {
      ...obj,
      [key]: { previous: previousProps.current[key], current: props[key] },
    };
  }, {});

  const info = {
    renderCount: count,
    changedProps: changedProps.current,
    timeSinceLastRender: (Date.now() - lastRenderTimestamp.current) / 1000,
    lastRenderTimestamp: lastRenderTimestamp.current,
  };

  React.useEffect(() => {
    previousProps.current = props;
    lastRenderTimestamp.current = Date.now();
    console.log('[debug-info]', (Component as Function).name, info);
  });

  return info;
}

export type DebugInfo = {
  renderCount: number;
  changedProps: Record<string, any>;
  timeSinceLastRender: number;
  lastRenderTimestamp: number;
};
