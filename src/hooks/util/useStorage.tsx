import * as React from 'react';

export function useLocalStorage(key: string, defaultValue: Value) {
  return useStorage(key, defaultValue, window.localStorage);
}

export function useSessionStorage(key: string, defaultValue: Value) {
  return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage(
  key: string,
  defaultValue: Value,
  storage: Storage
): StorageObject {
  const [value, setValue] = React.useState<Value>(() => {
    const jsonValue = storage.getItem(key);
    return jsonValue !== null ? JSON.parse(jsonValue) : defaultValue;
  });

  React.useEffect(() => {
    if (value === undefined) return storage.removeItem(key);
    storage.setItem(key, JSON.stringify(value));
  }, [key, value, storage]);

  const remove = React.useCallback(() => {
    setValue(undefined);
  }, []);

  return { value, update: setValue, remove };
}

export type StorageObject = {
  value: Value;
  update: React.Dispatch<React.SetStateAction<Value>>;
  remove: () => void;
};
type Value = string | number | boolean | Record<string, any> | null | undefined;
