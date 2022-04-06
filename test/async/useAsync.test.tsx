import * as React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useAsync } from '../../src';

const AsyncComponent = (props: { success?: boolean }) => {
  const { loading, error, data } = useAsync<string>(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        props.success ? resolve('Hello World!') : reject({ message: 'Error' });
      }, 1000);
    });
  });

  return (
    <div>
      <div>{loading.toString()}</div>
      {error && <div>{JSON.stringify(error)}</div>}
      {data && <div>{data}</div>}
    </div>
  );
};

describe('useAsync', () => {
  it('should return OK response', async () => {
    const { getByText } = render(<AsyncComponent success />);
    const node = await waitFor(
      () => getByText('Hello World!', { exact: false }),
      { timeout: 5000 }
    );
    expect(node).toBeInTheDocument();
  });
  it('should return error', async () => {
    const { getByText } = render(<AsyncComponent />);
    const node = await waitFor(() => getByText('Error', { exact: false }), {
      timeout: 5000,
    });
    expect(node).toBeInTheDocument();
  });
  it("should change 'loading' prop", async () => {
    const { getByText } = render(<AsyncComponent />);
    const loading = getByText('true', { exact: false });
    const node = await waitFor(() => getByText('false', { exact: false }), {
      timeout: 5000,
    });
    expect(loading).toBeInTheDocument();
    expect(node).toBeInTheDocument();
  });
});
