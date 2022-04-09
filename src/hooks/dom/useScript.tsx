import { AsyncObject, useAsync } from '../async';

export function useScript(url: string): AsyncObjectWithoutData {
  const { loading, error } = useAsync(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;

    return new Promise((resolve, reject) => {
      script.addEventListener('load', resolve);
      script.addEventListener('error', reject);
      document.body.appendChild(script);
    });
  }, [url]);

  return { loading, error };
}

export type AsyncObjectWithoutData = Omit<AsyncObject<never>, 'data'>;
