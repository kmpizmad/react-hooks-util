import * as React from 'react';

export function useAsync<T = any>(
  promise: () => Promise<T>,
  deps: React.DependencyList = []
): AsyncObject<T> {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<AsyncError | undefined>(undefined);
  const [data, setData] = React.useState<T | undefined>(undefined);

  const memo = React.useCallback(() => {
    setLoading(true);
    setError(undefined);
    setData(undefined);
    promise()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, deps);

  React.useEffect(() => {
    memo();
  }, [memo]);

  return { loading, error, data };
}

export type AsyncObject<T> = {
  loading: boolean;
  error: AsyncError | undefined;
  data: T | undefined;
};
export type AsyncError = {
  message: string;
  [key: string]: any;
  [key: number]: any;
};
