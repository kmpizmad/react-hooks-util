import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TextShortenerOptions, useTextShortener } from '../../src';

const TextShortenerComponent = (props: Omit<TextShortenerOptions, 'limit'>) => {
  const [limit, setLimit] = React.useState(11);
  const short = useTextShortener('Lorem ipsum dolor sit amet', {
    limit,
    ...props,
  });

  return (
    <div>
      <div data-testid="test-value">{short}</div>
      <button onClick={() => setLimit(6)}>Click Me!</button>
    </div>
  );
};

describe('useTextShortener', () => {
  it('should be in the DOM', () => {
    const component = render(<TextShortenerComponent />);
    const node = component.getByTestId('test-value');
    expect(node).toBeInTheDocument();
  });

  describe('should shorten text input with', () => {
    it('default options', () => {
      const component = render(<TextShortenerComponent />);
      const node = component.getByTestId('test-value');
      const button = component.getByText('Click Me!');
      expect(node.textContent).toBe('Lorem ipsum...');
      fireEvent.click(button);
      expect(node.textContent).toBe('Lorem...');
    });

    it("'allowDots' option", () => {
      const component = render(<TextShortenerComponent allowDots={false} />);
      const node = component.getByTestId('test-value');
      const button = component.getByText('Click Me!');
      expect(node.textContent).toBe('Lorem ipsum');
      fireEvent.click(button);
      expect(node.textContent).toBe('Lorem');
    });

    it("'replaceDotsWith' option", () => {
      const component = render(<TextShortenerComponent replaceDotsWith="!" />);
      const node = component.getByTestId('test-value');
      const button = component.getByText('Click Me!');
      expect(node.textContent).toBe('Lorem ipsum!');
      fireEvent.click(button);
      expect(node.textContent).toBe('Lorem!');
    });

    it("'numberOfDots' option", () => {
      const component = render(<TextShortenerComponent numberOfDots={5} />);
      const node = component.getByTestId('test-value');
      const button = component.getByText('Click Me!');
      expect(node.textContent).toBe('Lorem ipsum.....');
      fireEvent.click(button);
      expect(node.textContent).toBe('Lorem.....');
    });

    it("'allowDots' off and 'numberOfDots' option", () => {
      const component = render(
        <TextShortenerComponent allowDots={false} numberOfDots={5} />
      );
      const node = component.getByTestId('test-value');
      const button = component.getByText('Click Me!');
      expect(node.textContent).toBe('Lorem ipsum');
      fireEvent.click(button);
      expect(node.textContent).toBe('Lorem');
    });
  });
});
