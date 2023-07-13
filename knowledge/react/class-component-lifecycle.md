---
title: Class component's lifecycle
---

For [class-components](/knowledge/react/class-components.md):

The [class component](/knowledge/react/class-components.md)'s instance is _alive_ all the time. We can call the side effects in its lifecycle methods. 

It's lifecycle is split into 4 phases. It is created, rendered and mounted. Then it gets re-rendered (updated), usually several times. Ultimately, at some point it gets unmounted.

## Initialisation

[React](knowledge/react/react.md) component prepares setting up the initial `state` and default `props`.

## Mounting

Creating a corresponding [DOM](/knowledge/webdev/dom.md) element and connecting to it.

- `render`
- `componentWillMount`
  - before rendering
- `componentDidMount`
  - after first rendering
  - all AJAX requests, DOM or state updates, and set up eventListeners should occur here

## Updating

Sending new props or updating the state.

- `componentWillReceiveProps`
  - when particular prop updates to trigger state transitions
- `render`
- `componentDidUpdate`
  - Mostly it is used to update the DOM in response to prop or state changes
- `shouldComponentUpdate`
- `componentWillUpdate`

## Unmounting

Component gets unmounted from DOM.

- `componentWillUnmount`
  - used to cancel any outgoing network requests, or remove all event listeners associated with the component
