---
title: Testing components with Jest and React Testing Library
---

## New ways of using `@testing-library/react`

- Don't return `getBy...` methods from `render(<Component />`. Use `screen` export instead
- `userEvent` is better than `fireEvent`
- Use `waitFor` instead of `wait`. They are _same_ but `waitFor` offers more possibilities

## Using `jest-dom`

`jest-dom` provides really useful extensions to jest’s built-in assertion library that will make it easier for us to write our test assertions (like `toHaveTextContent`).

```ts
import * as React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import { FavoriteNumber } from "../favorite-number";

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement("div");
  ReactDOM.render(<FavoriteNumber />, div);
  expect(div.querySelector("input")).toHaveAttribute("type", "number");
  expect(div.querySelector("label")).toHaveTextContent("Favorite Number");
});
```

> [!tip] KCD configured the test files to import `@testing-library/*` automatically
>
> That's why that import is missing from the examples

## Using [DOM Testing Library](/knowledge/javascript/testing/fundamentals/dom-testing-library.md) to write more maintainable tests

```tsx
import * as React from "react";
import ReactDOM from "react-dom";
import { getQueriesForElement } from "@testing-library/dom";
import { FavoriteNumber } from "../favorite-number";

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement("div");
  ReactDOM.render(<FavoriteNumber />, div);
  const { getByLabelText } = getQueriesForElement(div);
  const input = getByLabelText(/favorite number/i); // /i -> case insensitive
  expect(input).toHaveAttribute("type", "number");
});
```

## Using `@testing-library/react` for rendering

```tsx
import * as React from "react";
import { render, screen } from "@testing-library/react";
import { FavoriteNumber } from "../favorite-number";

test('renders a number input with a label "Favorite Number"', () => {
  render(<FavoriteNumber />);
  const input = screen.getByLabelText(/favorite number/i);
  expect(input).toHaveAttribute("type", "number");
});
```

## React Testing Library's `debug` fn

`debug(renderedComponent = null)` will `console.log` the HTML code for all rendered components (unless one is provided as an argument).

```tsx
import * as React from "react";
import { render, screen } from "@testing-library/react";
import { FavoriteNumber } from "../favorite-number";

test('renders a number input with a label "Favorite Number"', () => {
  render(<FavoriteNumber />);
  const input = screen.getByLabelText(/favorite number/i);
  expect(input).toHaveAttribute("type", "number");
  screen.debug(); // <-- w/o arg
  // screen.debug(input); // <-- with arg
});
```

## Testing Event Handlers with `userEvent`

`userEvent` fn more closely resebles the way the users interact with tested components than `fireEvent` itself.

`userEvent.type` internally fires a bunch of `fireEvent`s to mimic human behavior. It follows `async/await` pattern.

```tsx
import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FavoriteNumber } from "../favorite-number";

test("entering an invalid value shows an error message", async () => {
  render(<FavoriteNumber />);
  const input = screen.getByLabelText(/favorite number/i);
  // fireEvent.change(input, {target: {value: '10'}})
  await userEvent.type(input, "10");

  // `FavoriteNumber` contains a `div` with `role="alert"` defined for accessibility purposes
  expect(screen.getByRole("alert")).toHaveTextContent(/the number is invalid/i);
});
```

## Test props updates

```tsx
import * as React from "react";
import user from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { FavoriteNumber } from "../favorite-number";

test("entering an invalid value shows an error message", async () => {
  const { rerender } = render(<FavoriteNumber />);
  const input = screen.getByLabelText(/favorite number/i);
  await user.type(input, "10");
  expect(screen.getByRole("alert")).toHaveTextContent(/the number is invalid/i);
  rerender(<FavoriteNumber max={10} />);
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});
```

### The difference between `getBy...` and `queryBy...`

`getBy...` will throw an `Error` if it didn't find queried element. `queryBy...` will return `null` instead.

Usually it's better to use `getBy...` to have a nice error messages in Jest's output, but occasionally assertions using `queryBy...` will be easier to read.

## Test accessibility

