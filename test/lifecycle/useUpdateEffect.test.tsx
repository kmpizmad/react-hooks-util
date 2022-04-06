import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
  it('should re-render on state update', async () => {
    const component = render(<DidUpdateComponent />);

    const button = component.getByText('Click Me!');
    const node = component.getByTestId('test-value');

    for (let i: number = 0; i < 3; i++) {
      expect(node).toBeInTheDocument();
      fireEvent.click(button);
      expect(node.textContent).toBe((i + 1).toString());
    }
  });
});
