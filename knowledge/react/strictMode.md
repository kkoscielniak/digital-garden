---
title: StrictMode
---

[React](/knowledge/react/index.md)'s `StrictMode` is sort of a helper component that helps to write better react components by wrapping a set of components with `<StrictMode />`. It will:

- Verify that the components inside are following some of the recommended practices and warn you if not in the console
- Verify the deprecated methods are not being used, and if they're used strict mode will warn you in the console
- Help you prevent some side effects by identifying potential risks

This is done by:

- double rendering
  - React assumes that every component you write is a pure function. This means that React components you write must always return the same JSX given the same inputs (props, state, and context). If the component breaks the rule, `StrictMode` will catch that
- re-running effects
  - React will run one extra setup+cleanup cycle in development for every Effect to ensure it works properly
- warnings about the deprecated APIs used
