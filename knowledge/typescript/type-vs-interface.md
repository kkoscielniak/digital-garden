---
title: Type vs Interface
---

Both _Interfaces_ and _Types_ (or, to be precise, _Type Aliases_) are two ways to describe the structure of an object. The object could be anything.

While Type Aliases and Interfaces are mostly interchangeable, there are some differences.

## Interfaces are restricted to an object type

Interface declarations can exclusively represent the shape of an **object-like** data structures.

Type alias declarations can create a name for all kind of types including primitives (`undefined`, `null`, `boolean`, `string` and `number`), union, and intersection types.

```ts
type info = string | { name: string };
```

In a way, this difference makes the `type` more flexible.

## Inheritance

A Type cannot be re-opened to add new properties vs an Interface which is always extendable.

```ts
interface Vehicle {
  vin: string;
}

interface Car extends Vehicle {
  name: string;
}
```

Types cannot be extended or implemented from. However, they can be combined using intersection.

```ts
type Vehicle = {
  vin: string;
};

type Car = Vehicle & {
  name: string;
};
```

## Merging

Two Interfaces having the same name get merged to form a single interface with the same name

```ts
interface Employee {
  id: number;
}

interface Employee {
  name: string;
}

// Employee: { id: number, name: string }
```

Whereas two types will not merge as a type cannot be changed after being created.

```ts
type Employee = {
  id: number;
};

type Employee = {
  name: string;
};

// Error: Duplicate identifier 'Employee'
```

## Computed properties

With types we can use the `in` keyword to programmatically generate [mapped types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types).

```ts
type Keys = "firstname" | "surname";

type DudeType = {
  [key in Keys]: string;
};
```

It's not possible using `interface`.
