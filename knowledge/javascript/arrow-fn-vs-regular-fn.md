---
title: Arrow fn vs regular one
---

## Implicit Return

In regular fn, we have to use `return` (otherwise the function will return `undefined`. If the arrow function contains one expression, we can omit `{ ... }`, and then the expression will be implicitly returned.

## Arguments binding

In regular fn, we can use `arguments` keyword to access the arguments of which passed to function.

```js
function regularFunction(a, b) {
  console.log(arguments);
}

regularFunction(1, 2);
// Arguments[1,2]
```

Arrow functions do not have an arguments binding. However, if we want to access arguments in an arrow function, we can use the `...rest` operator:

```js
const arrowFunction = (...args) => {
  console.log(...args);
};
arrowFunction(1, 2);
// 1 2
```

## `this`

In regular function, `this` changes according to the way that function is invoked:

- Simple Invocation - `this` equals the global object or `undefined` (in strict mode)
- Method Invocation - `this` equals the object that owns the method
- Indirect Invocation - `this` equals the first argument
- Constructor Invocation - `this` equals the newly created instance.

```js
function simpleInvocation() {
  console.log(this);
}
simpleInvocation();
// `window` | `undefined`

const methodInvocation = {
  method() {
    console.log(this);
  },
};
methodInvocation.method();
// `methodInvocation`

const context = { a: "A", b: "B" };
function indirectInvocation() {
  console.log(this);
}
indirectInvocation.call(context); // { a: 'A' }
indirectInvocation.apply(context); // { b: 'A' }

function constructorInvocation() {
  console.log(this);
}
new constructorInvocation();
// instance of `constructorInvocation`
```

Arrow functions don’t have their own `this`, and they don’t redefine the value of `this` within the function. `this` inside an arrow function always refers to `this` from the outer context.

## `new`

Regular functions are constructible, they can be called using the `new` keyword.

```js
function add(x, y) {
  console.log(x + y);
}
let sum = new add(2, 3);
// 5
```

Arrow functions can never be used as constructor functions. Hence, they can never be invoked with the `new` keyword:

```js
const add = (x, y) => console.log(x + y);
const sum = new add(2, 4);
// TypeError: add is not a constructor
```

## Hoisting

The regular function gets hoisted at top.

In arrow function, function gets hoisted where it is defined. Calling the arrow function before iw was initialised results in `ReferenceError`.
