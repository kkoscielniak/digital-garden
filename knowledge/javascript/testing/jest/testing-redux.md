---
title: Testing Redux
---

## Redux store setup

We have the code to be tested as follows:

```tsx
// redux-reducer.tsx
const initialState = { count: 0 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1,
      };
    case "DECREMENT":
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export { reducer };
```

```tsx
// redux-store.tsx
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./redux-reducer";

const store = configureStore({ reducer });

export { store };
```

```tsx
// redux-counter.tsx
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

function Counter() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  const increment = () => dispatch({ type: "INCREMENT" });
  const decrement = () => dispatch({ type: "DECREMENT" });
  return (
    <div>
      <h2>Counter</h2>
      <div>
        <button onClick={decrement}>-</button>
        <span aria-label="count">{count}</span>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
}

export { Counter };
```

## Testing Redux Connected components

We need to wrap the component in `Provider` with a store associated with it:

```tsx
import * as React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "../redux-counter";
import { store } from "../redux-store";

test("can render with `redux` with defaults", async () => {
  render(
    <Provider store={store}>
      <Counter />
    </Provider>,
  );
  await userEvent.click(screen.getByText("+"));
  expect(screen.getByLabelText(/count/i)).toHaveTextContent("1");
});

test("can render with redux with custom initial state", async () => {
  const customInitialStateStore = configureStore({
    reducer,
    preloadedState: { count: 3 },
  });
  render(
    <Provider store={customInitialStateStore}>
      <Counter />
    </Provider>,
  );
  await userEvent.click(screen.getByText("-"));
  expect(screen.getByLabelText(/count/i)).toHaveTextContent("2");
});
```

The cool part is that we're testing our application store as well as the component that's using this store, in integration.

In tests themselves, we only interact with the component itself, as it is not using Redux at all (redux as an implementation detail), so if we were to migrate away from Redux to some other state management solution, we would need minimum updates to our tests.

It's also useful to create a custom render function for testing:

```tsx
import * as React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render as rtlRender, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "../redux-counter";
import { reducer } from "../redux-reducer";

function render(
  ui,
  {
    initialState,
    store = configureStore({ reducer, preloadedState: initialState }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
    store,
  };
}

test("can increment the value", async () => {
  render(<Counter />);
  await userEvent.click(screen.getByText("+"));
  expect(screen.getByLabelText(/count/i)).toHaveTextContent("1");
});

test("can decrement the value", async () => {
  render(<Counter />, {
    initialState: { count: 3 },
  });
  await userEvent.click(screen.getByText("-"));
  expect(screen.getByLabelText(/count/i)).toHaveTextContent("2");
});
```
