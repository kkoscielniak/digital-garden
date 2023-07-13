---
title: Install React Dev Tools in Cypress
---

If we run Cypress in Chrome-based browser that has the React Dev Tools extension installed, we still need to register the tested app in DevTools.

In our app:

```ts
// src/react-devtools-hook.js

if (window.Cypress) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ =
    window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__;
}
```

```ts
// src/index.js

import "./react-devtools-hook"; // in the first line!
/* [...] */
```
