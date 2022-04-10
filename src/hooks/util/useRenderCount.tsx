import * as React from 'react';

export function useRenderCount(): number {
  const count = React.useRef<number>(1);
  React.useEffect(() => {
    count.current++;
  });
  return count.current;
}
