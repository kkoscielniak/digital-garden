---
title: Higher Order Components
---

_Higher Order Components_ is a pattern in React allowing to enhance the component with additional logic (like authentication, state). They are functions that take a component and return a new component.

A HOC in that regard is a component that wraps the one being enhanced:

```js
const withHoc = (StatelessComponent) => {
  const Wrapper = (props) => {
    const { children } = props;
    const [on, setOn] = useState(false);
    const toggle = () => setOn((prevState) => !prevState);

    return (
      <StatelessComponent on={on} toggle={toggle} {...props}>
        {children}
      </StatelessComponent>
    );
  };

  return Wrapper;
};

const EnhancedComponent = withHoc(WrappedComponent);
```

This way we write less repetitive code.

HOCs have advantages, such as:

- they don't change the wrapped components
  - allowing to focus on [Presentational components](/knowledge/react/containers-vs-presentation-components.md)
- they simplify testing the application

They also have drawbacks:

- every HOC is another level in the hierarchy that gets rendered but may not add anything important to the hierarchy. It makes the [DOM](/knowledge/webdev/dom.md) messy

> [!danger] We can nest HOC wrapping, but we need to be mindful about the order of nested HOCs

The concept of HOCs has its roots in the functional programming Higher Order Functions.

HOCs allow for `render` hijacking, props and state manipulation and state abstraction.
