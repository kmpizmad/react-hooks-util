import * as React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useTimeout } from '../../src';

const TimeoutComponent = () => {
  const [count, setCount] = React.useState(10);
  const { clear, reset } = useTimeout(() => setCount(0), 200);

  return (
    <div>
      <div data-testid="test-value">{count}</div>
      <button onClick={clear}>Clear</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

describe('useTimeout', () => {
  let component: RenderResult;
  let node: HTMLElement;
  let resetBtn: HTMLElement;
  let clearBtn: HTMLElement;

  beforeEach(() => {
    component = render(<TimeoutComponent />);
    node = component.getByTestId('test-value');
    resetBtn = component.getByText('Reset');
    clearBtn = component.getByText('Clear');
  });

  afterEach(() => {
    component.unmount();
  });

  it('should be in the DOM', () => {
    expect(node).toBeInTheDocument();
  });

  it('should delay callback', () => {
    expect(node.textContent).toBe('10');
    setTimeout(() => {
      expect(node.textContent).toBe('0');
    }, 300);
  });

  it('should reset timeout', () => {
    setTimeout(() => {
      expect(node.textContent).toBe('0');
    }, 300);

    fireEvent.click(resetBtn);

    expect(node.textContent).toBe('10');
    setTimeout(() => {
      expect(node.textContent).toBe('0');
    }, 300);
  });

  it('should clear timeout', () => {
    fireEvent.click(clearBtn);
    setTimeout(() => {
      expect(node.textContent).toBe('10');
    }, 300);
  });
});
