---
title: assert / invariant checks
source: <https://gist.github.com/jamiebuilds/2a40f565cba317a80bed1eec127340f6>
---



# `assert()` (sometimes called `invariant()`)

Instead of checks like:

```js
if (value === null) {
  throw new Error("missing value")
}
doSomethingThatNeedsValue(value)
```

Or even worse, checks that silently do nothing:

```js
if (value === null) {
  return
}
doSomethingThatNeedsValue(value)
```

I use a function called `assert()`

```js
assert(value)
doSomethingThatNeedsValue(value)
```

JavaScript implementation:

```js
function assert(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message || "Assertion failed")
  }
}
```

Or in TypeScript:

```tsx
function assert(value: boolean, message?: string): asserts value;
function assert<T>(value: T | null | undefined, message?: string): asserts value is T;
function assert(value: any, message?: string) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message || "Assertion failed")
  }
}
```

> This makes use of an advanced TypeScript feature `asserts` which makes it so TypeScript understands your assertions

### Assert a value is not `null` or `undefined` or `false`

```tsx
let value: number | null = Math.random() > 0.5 ? 42 : null
assert(value)
let newValue: number = value
```

### Assert a condition

Any expression that resolves to `true` or `false` can also work:

```tsx
let value: number | null = Math.random() > 0.5 ? 42 : null
assert(typeof value === "number")
let newValue: number = value
```

### Optionally: Provide a message

You might even want to require this, but I personally find it unncessary.

```tsx
assert(typeof value === "number", "value must be number")
```
