import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useLocalStorage, useSessionStorage } from '../../src';

const LocalStorageComponent = () => {
  const { value, update, remove } = useLocalStorage('test', 'Hello World!');
  return (
    <div>
      <div data-testid="test-value">{value}</div>
      <button onClick={() => update('Hi')}>Update</button>
      <button onClick={() => remove()}>Remove</button>
    </div>
  );
};

const SessionStorageComponent = () => {
  const { value, update, remove } = useSessionStorage('test', 'Hello World!');
  return (
    <div>
      <div data-testid="test-value">{value}</div>
      <button onClick={() => update('Hi')}>Update</button>
      <button onClick={() => remove()}>Remove</button>
    </div>
  );
};

describe('useLocalStorage', () => {
  it('should store value', () => {
    const component = render(<LocalStorageComponent />);
    const node = component.getByTestId('test-value');

    expect(node).toBeInTheDocument();
    expect(node.textContent).toBe('Hello World!');
    expect(window.localStorage.getItem('test')).toBeTruthy();
  });
  it('should update value', () => {
    const component = render(<LocalStorageComponent />);

    const button = component.getByText('Update');
    const node = component.getByTestId('test-value');

    expect(node).toBeInTheDocument();
    fireEvent.click(button);
    expect(node.textContent).toBe('Hi');
    expect(window.localStorage.getItem('test')).toBeTruthy();
  });
  it('should remove value', () => {
    const component = render(<LocalStorageComponent />);

    const button = component.getByText('Remove');
    const node = component.getByTestId('test-value');

    expect(node).toBeInTheDocument();
    fireEvent.click(button);
    expect(node.textContent).toBe('');
    expect(window.localStorage.getItem('test')).toBeFalsy();
  });
});

describe('useSessionStorage', () => {
  it('should store value', () => {
    const component = render(<SessionStorageComponent />);
    const node = component.getByTestId('test-value');

    expect(node).toBeInTheDocument();
    expect(node.textContent).toBe('Hello World!');
    expect(window.sessionStorage.getItem('test')).toBeTruthy();
  });
  it('should update value', () => {
    const component = render(<SessionStorageComponent />);

    const button = component.getByText('Update');
    const node = component.getByTestId('test-value');

    expect(node).toBeInTheDocument();
    fireEvent.click(button);
    expect(node.textContent).toBe('Hi');
    expect(window.sessionStorage.getItem('test')).toBeTruthy();
  });
  it('should remove value', () => {
    const component = render(<SessionStorageComponent />);

    const button = component.getByText('Remove');
    const node = component.getByTestId('test-value');

    expect(node).toBeInTheDocument();
    fireEvent.click(button);
    expect(node.textContent).toBe('');
    expect(window.sessionStorage.getItem('test')).toBeFalsy();
  });
});
