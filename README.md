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

**Type**: `(effect: React.EffectCallback) => void`

Represents the `componentDidMount` method from React class components

### useUnmountEffect

**Type**: `(effect: React.EffectCallback, deps: React.DependencyList = []) => void`

Represents the `componentWillUnmount` method from React class components

### useUpdateEffect

**Type**: `(effect: React.EffectCallback, deps?: React.DependencyList) => void`

Renders whenever a dependency changes or if provided without a dependency list, renders on any change. Avoid providing an empty dependency list |

### usePrevState

**Type**: `(state: PrevState) => PrevState`

`getSnapshotBeforeUpdate`, `componentShouldUpdate` and `componentWillRecieveProps` combined in one. Captures the previous state based on the input object |

## DOM hooks

### useToggle

**Type**: `(initialValue?: boolean) => ToggleObject`

Toggles state between `true` and `false`

## Util hooks

### useLocalStorage

**Type**: `(key: string, defaultValue: Value) => StorageObject`

Toggles state between `true` and `false`

### useSessionStorage

**Type**: `(key: string, defaultValue: Value) => StorageObject`

Toggles state between `true` and `false` |

## Asynchronous hooks

### useAsync

**Type**: `<T = any>(promise: () => Promise<T>, deps: React.DependencyList = []) => AsyncObject<T>`

Handles async functions, re-evaluates whenever a dependency changes |

### useFetch

**Type**: `<T = any>(config: FetchConfig, deps: React.DependencyList = []) => AsyncObject<T>`

Handles API requests, uses the built-in `fetch` module |

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
