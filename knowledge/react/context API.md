ContextAPI allows to pass the reusable variables between the parents and the childrens without using props.

> [!tip] Like the global variables, but in [React](knowledge/react/react.md).

## Useful appliances

- keeping the authentication data
- theme management

## Clean Code

It's nice to keep contexts in a separate directory, if they are widely used.

```js
export const AuthenticationContext = React.createContext({ accessToken: null });

// ...

<AuthenticationContext.Provider value={{ accessToken: this.state.accessToken }}>
  // ...
</AuthenticationContext.Provider>;
// ...
```

Consuming the context. **Mind**: the syntax.

> Requires a [function as a child](https://reactjs.org/docs/render-props.html#using-props-other-than-render). The function receives the current context value and returns a React node. [?].
> -> [[knowledge/react/render-props|render-props]]

```js
<AuthenticationContext.Consumer>
  {({ accessToken }) => <>AccessToken: {accessToken}</>}
</AuthenticationContext.Consumer>
```

or for using the context from

```js
Component.contextType = AuthenticationContext;
```

> 💡 It's possible to keep functions in context
