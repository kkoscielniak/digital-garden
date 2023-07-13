---
title: Containers vs Presentation Components
---

a.k.a. _smart_ and _dumb_ components.

The idea is to split the component into 2 smaller ones:

- the _smart_ component (a Container or Manager)
  - manages the state of the component
  - provides data for the dumb component to render
- the _dumb_ component (a Presentational one)
  - responsible only for rendering the data

This also makes the presentational components reusable.

We can make the Presentational component even _dumber_ with [render-props](/knowledge/react/render-props.md).

## Resources

- [Dan Abramov on smart and dumb components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
  - according to this article [[knowledge/react/hooks|hooks]] make splitting the components non necessary, but it's easier to split testing of the different aspects of the component
