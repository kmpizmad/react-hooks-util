# react-hooks-util

- [react-hooks-util](#react-hooks-util)
  - [About the project](#about-the-project)
  - [Implemented hooks](#implemented-hooks)
    - [Lifecycle hooks](#lifecycle-hooks)
    - [DOM hooks](#dom-hooks)
    - [Util hooks](#util-hooks)
    - [Asynchronous hooks](#asynchronous-hooks)

## About the project

## Implemented hooks

### Lifecycle hooks

| Hook             | Type                                                                      | Description                                                                                                                                               |
| ---------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| useMountEffect   | `(effect: React.EffectCallback) => void`                                  | Represents the `componentDidMount` method from React class components                                                                                     |
| useUnmountEffect | `(effect: React.EffectCallback, deps: React.DependencyList = []) => void` | Represents the `componentWillUnmount` method from React class components                                                                                  |
| useUpdateEffect  | `(effect: React.EffectCallback, deps?: React.DependencyList) => void`     | Renders whenever a dependency changes or if provided without a dependency list, renders on any change. Avoid providing an empty dependency list           |
| usePrevState     | `(state: PrevState) => PrevState`                                         | `getSnapshotBeforeUpdate`, `componentShouldUpdate` and `componentWillRecieveProps` combined in one. Captures the previous state based on the input object |

**`State`**: `{ [key: number | string]: any }`

### DOM hooks

| Hook      | Type                                       | Description                              |
| --------- | ------------------------------------------ | ---------------------------------------- |
| useToggle | `(initialValue?: boolean) => ToggleObject` | Toggles state between `true` and `false` |

**`ToggleObject`**: `{ value: boolean; toggle: () => void }`

### Util hooks

| Hook              | Type                                                  | Description                              |
| ----------------- | ----------------------------------------------------- | ---------------------------------------- |
| useLocalStorage   | `(key: string, defaultValue: Value) => StorageObject` | Toggles state between `true` and `false` |
| useSessionStorage | `(key: string, defaultValue: Value) => StorageObject` | Toggles state between `true` and `false` |

**`StorageObject`**: `{ value: Value; update: (value: Value) => void; remove: () => void; }`
**`Value`**: `string | number | boolean | Record<string, any> | null | undefined`

### Asynchronous hooks

| Hook     | Type                                                                                      | Description                                                         |
| -------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| useAsync | `<T = any>(promise: () => Promise<T>, deps: React.DependencyList = []) => AsyncObject<T>` | Handles async functions, re-evaluates whenever a dependency changes |
| useFetch | `<T = any>(config: FetchConfig, deps: React.DependencyList = []) => AsyncObject<T>`       | Handles API requests, uses the built-in `fetch` module              |

**`AsyncObject<T>`**: `{ loading: boolean; error: AsyncError | undefined; data: T | undefined; }`
**`AsyncError`**: `{ message: string; [key: number | string]: any; }`
**`FetchConfig`**: `{ url: string; options?: RequestInit }`
