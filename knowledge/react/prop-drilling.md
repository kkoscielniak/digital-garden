---
title: Prop drilling
---

# Prop drilling

_Prop drilling_ (a.k.a. _threading_) is the process of passing data from one component to multiple independent, usually nested children until the data reaches the component that uses it.

There are way better techniques to pass props to deeply nested components, like [render-props](/knowledge/react/render-props.md), using [context](/knowledge/react/hooks/react.usecontext.md) etc.

The primary disadvantage of prop drilling is that components that should not otherwise be aware of the data become unnecessarily complicated and are harder to maintain.
