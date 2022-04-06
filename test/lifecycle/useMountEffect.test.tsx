import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useMountEffect } from '../../src';

const DidMountComponent = () => {
  const [value, setValue] = React.useState<number>(0);
  const [dependency, setDependency] = React.useState<number>(0);

  useMountEffect(() => {
    setValue(dependency + 1);
  });

  return (
    <div>
      <div data-testid="test-value">{value}</div>
      <button onClick={() => setDependency(dependency + 1)}>Click Me!</button>
    </div>
  );
};

describe('useMountEffect', () => {
  it('should render on mount only', async () => {
    const component = render(<DidMountComponent />);

    const button = component.getByText('Click Me!');
    const node = component.getByTestId('test-value');

    for (let i: number = 0; i < 3; i++) {
      expect(node).toBeInTheDocument();
      fireEvent.click(button);
      expect(node.textContent).toBe('1');
    }
  });
});
