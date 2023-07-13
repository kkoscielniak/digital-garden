---
title: Coupling
---

_Coupling_ determines how much a class is dependent on another classes. For example we may have the `Main` class that uses `User` class (meaning that `Main` class is _coupled_ or _dependent on_ `User`)

If we change the `User` class, the `Main` class will be affected and we may need to change it and recompile.

If we had hundreds or thousands of classes, and many of them were highly dependent on each other, we could end up with lots of cascading changes that'd be hard to implement and extend.

> A good metaphor would be a car. For a flat tire, we wouldn't need to swap the entire engine. That makes the car a _loosely coupled system_ (different parts work together, but are not highly dependent on each other)

We can build loosely coupled applications using [interfaces](/knowledge/oop/interface.md).
