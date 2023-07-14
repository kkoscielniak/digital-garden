# `React.lazy()`

`React.lazy()` allows to load components asynchronously in [react](knowledge/react/react.md).

It returns the component that was loaded asynchronously in the background. It is **mandatory** to add [[knowledge/react/react.Suspense]] component that defines the fallback UI for when the component isn't loaded.
