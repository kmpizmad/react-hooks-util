import * as React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
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
  let component: RenderResult;
  let node: HTMLElement;
  let button: HTMLElement;

  beforeEach(() => {
    component = render(<PrevStateComponent />);
    node = component.getByTestId('test-value');
    button = component.getByText('Click Me!');
  });

  afterEach(() => {
    component.unmount();
  });

  it('should be in the DOM', () => {
    expect(node).toBeInTheDocument();
  });

  it('should capture the previous state after re-render', async () => {
    fireEvent.click(button);
    setTimeout(() => {
      expect(node.textContent).toBe('0');
    }, 100);
  });
});
