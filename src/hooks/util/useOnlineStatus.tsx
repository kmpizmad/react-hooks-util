import * as React from 'react';
import { useEventListener } from '../dom/useEventListener';

export function useOnlineStatus() {
  const [online, setOnline] = React.useState(navigator.onLine);

  useEventListener('online', () => setOnline(navigator.onLine));
  useEventListener('offline', () => setOnline(navigator.onLine));

  return online;
}
