# Error Boundaries

> [!info] A JavaScript error in a part of the UI shouldn’t break the whole app.

> [!danger] There is currently no way to write an error boundary as a function component. Use [react-error-boundary](https://github.com/bvaughn/react-error-boundary) instead.
> Most of the time you’ll want to declare an error boundary component once and use it throughout your application anyway.

## Throwing an error in `render()`

- In development mode:
  - We'll see the message of thrown error in console
  - We'll see the message in the browser window (big red text box)
  - We can close the message to see what will the users see in production code
    - [React](/knowledge/react/index.md) won't know what to render instead of the erroneous component so it will render nothing

## Error boundary

A method to handle errors thrown in `render()`.

The Error Boundary component needs to implement `static getDerivedStateFromError()` to render a fallback UI after an error has been thrown. From this point it will catch all the errors that were thrown inside it.

`getDerivedStateFromError()` **updates the state** of the Error Boundary component. That's how we can display the fallback UI.

Once a child's `render()` throws an Error, the child goes upwards to find the first parent that has implemented `getDerivedStateFromError()` . Then it executes it and rerenders it.

> 🗒 We will still see the error message in the browser window and need to close the error message to see what's the rendered Error Boundary.

## What about errors that weren't thrown in `render()`?

If the error is thrown outside of `render()`, React won't update the component.
Bad news is we need to handle the error on our own, including handling the rendering of the `Error` component. Errors that are thrown outside of `render()` need to be caught in `try..catch`

## Best practices

- Create a component that's sole purpose is to catch/handle errors and call the side effects.

## Useful appliances

- Use TrackJS/Sentry to track the errors that were thrown in the production UI
  - ideally this should be done for the whole application
- send an email to the dev team on error

```js
// App.js
import Error from "./error";

<Error message="Sth wrong happened">
  <App />
</Error>;
```

> [!info] We cannot call the side effects directly in `getDerivedStateFromError()`, but we can use [[knowledge/react/class-component-lifecycle|componentDitUpdate]].

## Resources

- [error boundaries in React docs](https://reactjs.org/docs/error-boundaries.html)
