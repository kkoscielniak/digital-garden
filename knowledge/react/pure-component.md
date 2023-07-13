---
title: Pure Component
---

A _Pure Component_ is a component that doesn't re-render unless its `props` or `state` changes.

## Explanation

In ordinary components we have `shouldComponentUpdate(nextProps, nextState)` method (that returns `true` by default). `PureComponent` by its implementation is sth like:

```jsx
import shallowEqual from "shallowequal";

class RangeInput extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    );
  }
}
```

As it is a _shallow_ equal comparison, React doesn't go deeper into compared objects.
This means:

- `children` (which are in the array) will always differ
- the handler fns will always differ if they are created at every render
  - remediated by making the function the instance method

## Dangers

If we're using [render-props](/knowledge/react/render-props.md) with Pure Components, we are passing a function. The parent component would have to define a function calling the `renderProp` function. This _wrapping_ function will be recreated on every render of the parent, making our pure component to re-render anyway (because of the shadow equal comparison).

- This can be remediated with making the wrapper the instance function

> [!info] Render props are not recommended with Pure Components.
