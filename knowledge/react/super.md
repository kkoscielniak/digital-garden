---
title: super()
---

A child class constructor cannot make use of `this` reference until `super()` method has been called.

The same applies for ES6 sub-classes in general. The main reason of passing props parameter to `super()` call is to access `this.props` in your child constructors.
