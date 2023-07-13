# Portals

> [!dangert] We should avoid abusing Portals. They are great for modals, tooltips, cookie bars etc. but should be used with caution.

> [!info] It's worth to use Portals when the hierarchy of components needs to be different than the hierarchy of HTML elements

## Example

```html
<body>
  <div id="root"></div>
  <div id="modalsRoot"></div>
</body>
```

```jsx
function Modal(props) {
  return ReactDOM.createPortal(
    <div>Modal content</div>,
    modalsRoot, // put it into another root
  );
}
```

Portal `root`s may be statically defined before diving into the React code, but it's also possible to create the component that's sole purpose is to create Portals:

```jsx
class Portal extends React.Component {
  constructor(props) {
    super(props);

    this.container = document.createElement("div");
  }

  componentDidMount() {
    document.body.appendChild(this.container);
  }

  componentWillUnmount() {
    document.body.removeChild(this.container);
  }
  render() {
    return ReactDOM.createPortal(this.props.children, this.container);
  }
}
```

and then:

```jsx
<Portal>
  <Component />
</Portal>
```

The `<Component />` will get mounted inside the `div` appended dynamically to `body`.

The components don't have to know where they will be mounted. They just need to be wrapped and that's it.
