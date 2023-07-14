---
title: useMemo
---

`useMemo` is a hook allowing to save the returned value of time-consuming, costful function between subsequent rerenders.

This process is called [[knowledge/performance/memoisation|memoisation]]

We can define dependencies array that will cause re-evaluation of the memoised value once these dependencies change.

## Resources

- [react-memo](/knowledge/react/react-memo.md)
- [moize](/knowledge/react/packages/moize.md)
