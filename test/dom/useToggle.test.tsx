import * as React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useToggle } from '../../src';

const ToggleComponent = (props: { initialValue?: boolean }) => {
  const { value, toggle } = useToggle(props.initialValue);
  return (
    <div>
      <div data-testid="test-value">{value.toString()}</div>
      <button onClick={() => toggle()}>Click Me!</button>
    </div>
  );
};

describe('useToggle', () => {
  let component: RenderResult;
  let node: HTMLElement;
  let button: HTMLElement;

  beforeEach(() => {
    component = render(<ToggleComponent />);
    node = component.getByTestId('test-value');
    button = component.getByText('Click Me!');
  });

  afterEach(() => {
    component.unmount();
  });

  it('should be in the DOM', () => {
    expect(node).toBeInTheDocument();
  });

  it('should toggle on/off', () => {
    expect(node.textContent).toBe('false');

    fireEvent.click(button);

    expect(node.textContent).toBe('true');
  });
});
