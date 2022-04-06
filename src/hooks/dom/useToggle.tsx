import * as React from 'react';

export function useToggle(initialValue?: boolean): ToggleObject {
  const [value, setValue] = React.useState(initialValue || false);
  return { value, toggle: () => setValue(!value) };
}

export type ToggleObject = { value: boolean; toggle: () => void };
