import * as React from 'react';

export function useTextShortener(
  text: string,
  options: TextShortenerOptions
): string {
  const [short, setShort] = React.useState<string>('');

  React.useEffect(() => {
    const str: string = text.substring(0, options.limit);
    const trimmed: string = str.trim();
    const replaced: string = trimmed.replaceAll(/[^a-zA-Z0-9\\s]+$/g, '');
    const shortened: string = createText(replaced, options);
    setShort(shortened);
  }, [text, options.limit]);

  return short;
}

function createText(text: string, options: TextShortenerOptions): string {
  const allowDots: boolean =
    options.allowDots === undefined || options.allowDots;
  const hasDots: boolean =
    allowDots && (!!options.replaceDotsWith || !!options.numberOfDots || true);
  const fill: string = new Array<string>(options.numberOfDots || 3)
    .fill('.')
    .join('');
  const dots: string = options.replaceDotsWith || fill;
  return hasDots ? text + dots : text;
}

export type TextShortenerOptions = {
  limit: number;
  allowDots?: boolean;
  replaceDotsWith?: string;
  numberOfDots?: number;
};
