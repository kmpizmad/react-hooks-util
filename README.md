# react-hooks-util

- [react-hooks-util](#react-hooks-util)
  - [Introduction](#introduction)
  - [Lifecycle hooks](#lifecycle-hooks)
    - [useMountEffect](#usemounteffect)
    - [useUnmountEffect](#useunmounteffect)
    - [useUpdateEffect](#useupdateeffect)
    - [usePrevState](#useprevstate)
  - [DOM hooks](#dom-hooks)
    - [useToggle](#usetoggle)
  - [Util hooks](#util-hooks)
    - [useLocalStorage](#uselocalstorage)
    - [useSessionStorage](#usesessionstorage)
  - [Asynchronous hooks](#asynchronous-hooks)
    - [useAsync](#useasync)
    - [useFetch](#usefetch)
  - [Types](#types)
    - [AsyncObject<T>](#asyncobjectt)
    - [AsyncError](#asyncerror)
    - [FetchConfig](#fetchconfig)
    - [State](#state)
    - [StorageObject](#storageobject)
    - [ToggleObject](#toggleobject)
    - [Value](#value)

## Introduction

> Utility library for common React hooks

The idea was to create a library that contains common functionalities abstracted into hooks rather than implementing them everytime in every project.

[//]: # '## How can I contribute?'
[//]: # '## How can I support the project?'

## Lifecycle hooks

### useMountEffect

_type_: `(effect: React.EffectCallback) => void`

Represents the `componentDidMount` method from React class components

```typescript
const DidMountComponent = () => {
  const [value, setValue] = React.useState<number>(0);
  const [dependency, setDependency] = React.useState<number>(0);

  useMountEffect(() => {
    setValue(dependency + 1);
  });

  return (
    <div>
      <div data-testid="test-value">{value}</div>
      <button onClick={() => setDependency(dependency + 1)}>Click Me!</button>
    </div>
  );
};
```

### useUnmountEffect

_type_: `(effect: React.EffectCallback, deps: React.DependencyList = []) => void`

Represents the `componentWillUnmount` method from React class components

```typescript
const WillUnmountComponent = () => {
  const [value, setValue] = React.useState<number>(0);

  useUnmountEffect(() => {
    setValue(-1);
  });

  return <div>{value}</div>;
};
```

### useUpdateEffect

_type_: `(effect: React.EffectCallback, deps?: React.DependencyList) => void`

Renders whenever a dependency changes or if provided without a dependency list, renders on any change. Avoid providing an empty dependency list

```typescript
const DidUpdateComponent = () => {
  const [value, setValue] = React.useState<number>(0);
  const [dependency, setDependency] = React.useState<number>(0);

  useUpdateEffect(() => {
    setValue(dependency);
  }, [dependency]);

  return (
    <div>
      <div>{value}</div>
      <button onClick={() => setDependency(dependency + 1)}>Click Me!</button>
    </div>
  );
};
```

### usePrevState

_type_: `(state: PrevState) => PrevState`

`getSnapshotBeforeUpdate`, `componentShouldUpdate` and `componentWillRecieveProps` combined in one. Captures the previous state based on the input object

```typescript
const PrevStateComponent = () => {
  const [dependency, setDependency] = React.useState<number>(0);
  const prevState = usePrevState({ dependency });

  return (
    <div>
      <div>{prevState?.dependency || '-1'}</div>
      <button onClick={() => setDependency(dependency + 1)}>Click Me!</button>
    </div>
  );
};
```

## DOM hooks

### useToggle

_type_: `(initialValue?: boolean) => ToggleObject`

Toggles state between `true` and `false`

```typescript
const ToggleComponent = (props: { initialValue?: boolean }) => {
  const { value, toggle } = useToggle(props.initialValue);
  return (
    <div>
      <div>{value.toString()}</div>
      <button onClick={() => toggle()}>Click Me!</button>
    </div>
  );
};
```

## Util hooks

### useLocalStorage

_type_: `(key: string, defaultValue: Value) => StorageObject`

Handles and stores data in `window.localStorage`

```typescript
const LocalStorageComponent = () => {
  const { value, update, remove } = useLocalStorage('test', 'Hello World!');
  return (
    <div>
      <div>{value}</div>
      <button onClick={() => update('Hi')}>Update</button>
      <button onClick={() => remove()}>Remove</button>
    </div>
  );
};
```

### useSessionStorage

_type_: `(key: string, defaultValue: Value) => StorageObject`

Handles and stores data in `window.sessionStorage`

```typescript
const SessionStorageComponent = () => {
  const { value, update, remove } = useSessionStorage('test', 'Hello World!');
  return (
    <div>
      <div>{value}</div>
      <button onClick={() => update('Hi')}>Update</button>
      <button onClick={() => remove()}>Remove</button>
    </div>
  );
};
```

## Asynchronous hooks

### useAsync

_type_: `<T = any>(promise: () => Promise<T>, deps: React.DependencyList = []) => AsyncObject<T>`

Handles async functions, re-evaluates whenever a dependency changes

```typescript
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
```

### useFetch

_type_: `<T = any>(config: FetchConfig, deps: React.DependencyList = []) => AsyncObject<T>`

Handles API requests, uses the built-in `fetch` module

## Types

### AsyncObject<T>

```typescript
{
  loading: boolean;
  error: AsyncError | undefined;
  data: T | undefined;
}
```

### AsyncError

```typescript
{
  message: string;
  [key: number | string]: any;
}
```

### FetchConfig

```typescript
{
  url: string;
  options?: RequestInit
};
```

### State

```typescript
{
  [key: number | string]: any
};
```

### StorageObject

```typescript
{
  value: Value;
  update: (value: Value) => void;
  remove: () => void;
}
```

### ToggleObject

```typescript
{
  value: boolean;
  toggle: () => void
}
```

### Value

```typescript
string | number | boolean | Record<string, any> | null | undefined
```
