import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
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
  let component: RenderResult;
  let node: HTMLElement;

  beforeEach(() => {
    component = render(<EventListenerComponent />);
    node = component.getByTestId('test-value');
  });

  afterEach(() => {
    component.unmount();
  });

  it('should be in the DOM', () => {
    expect(node).toBeInTheDocument();
  });

  it('should attach a global listener', () => {
    expect(node.textContent).toBe('Loading');
    setTimeout(() => {
      expect(node.textContent).toBe('Hello World!');
    }, 200);
  });
});
