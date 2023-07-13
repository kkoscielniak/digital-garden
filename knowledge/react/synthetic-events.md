---
title: Synthetic Events
---

In [React](knowledge/react/react.md) event handlers receive a _React Event object_ - these are known as _synthetic events_. The goal is to fix some browser inconsistencies.

We can access the underlying browser events with `event.nativeEvent`.
