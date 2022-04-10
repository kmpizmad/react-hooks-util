import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useScript } from '../../src';

const ScriptComponent = () => {
  const { loading, error } = useScript(
    'https://code.jquery.com/jquery-3.6.0.min.js'
  );

  if (loading) return <div data-testid="test-value">Loading</div>;
  if (error) return <div data-testid="test-value">Error</div>;
  return (
    <div data-testid="test-value">
      {Object.keys(window)
        .includes('$')
        .toString()}
    </div>
  );
};

describe('useScript', () => {
  it('should add a new script tag to the DOM', () => {
    const component = render(<ScriptComponent />);
    const node = component.getByTestId('test-value');

    expect(node).toBeInTheDocument();
    expect(node.textContent).toMatch(/(Loading|Error|true)/i);
  });
});
