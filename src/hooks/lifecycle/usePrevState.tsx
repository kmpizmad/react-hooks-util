import * as React from 'react';
import isEqual from 'lodash.isequal';

export function usePrevState(state: PrevState): PrevState {
  const currentRef = React.useRef<PrevState>(state);
  const previousRef = React.useRef<PrevState>({});

  if (!isEqual(currentRef.current, state)) {
    previousRef.current = currentRef.current;
    currentRef.current = state;
  }

  return previousRef.current;
}

type PrevState = { [key: string]: any; [key: number]: any };
