---
title: Component state vs Class fields
---

> [!tip] This concerns [class-components](/knowledge/react/class-components.md)

Changing the state of the component causes UI to re-render.

Thus, keeping UI-agnostic data as class fields is okay.

It's important not to re-render UI if it's not necessary, as this impacts the performance.

## Resources

- [why-did-you-render](https://github.com/welldone-software/why-did-you-render) package
