import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
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
  it('should toggle on/off', () => {
    const component = render(<ToggleComponent initialValue={false} />);

    const button = component.getByText('Click Me!');
    const node = component.getByTestId('test-value');

    expect(node).toBeInTheDocument();
    expect(node.textContent).toBe('false');
    fireEvent.click(button);
    expect(node.textContent).toBe('true');
  });
});