Not all of accessibility testing of a web application can be automated, but much of it can be using [jest-axe](https://github.com/nickcolley/jest-axe).

```tsx
import "jest-axe/extend-expect";
import * as React from "react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

test("inaccessible forms fail axe", async () => {
  const { container } = render(<InaccessibleForm />);
  const axeResult = await axe(container);
  expect(() => expect(axeResult).toHaveNoViolations()).toThrow();
});

test("accessible forms pass axe", async () => {
  const { container } = render(<AccessibleForm />);
  expect(await axe(container)).toHaveNoViolations();
});
```

## Test `componentDidCatch` Error Boundary handler

```tsx
import * as React from "react";
import { render } from "@testing-library/react";
import { reportError } from "../api";
import { ErrorBoundary } from "../error-boundary";

jest.mock("../api");

afterEach(() => {
  jest.clearAllMocks();
});

function Bomb({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error("💣");
  } else {
    return null;
  }
}

test("calls reportError and renders that there was a problem", () => {
  reportError.mockResolvedValueOnce({ success: true });
  const { rerender } = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  );

  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow={true} />
    </ErrorBoundary>,
  );

  const error = expect.any(Error);
  const info = { componentStack: expect.stringContaining("Bomb") };
  expect(reportError).toHaveBeenCalledWith(error, info);
  expect(reportError).toHaveBeenCalledTimes(1);

  expect(console.error).toHaveBeenCalledTimes(2);
});
```

It's possible to suppress `console.error` from the Error Boundary component. Useful for omitting the `console.error` messages in test results, if the formers make the latters messy.

```tsx
beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});
```

### Ensure Error Boundaries can successfully recover from Errors

Thanks to `.mockClear()` we can _reset_ how many times the fn was called:

```tsx
test("calls reportError and renders that there was a problem, then recovers from ", () => {
  /* ... */

  // here we are clearing out the mocks
  console.error.mockClear();
  mockReportError.mockClear();

  rerender(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  );

  userEvent.click(screen.getByText(/try again/i));

  expect(mockReportError).not.toHaveBeenCalled();
  expect(console.error).not.toHaveBeenCalled();
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(screen.queryByText(/try again/i)).not.toBeInTheDocument();
});
```

## Mock `react-transition-group`

Given the Component:

```tsx
// hidden-message.tsx
import * as React from "react";
import { CSSTransition } from "react-transition-group";

function Fade(props) {
  return (
    <CSSTransition unmountOnExit timeout={1000} classNames="fade" {...props} />
  );
}

function HiddenMessage({ children }) {
  const [show, setShow] = React.useState(false);
  const toggle = () => setShow((s) => !s);
  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      <Fade in={show}>
        <div>{children}</div>
      </Fade>
    </div>
  );
}

export { HiddenMessage };
```

In the case of `react-transition-group`, we don’t want to have to wait `1000ms` until the transition has completed before we can go on with our tests. We can mock `react-transition-group` implementation to do so:

```tsx
import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HiddenMessage } from "../hidden-message";

jest.mock("react-transition-group", () => {
  return {
    CSSTransition: (props) => (props.in ? props.children : null),
  };
});

test("shows hidden message when toggle is clicked", () => {
  const myMessage = "hello world";
  render(<HiddenMessage>{myMessage}</HiddenMessage>);
  const toggleButton = screen.getByText(/toggle/i);
  expect(screen.queryByText(myMessage)).not.toBeInTheDocument();
  userEvent.click(toggleButton);
  expect(screen.getByText(myMessage)).toBeInTheDocument();
  userEvent.click(toggleButton);
  expect(screen.queryByText(myMessage)).not.toBeInTheDocument();
});
```

When we mock something, we want to make the mock as close to original function as possible.

## Wrappers

Wrappers are a nice to have to avoid code repetition:

```tsx
test("calls reportError and renders that there was a problem", () => {
  // [...]
  const { rerender } = render(<Bomb />, { wrapper: ErrorBoundary });
  // [...]
});
```

## Mock HTTP with `jest.mock`

If we have a component that makes HTTP request we want to mock those out for UI unit and integration tests:

```tsx
// greeting-loader.tsx

import * as React from "react";
import { loadGreeting } from "./api";

function GreetingLoader() {
  const [greeting, setGreeting] = React.useState<string>("");
  async function loadGreetingForInput(e) {
    e.preventDefault();
    const { data }: { data: { greeting: string } } = await loadGreeting(
      e.target.elements.name.value,
    );
    setGreeting(data.greeting);
  }
  return (
    <form onSubmit={loadGreetingForInput}>
      <label htmlFor="name">Name</label>
      <input id="name" />
      <button type="submit">Load Greeting</button>
      <div aria-label="greeting">{greeting}</div>
    </form>
  );
}

export { GreetingLoader };
```

```tsx
// greeting-loader.test.ts

import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { loadGreeting } from "../api";
import { GreetingLoader } from "../greeting-loader";

jest.mock("../api");

test("loads greetings on click", async () => {
  const testGreeting = "TEST_GREETING";
  loadGreeting.mockResolvedValueOnce({ data: { greeting: testGreeting } });
  render(<GreetingLoader />);

  const nameInput = screen.getByLabelText(/name/i);
  const loadButton = screen.getByText(/load/i);

  await userEvent.type(nameInput, "Mary");
  await userEvent.click(loadButton);

  expect(loadGreeting).toHaveBeenCalledWith("Mary");
  expect(loadGreeting).toHaveBeenCalledTimes(1);

  // waitFor uses `act()` for state updates for us
  await waitFor(() =>
    expect(screen.getByLabelText(/greeting/i)).toHaveTextContent(testGreeting),
  );
});
```

## Mocking HTTP with `msw`

It would be nice addition to make sure that the API module is working properly when testing the components that are interacting with that module.

That would require us to actually interact with the API, but the requests would be intercepted. To intercept requests we need to setup the `msw` server intercepting them first.

Also, because the tests are ran in Node.js environment we need to polyfill the `fetch` module with `whatwg-fetch`.

```tsx
import "whatwg-fetch";
import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { GreetingLoader } from "../greeting-loader-01-mocking";

const server = setupServer(
  rest.post("/greeting", (req, res, ctx) => {
    return res(ctx.json({ data: { greeting: `Hello ${req.body.subject}` } }));
  }),
);

beforeAll(() => server.listen({ onUnhandledRequest: "error" })); // start the server
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test("loads greetings on click", async () => {
  render(<GreetingLoader />);
  const nameInput = screen.getByLabelText(/name/i);
  const loadButton = screen.getByText(/load/i);

  await userEvent.type(nameInput, "Mary");
  await userEvent.click(loadButton);
  await waitFor(() =>
    expect(screen.getByLabelText(/greeting/i)).toHaveTextContent("Hello Mary"),
  );
});
```

The cool part is that if we were to make some sort of mistake, not just in our component, but also in our client request, then we would catch that with this arguably simpler test. We also get a higher coverage.

## Custom `renderComponent` fns to simplify tests

Having a custom `render[Component]` fn allows to simplify the test code:

```tsx
function renderEditor() {
  const fakeUser = userBuilder()
  const utils = render(<Editor user={fakeUser} />)
  const fakePost = postBuilder()

  screen.getByLabelText(/title/i).value = fakePost.title
  screen.getByLabelText(/content/i).value = fakePost.content
  screen.getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = screen.getByText(/submit/i)
  return {
    ...utils,
    submitButton,
    fakeUser,
    fakePost,
  }
}

test('renders a form with title, content, tags, and a submit button', async () => {
  const {submitButton, fakePost, fakeUser} = renderEditor()
    /* [...] */
}
```

## Custom `history` implementation within `react-router`

Mocking the `<Redirect />` component in `react-router` works, but it’s imperfect because we don’t know for sure that the user will be redirected properly.

Normally we'd import `BrowserRouter`, but in tests we import `MemoryRouter` so we can manually control the `history` object.

```tsx
import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import { render as rtlRender, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Main } from "../main";

function render(ui, { route = "/", ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>;
  }
  return rtlRender(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  });
}

test("main renders about and home and I can navigate to those pages", async () => {
  render(<Main />);
  expect(screen.getByRole("heading")).toHaveTextContent(/home/i);
  await userEvent.click(screen.getByText(/about/i));
  expect(screen.getByRole("heading")).toHaveTextContent(/about/i);
});

test("landing on a bad page shows no match component", () => {
  render(<Main />, {
    route: "/something-that-does-not-match",
  });
  expect(screen.getByRole("heading")).toHaveTextContent(/404/i);
});
```

## Testing the unmounting of the component

Let's assume we have the `Countdown` function component that will cleanup in `useEffect`/`useLayoutEffect`/`componentWillUnmount`.

> [!tip] `testing-library` doesn't care about component type
>
> The test case can be the same for both class and function components.

```tsx
import { useEffect, useRef, useState } from "react";

function Countdown() {
  const [remainingTime, setRemainingTime] = useState(10000);
  const end = useRef(new Date().getTime() + remainingTime);
  useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = end.current - new Date().getTime();
      if (newRemainingTime <= 0) {
        clearInterval(interval);
        setRemainingTime(0);
      } else {
        setRemainingTime(newRemainingTime);
      }
    });
    return () => clearInterval(interval);
  }, []);
  return remainingTime;
}

export { Countdown };
```

```tsx
// countdown.test.tsx
import * as React from "react";
import { render, act } from "@testing-library/react";
import { Countdown } from "../countdown";

// keeping `console.error` out of the way in test output
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers(); // this re-enables normal intervals/timers so the other tests can use them. just in case.
});

test("does not attempt to set state when unmounted (to prevent memory leaks)", () => {
  jest.useFakeTimers();
  const { unmount } = render(<Countdown />);
  unmount();
  act(() => jest.runOnlyPendingTimers());
  expect(console.error).not.toHaveBeenCalled();
});
```

To simulate unmounting the component, we're using `unmount` from `render` fn.

To make sure every intervals were cleared properly, we can use `
`jest.useFakeTimers()`and`jest.runOnlyPendingTimers()`. The former will make sure the timers will run way quicker.

After umnounting, we're calling `jest.runOnlyPendingTimers()` to see if there were any non-cleared intervals (we need to wrap it in `act`). 8

Without proper cleanup in the component, the error would be thrown here (that's why we're expecting errors not to be thrown).
