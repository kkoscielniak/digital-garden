---
title: Abstraction
---

One of the core principles of Object-Oriented Programming.

_Abstraction_ is a rule stating that we should reduce the complexity of the class by hiding its unnecessary details (e.g. by annotating the methods used only inside the class as `private`). As consumers, we shouldn't care about the class internals when interacting with them.

This reduces complexity of the class and helps the consumers of this class to use it properly.

Change of any of the internal methods does not affect the consumer class and reduces [coupling](/knowledge/oop/coupling.md).
