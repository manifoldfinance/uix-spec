## Re-computes when unrelated properties change

With `derive`, the computation will occur if any property of the base proxy changes. Example:

```
const baseProxy = proxy({
  counter1: 0,
  counter2: 0,
  counter3: 0,
  counter4: 0
});

const countersOneAndTwoSelectors = derive({
  sum: get => get(baseProxy).counter1 + get(baseProxy).counter2
})
```

In this example even if `baseProxy.counter3` or `baseProxy.counter4` are changed, `countersOneAndTwoSelectors` will re-compute all of the keys in it.

## get sub-objects due to update of unrelated proxies on parent proxy

As noted on his page, re-computation occurs when unrelated properties change. It is possible to use `get` on sub-objects. This has the benefit of not re-computing when properties of the parent object are updated. Example:

```
const baseProxy = proxy({
  counter1And2: {
    counter1: 0,
    counter2: 0
  },
  counter3: 0,
  counter4: 0
});

const countersOneAndTwoSelectors = derive({
  sum: get => get(baseProxy.counter1And2).counter1 + get(baseProxy.counter1And2).counter2
})
```

Now even if `counter3` and `counter4` are updated, it will not cause re-computation of `countersOneAndTwoSelectors`.



> ## `useSnapshot` optimizes re-renders automatically

This is the basic usage.

```jsx
const Component = () => {
  const { count } = useSnapshot(state) // this is reactive
  return <>{count}</>
}
```

## Reading state is valid but not recommended for general use cases

```jsx
const Component = () => {
  const { count } = state // this is not reactive
  return <>{count}</>
}
```

This will not trigger re-render, but it doesn't follow the react rule like with any other global variables.

## Subscribe and set local state conditionally

```jsx
const Component = () => {
  const [count, setCount] = useState(state.count)
  useEffect(() => subscribe(state, () => {
    if (state.count % 2 === 0) {
      // conditionally update local state
      setCount(state.count)
    }
  }), [])
  return <>{count}</>
}
```

This should work mostly.

Theoretically, state can be changed before the subscription. A fix would be the following.


```jsx
const Component = () => {
  const [count, setCount] = useState(state.count)
  useEffect(() => {
    const callback = () => {
      if (state.count % 2 === 0) {
        // conditionally update local state
        setCount(state.count)
      }
    }
    const unsubscribe = subscribe(state, callback)
    callback()
    return unsubscribe
  }), [])
  return <>{count}</>
}
```
