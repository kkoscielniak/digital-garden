# `forwardRef()`



Forwarding the [refs](/knowledge/react/refs.md). 

React treats `ref` in a special way. It does not pass `ref` with the rest of the props.

We could pass the reference by props as another variable:

```js

// ...

constructor(props) {
	super(props);
	this.anotherButtonRef = React.createRef();
}
// ...
<Button
	customRef={this.buttonRef}
/>

```

However this is not optimal. Shall the component be reusable, the users would need to be aware of the `customRef` prop.

It'd be better to use `ref` in a default way. `React.forwardRef` enables that:

```jsx
const Button = React.forwardRef((props, ref) => (
	<button
		...props,
		ref={ref}
	/>
))

// ...

constructor(props) {
	super(props);
	this.anotherButtonRef = React.createRef();
}

render {
	return (
		<Button
			ref={this.buttonRef}
		/>
	)
}
```

This will make the reference variable to be passed down until it reaches the native element.

## Attention

This should be used with care, rarely. In most common cases the `ref` value (in general: accessing the native element) should be **the implementation detail** of the given component. The rest of the application should not be aware of that.

## Useful usages

- reusable small components that are used alongside native elements (buttons, form elements)
- `canvas`

## Example

```js
import { Component, createRef, forwardRef } from "react";

const Canvas = forwardRef(({ width, height, children }, ref) => {
  return (
    <canvas
      ref={ref}
      width={width || 200}
      height={height || 200}
      style={{ border: "1px solid black", borderRadius: 10 }}
    >
      {/* {children} they are used as a fallback. wrong idea. */}
    </canvas>
  );
});

const SquareCanvas = forwardRef(({ size: { width, height } }, ref) => (
  <Canvas width={width} height={height} ref={ref} />
));

class Drawing extends Component {
  constructor(props) {
    super(props);

    this.ref = createRef();
  }

  componentDidMount() {
    const context = this.ref.current.getContext("2d");
    context.beginPath();
    context.arc(100, 75, 50, 0, 2 * Math.PI);
    context.stroke();
  }

  render() {
    return <SquareCanvas size={{ width: 150, height: 150 }} ref={this.ref} />;
  }
}

export default function App() {
  return (
    <div className="App">
      <Drawing />
    </div>
  );
}
```
