---
title: React.memo
---

With `React.Memo`, we can make the functional component to behave like a class [pure-component](/knowledge/react/pure-component.md).

We create new constant that'd keeps the result of `React.memo` function:

```jsx
import { memo } from "react";

const SomeComponent = memo(function SomeComponent(props) {
  // ...
});
```

> [!danger] Mind the Pure Component
>
> `React.memo` effectively makes the fn component the Pure Component, with all its advantages and drawbacks.
