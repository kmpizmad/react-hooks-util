import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useUnmountEffect } from '../../src';

const WillUnmountComponent = () => {
  const [value, setValue] = React.useState<number>(0);

  useUnmountEffect(() => {
    setValue(-1);
  });

  return <div data-testid="test-value">{value}</div>;
};

describe('useUnmountEffect', () => {
  it('should render on unmount only', async () => {
    const component = render(<WillUnmountComponent />);
    const node = component.getByTestId('test-value');

    component.unmount();
    expect(node).not.toBeInTheDocument();
    expect(node.textContent).toBe('-1');
  });
});
