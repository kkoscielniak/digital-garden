---
title: Inheritance
---

Another Object-Oriented Programming core principle.

_Inheritance_ is about derivating the common behavior of different classes from a parent class that implements that particular behavior (e.g. both `Car` and `Motorcycle` are a `Vehicle` and may have common methods, like `accelerate()`, `tank()` etc.).

Only the methods that are tailored for one of the child classes should be kept in particular child classes (e.g. only the `Car` class should have `openTrunk()` method, as motorcycles don't have trunks).

> [!danger] I know nothing of motorcycles, maybe they, in fact, have trunks.

Inheritance allows us to **reuse** the common counterparts of the code.
