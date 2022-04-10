import * as React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useDebounce } from '../../src';

const DebounceComponent = () => {
  const [count, setCount] = React.useState(0);
  const [dependency, setDependency] = React.useState(10);
  useDebounce(() => setCount(dependency), 200, [dependency]);

  return (
    <div>
      <div data-testid="test-value">{count}</div>
      <button onClick={() => setDependency(dependency + 1)}>Click Me!</button>
    </div>
  );
};

describe('useDebounce', () => {
  let component: RenderResult;
  let node: HTMLElement;
  let button: HTMLElement;

  beforeEach(() => {
    component = render(<DebounceComponent />);
    node = component.getByTestId('test-value');
    button = component.getByText('Click Me!');
  });

  afterEach(() => {
    component.unmount();
  });

  it('should be in the DOM', () => {
    expect(node).toBeInTheDocument();
  });

  it('should delay callback', () => {
    expect(node.textContent).toBe('0');
    setTimeout(() => {
      expect(node.textContent).toBe('10');
    }, 300);
  });

  it('should reset timeout on action', () => {
    for (let i: number = 0; i < 10; i++) {
      setTimeout(() => {
        fireEvent.click(button);
      }, 20);
    }

    setTimeout(() => {
      expect(node.textContent).toBe('20');
    }, 300);
  });
});
