# `React.useEffect` hook

The `useEffect` hook is used for handling the [[Side effects#Side effects in React]] when the time is safe. 

`useEffect` will call the callback with side effect sometime after the rendering is finished, whenever it will think it's safe to do that. Without passing an array of dependencies, `useEffect`s callback is called on **every render**.

```js
useEffect(() => {
  document.title = `new title ${newValue}`;
});
```

### The dependencies array

```js
useEffect(() => {
  document.title = `new title ${newValue}`;
}, [newValue]);
```

Now the callback will get called only if `newValue` is different than in the previous call.

**We shouldn't use mutable values as the dependencies**. Changes inside the object might not be cause for the re-rendering.

## `return` function

Is used to cleanup after the effect, like:

- removing intervals
- unsubscribing from the external service

If we pass an empty array as the second parameter to `useEffect`, the side effect will get called only once and the cleanup (return function) will be ran just before the functional component gets unmounted.
