import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useEventListener } from '../../src';

const EventListenerComponent = () => {
  const [value, setValue] = React.useState('Loading');

  useEventListener('load', () => {
    setTimeout(() => {
      setValue('Hello World!');
    }, 100);
  });

  return <div data-testid="test-value">{value}</div>;
};

describe('useEventListener', () => {
  it('should attach a global listener', () => {
    const component = render(<EventListenerComponent />);
    const node = component.getByTestId('test-value');

    expect(node).toBeInTheDocument();
    expect(node.textContent).toBe('Loading');
    setTimeout(() => {
      expect(node.textContent).toBe('Hello World!');
    }, 200);
  });
});
