---
title: useCallback
---

Each time we rerender the component, the callback functions are recreated.

- The `useCallback` hook is used to make functions recreate only if the dependencies change (similarly to [[knowledge/react/hooks/React.useEffect|React.useEffect]] and [useMemo](/knowledge/react/hooks/usememo.md)).

We could use `useCallback` to [memoize](knowledge/performance/memoisation.md) the [render-props](/knowledge/react/render-props.md) `render` fn for future uses (as long as the dependencies don't change).
