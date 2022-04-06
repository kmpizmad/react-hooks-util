import * as React from 'react';
import _ from 'lodash';

export function usePrevState(state: PrevState): PrevState {
  const currentRef = React.useRef<PrevState>(state);
  const previousRef = React.useRef<PrevState>({});

  if (!_.isEqual(currentRef.current, state)) {
    previousRef.current = currentRef.current;
    currentRef.current = state;
  }

  return previousRef.current;
}

type PrevState = { [key: string | number]: any };
