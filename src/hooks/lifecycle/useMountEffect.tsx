import * as React from 'react';

export function useMountEffect(effect: React.EffectCallback): void {
  React.useEffect(() => {
    effect();
  }, []);
}
