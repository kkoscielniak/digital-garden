---
title: Side Effects
---

Everything that happens inside function but is not returned by it. 

- `printf` etc.
- audio
- video
- mutation of local static variables, non-local variables,
- mutable reference arguments or input/output streams.

A funciton without any side effects is  called [[knowledge/others/pure-fn|pure function]].

## Side effects in [[knowledge/react/react|React]]

Basically anything that's not directly related to the rendering of the component:

- using the browser API
- accessing the external APIs
- setting timeouts, intervals etc.
- adding new elements to [DOM](Knowledge/WebDev/DOM.md)
