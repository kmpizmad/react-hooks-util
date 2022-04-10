import * as React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useMountEffect, useUpdateEffect } from '../../src';

const DidUpdateComponent = () => {
  const [value, setValue] = React.useState<number>(0);
  const [dependency, setDependency] = React.useState<number>(0);

  useMountEffect(() => {
    setDependency(0);
  });

  useUpdateEffect(() => {
    setValue(dependency);
  }, [dependency]);

  return (
    <div>
      <div data-testid="test-value">{value}</div>
      <button onClick={() => setDependency(dependency + 1)}>Click Me!</button>
    </div>
  );
};

describe('useUpdateEffect', () => {
  let component: RenderResult;
  let node: HTMLElement;
  let button: HTMLElement;

  beforeEach(() => {
    component = render(<DidUpdateComponent />);
    node = component.getByTestId('test-value');
    button = component.getByText('Click Me!');
  });

  afterEach(() => {
    component.unmount();
  });

  it('should be in the DOM', () => {
    expect(node).toBeInTheDocument();
  });

  it('should re-render on state update', async () => {
    for (let i: number = 0; i < 3; i++) {
      fireEvent.click(button);
      expect(node.textContent).toBe((i + 1).toString());
    }
  });
});
