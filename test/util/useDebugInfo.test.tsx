import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useDebugInfo } from '../../src';

const DebugComponent: React.FC<{ count: number }> = props => {
  const [count, setCount] = React.useState(props.count);
  const debug = useDebugInfo(DebugComponent, { count });

  return (
    <div>
      <div data-testid="test-value">{JSON.stringify(debug)}</div>
      <button onClick={() => setCount(count + 1)}>Click Me!</button>
    </div>
  );
};

describe('useDebugInfo', () => {
  it('should log debug info', () => {
    const component = render(<DebugComponent count={0} />);
    const node = component.getByTestId('test-value');
    const button = component.getByText('Click Me!');

    expect(node).toBeInTheDocument();
    expect(node.textContent).toMatch('"renderCount":1');
    expect(node.textContent).toMatch('"changedProps":{}');

    fireEvent.click(button);

    expect(node).toBeInTheDocument();
    expect(node.textContent).toMatch('"renderCount":2');
    expect(node.textContent).toMatch(
      '"changedProps":{"count":{"previous":0,"current":1}}'
    );
  });
});
