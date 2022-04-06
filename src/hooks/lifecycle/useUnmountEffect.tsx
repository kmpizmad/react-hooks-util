import * as React from 'react';

export function useUnmountEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList = []
) {
  React.useEffect(() => {
    return effect();
  }, deps);
}
