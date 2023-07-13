---
title: Testing custom React hooks
---

Given the hook:

```tsx
// useCounter.ts
import * as React from "react";

function useCounter({ initialCount = 0, step = 1 } = {}) {
  const [count, setCount] = React.useState(initialCount);
  const increment = () => setCount((c) => c + step);
  const decrement = () => setCount((c) => c - step);
  return { count, increment, decrement };
}

export { useCounter };
```

We need to make sure we're using the hook inside the function component and wrap the hook fn call in an `act` fn, as a callback:

```tsx
// useCounter.test.tsx
import * as React from "react";
import { render, act } from "@testing-library/react";
import { useCounter } from "../use-counter";

test("exposes the count and increment/decrement functions", () => {
  let result;

  function TestComponent() {
    result = useCounter();
    return null;
  }

  render(<TestComponent />);

  expect(result.count).toBe(0);
  act(() => result.increment());
  expect(result.count).toBe(1);
  act(() => result.decrement());
  expect(result.count).toBe(0);
});
```

> [!tip] Normally you don't need `act` for using Testing Library.
>
> All the internal functions are using `act` in their implementation if necessary.

## Using `renderHook`

We could create a custom `setup` fn to reduce code duplication, but it'd a bit troublesome. Thankfully, there's a `renderHook` fn available in `@testing-library/react` that does exactly that:

```tsx
import { renderHook, act } from "@testing-library/react-hooks";
import { useCounter } from "../use-counter";

test("exposes the count and increment/decrement functions", () => {
  const { result } = renderHook(useCounter);
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

test("allows customization of the initial count", () => {
  const { result } = renderHook(useCounter, {
    initialProps: { initialCount: 3 },
  });
  expect(result.current.count).toBe(3);
});

test("allows customization of the step", () => {
  const { result } = renderHook(useCounter, { initialProps: { step: 2 } });
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(2);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});
```

## Testing the updates of custom React hooks if their props change over time

Just use `rerender` fn:

```tsx
test("the step can be changed", () => {
  const { result, rerender } = renderHook(useCounter, {
    initialProps: { step: 3 },
  });
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(3);
  rerender({ step: 2 });
  act(() => result.current.decrement());
  expect(result.current.count).toBe(1);
});
```
