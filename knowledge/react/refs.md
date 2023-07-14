---
title: Refs
---

# Refs

Created by `React.createRef()` or `useRef` hook, by definition, _refs_ allow to reference values without triggering new renders.

## Manipulating DOM with _refs_

While `refs` are a pretty generic concept, most often they are used to hold [DOM](/knowledge/webdev/dom.md) element references or component instances.

On rare occasions we may need to access the DOM directly (e.g. to focus a node, measure its size/position etc.). Refs allow us to access the DOM node easily:

```tsx
// ...
const myRef = useRef(null);

return {
	<div ref={myRef} />
}
```

## Forwarding refs with `forwardRef`

By default it is not possible to access DOM nodes of other components (even children). Component that _want_ to expose its DOM nodes can specify that it “forwards” its ref to one of its children:

```tsx
const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});
```

See more: [react.forwardRef()](</knowledge/react/react.forwardref().md>)

## Caveats

- Refs are an _escape hatch_ that should be used sparingly
- modifying the DOM manually may result in conflicts between our changes and the changes React is making under the hood
  - stick to the non-destructive actions like focusing or scrolling
  - modify only the parts **React has no reason to modify on its own**
