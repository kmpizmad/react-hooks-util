- [Introduction](#introduction)
- [Changelog](#changelog)
- [Lifecycle hooks](#lifecycle-hooks)
  - [useMountEffect](#usemounteffect)
  - [useUnmountEffect](#useunmounteffect)
  - [useUpdateEffect](#useupdateeffect)
  - [usePrevState](#useprevstate)
- [DOM hooks](#dom-hooks)
  - [useToggle](#usetoggle)
  - [useEventListener](#useeventlistener)
  - [useScript](#usescript)
- [Util hooks](#util-hooks)
  - [useTimeout](#usetimeout)
  - [useDebounce](#usedebounce)
  - [useTextShortener](#usetextshortener)
  - [useRenderCount](#userendercount)
  - [useDebugInfo](#usedebuginfo)
  - [useLocalStorage](#uselocalstorage)
  - [useSessionStorage](#usesessionstorage)
- [Asynchronous hooks](#asynchronous-hooks)
  - [useAsync](#useasync)
  - [useFetch](#usefetch)
- [Types](#types)
  - [AsyncObject<T>](#asyncobjectt)
  - [AsyncError](#asyncerror)
  - [DebugInfo](#debuginfo)
  - [FetchConfig](#fetchconfig)
  - [State](#state)
  - [StorageObject](#storageobject)
  - [TimeoutObject](#timeoutobject)
  - [ToggleObject](#toggleobject)
  - [Value](#value)

## Introduction

> Utility library for common React hooks

The idea was to create a library that contains common functionalities abstracted into hooks rather than implementing them everytime in every project.

[//]: # '## How can I contribute?'
[//]: # '## How can I support the project?'

## Changelog

> Checkout [changelog][changelog_url] first

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

### useEventListener

_type_: `(type: keyof WindowEventMap, callback: (event: Event) => void, element: HTMLElement | Document | (Window & typeof globalThis) = window) => void`

Attaches a global event listener to the `element` (`window` object by default).

```typescript
const EventListenerComponent = () => {
  const [value, setValue] = React.useState('Loading');

  useEventListener('load', () => {
    setTimeout(() => {
      setValue('Hello World!');
    }, 100);
  });

  return <div data-testid="test-value">{value}</div>;
};
```

### useScript

_type_: `(url: string) => AsyncObjectWithoutData`

Loads in a script and adds a new `script` node to the DOM.

```typescript
const ScriptComponent = () => {
  const { loading, error } = useScript(
    'https://code.jquery.com/jquery-3.6.0.min.js'
  );

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      {Object.keys(window)
        .includes('$')
        .toString()}
    </div>
  );
};
```

## Util hooks

### useTimeout

_type_: `(callback: () => void, ms: number) => TimeoutObject`

Basically `setTimeout` as a hook.

```typescript
const TimeoutComponent = () => {
  const [count, setCount] = React.useState(10);
  const { clear, reset } = useTimeout(() => setCount(0), 1000);

  return (
    <div>
      <div>{count}</div>
      <button onClick={clear}>Clear</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};
```

### useDebounce

_type_: `(callback: () => void, ms: number, deps: React.DependencyList = []) => void`

```typescript
const DebounceComponent = () => {
  const [count, setCount] = React.useState(0);
  const [dependency, setDependency] = React.useState(10);
  useDebounce(() => setCount(dependency), 200, [dependency]);

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setDependency(dependency + 1)}>Click Me!</button>
    </div>
  );
};
```

### useTextShortener

_type_: `(text: string, options: TextShortenerOptions) => string`

Shortens a text to a specified `limit`. Customizable through `options`.

```typescript
const TextShortenerComponent = (props: Omit<TextShortenerOptions, 'limit'>) => {
  const [limit, setLimit] = React.useState(11);
  const short = useTextShortener('Lorem ipsum dolor sit amet', {
    limit,
    ...props,
  });

  return (
    <div>
      <div>{short}</div>
      <button onClick={() => setLimit(6)}>Click Me!</button>
    </div>
  );
};
```

### useRenderCount

_type_: `() => number`

### useDebugInfo

_type_: `<Props extends Record<string, any>>(Component: React.ComponentType<Props>, props: Record<string, any>) => DebugInfo`

```typescript
const DebugComponent: React.FC<{ count: number }> = props => {
  const [count, setCount] = React.useState(props.count);
  const debug = useDebugInfo(DebugComponent, { count });

  return (
    <div>
      <div>{JSON.stringify(debug)}</div>
      <button onClick={() => setCount(count + 1)}>Click Me!</button>
    </div>
  );
};
```

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

### DebugInfo

```typescript
{
  renderCount: number;
  changedProps: Record<string, any>;
  timeSinceLastRender: number;
  lastRenderTimestamp: number;
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

### TimeoutObject

```typescript
{
  reset: () => void;
  clear: () => void;
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

[changelog_url]: https://github.com/kmpizmad/react-hooks-util/blob/master/docs/CHANGELOG.md
