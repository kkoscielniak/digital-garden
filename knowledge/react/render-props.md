---
title: Render props
---

_Render props_ is a technique for sharing the code between React components by using a function as a prop value. 

The idea is to pass a **function** rendering the [presentational component](/knowledge/react/containers-vs-presentation-components.md) as a child `prop`, making the parent responsible for maintaining the rendering logic.

The child component doesn't know what is going to be rendered. This is useful for cases where the parent component has to determine what will become rendered in the child component (we shouldn't tamper with the render props in `children`).

## Example

The canonical version of the Render Props pattern is to pass a fn as a `render` prop (he naming of the prop is not that important).

```js
const Cat = ({ mouse }) => (
  <img src="./cat.png" style={{ left: mouse.x, top: mouse.y }} />
);

const Mouse = ({ render }) => <div style={{ ... }}>
	{render}
</div>; 

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={(mouse) => <Cat mouse={mouse} />} />
      </div>
    );
  }
}
```

`children` are sort-of another variant of the Render Props pattern.
