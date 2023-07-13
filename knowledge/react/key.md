---
title: key prop
---

# `key` prop

The `key` prop is a necessary prop whenever we're rendering the components dynamically (e.g. using `.map`), as it is a basis for React to know how to match data with the components properly.

## `key` has to be **unique**

Using `index` is not the best way of adding the `key` prop, as this way we're linking data to the _place_ (or _position_) in the array of the components we're mapping. It will work only for **appending** the components to the array. If, for example, we will **prepend** components, the data will match wrong components.
