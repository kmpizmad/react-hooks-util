import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { usePrevState } from '../../src';

const PrevStateComponent = () => {
  const [dependency, setDependency] = React.useState<number>(0);
  const prevState = usePrevState({ dependency });

  return (
    <div>
      <div data-testid="test-value">{prevState?.dependency || '-1'}</div>
      <button onClick={() => setDependency(dependency + 1)}>Click Me!</button>
    </div>
  );
};

describe('usePrevState', () => {
  it('should capture the previous state after re-render', async () => {
    const component = render(<PrevStateComponent />);

    const button = component.getByText('Click Me!');
    const node = component.getByTestId('test-value');

    expect(node).toBeInTheDocument();
    fireEvent.click(button);
    setTimeout(() => {
      expect(node.textContent).toBe('0');
    }, 100);
  });
});
