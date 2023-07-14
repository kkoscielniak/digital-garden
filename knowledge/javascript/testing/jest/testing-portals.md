---
title: Testing React portals
---

Given that we have a simple Modal component:

```ts
import { useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

let modalRoot = document.getElementById("modal-root");
if (!modalRoot) {
  modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(modalRoot);
}

function Modal({ children }): ReactElement {
  const el = useRef(document.createElement("div"));
  useLayoutEffect(() => {
    const currentEl = el.current;
    modalRoot.appendChild(currentEl);
    return () => modalRoot.removeChild(currentEl);
  }, []);
  return createPortal(children, el.current);
}

export { Modal };
```

We can test if `Modal` shows the `children` like that:

```tsx
import * as React from "react";
import { render, within } from "@testing-library/react";
import { Modal } from "../modal";

test("modal shows the children", () => {
  render(
    <Modal>
      <div data-testid="test" />
    </Modal>,
  );
  const { getByTestId } = within(document.getElementById("modal-root"));
  expect(getByTestId("test")).toBeInTheDocument();
});
```

The `getByTestId` by default is bound to `document.body`, so it's available everywhere. Using `within` allows us to scope `getByTestId` down to the particular [DOM](/knowledge/webdev/dom.md) node.
