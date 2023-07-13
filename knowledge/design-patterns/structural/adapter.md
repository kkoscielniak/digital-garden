---
title: Adapter
---

_Adapter_, a.k.a. _Wrapper_, is a [[knowledge/design-patterns/design-patterns|structural design pattern]] that allows objects with incompatible interfaces to collaborate.

It's a special object that converts the interface of one object so that another object can understand it (like XML => JSON without converting the data [[JIT]], without rewriting the library to use XML)

## Summary

Adapter wraps one of the objects to hide the complexity of conversion. The wrapped object isn’t even aware of the adapter.

This implementation uses the object composition principle: the adapter implements the interface of one object and wraps the other one.

## Resources
- [Refactoring Guru](https://refactoring.guru/design-patterns/adapter)
