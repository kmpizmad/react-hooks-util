import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
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
  let component: RenderResult;
  let node: HTMLElement;

  beforeEach(() => {
    component = render(<WillUnmountComponent />);
    node = component.getByTestId('test-value');
  });

  afterEach(() => {
    component.unmount();
  });

  it('should be in the DOM', () => {
    expect(node).toBeInTheDocument();
  });

  it('should render on unmount only', async () => {
    component.unmount();
    expect(node).not.toBeInTheDocument();
    expect(node.textContent).toBe('-1');
  });
});
