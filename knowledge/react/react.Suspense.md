# `React.Suspense`

`Suspense` is a pseudo-component that allows to render the [React](/knowledge/react/index.md) Component even when it is not loaded yet. It is mostly used for defining the fallback UI.

```js
<Suspense fallback={FallbackComponent}>
  <LazyLoadedComponent />
</Suspense>
```
