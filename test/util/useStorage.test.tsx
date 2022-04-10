import * as React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
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
  let component: RenderResult;
  let node: HTMLElement;
  let updateBtn: HTMLElement;
  let removeBtn: HTMLElement;

  beforeEach(() => {
    component = render(<LocalStorageComponent />);
    node = component.getByTestId('test-value');
    updateBtn = component.getByText('Update');
    removeBtn = component.getByText('Remove');
  });

  afterEach(() => {
    component.unmount();
  });

  it('should be in the DOM', () => {
    expect(node).toBeInTheDocument();
  });

  it('should store value', () => {
    expect(node.textContent).toBe('Hello World!');
    expect(window.localStorage.getItem('test')).toBeTruthy();
  });

  it('should update value', () => {
    fireEvent.click(updateBtn);
    expect(node.textContent).toBe('Hi');
    expect(window.localStorage.getItem('test')).toBeTruthy();
  });

  it('should remove value', () => {
    fireEvent.click(removeBtn);
    expect(node.textContent).toBe('');
    expect(window.localStorage.getItem('test')).toBeFalsy();
  });
});

describe('useSessionStorage', () => {
  let component: RenderResult;
  let node: HTMLElement;
  let updateBtn: HTMLElement;
  let removeBtn: HTMLElement;

  beforeEach(() => {
    component = render(<SessionStorageComponent />);
    node = component.getByTestId('test-value');
    updateBtn = component.getByText('Update');
    removeBtn = component.getByText('Remove');
  });

  afterEach(() => {
    component.unmount();
  });

  it('should be in the DOM', () => {
    expect(node).toBeInTheDocument();
  });

  it('should store value', () => {
    expect(node.textContent).toBe('Hello World!');
    expect(window.sessionStorage.getItem('test')).toBeTruthy();
  });

  it('should update value', () => {
    fireEvent.click(updateBtn);
    expect(node.textContent).toBe('Hi');
    expect(window.sessionStorage.getItem('test')).toBeTruthy();
  });

  it('should remove value', () => {
    fireEvent.click(removeBtn);
    expect(node.textContent).toBe('');
    expect(window.sessionStorage.getItem('test')).toBeFalsy();
  });
});
