---
title: Reconciliation
---

<iframe src="https://www.youtube.com/embed/thsUZEzL8ts" title="The Magic of React&#39;s Reconciliation: Behind the Scenes with a Microsoft Frontend Developer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

_Reconciliation_ is the algorithm used by React every time it has to re-render the application.

Initially, when we define the application structure (first render), React goes through the components and builds a **tree** of them ([virtual-dom](/knowledge/react/virtual-dom.md)). This tree defines that application structure of ours.

It goes from parents to children and then back to parents to confirm the integrity of the components on every level.

Then it builds the DOM tree of the components in the _structure tree_ in a form of HTML tags.

Once we modify any of the the component in the application, React checks if it should re-render said component (`shouldComponentUpdate`, checks if component is pure, has `React.memo` etc.). It also goes to children to see if the changes affect them.

Based on that React builds list of things to re-render (using the diff algorithm). After that both _structure tree_ and DOM tree are _reconciled_ and the DOM tree gets re-rendered.

There are two phases of the reconciliation:

1. Rendering phase
   - checking what should be on the screen and if the particular components have to be re-rendered
1. Commit
   - applying the changes from [virtual-dom](/knowledge/react/virtual-dom.md) to _real_ [DOM](/knowledge/webdev/dom.md).

> [!tip] To make sure the app is re-rendered properly, when we render the lists, we need the [`key`](/knowledge/react/key.md) prop.

---

In other words reconciliation is batched syncing of [virtual-dom](/knowledge/react/virtual-dom.md) with real DOM.

---

In React for web reconciliation is a responsibility of `react-dom` package.
