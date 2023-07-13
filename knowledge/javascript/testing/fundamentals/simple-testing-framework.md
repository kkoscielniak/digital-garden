---
title: Simple testing framework in JS
moccaOrder: 1
---

Here's an example of how the simple, `jest`-like testing framework would look like.

## The simplest test

The automated test in JS is a code that throws an `Error` if the assumption does not match the result (the result is **unexpected**).

The simplest form of the passing test:

```js
const { sum, subtract } = require("./math");
let result, expected;

result = sum(3, 7);
expected = 10;
if (result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`);
}

result = subtract(7, 3);
expected = 4;
if (result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`);
}
```

To write the **_test_**, we need to write a code that throws an `Error` with a **useful message** to understand what's wrong with our code.

It is relatively easy and reliable to test pure functions this way.

The error thrown can be abstracted into a function taking `actual` as a parameter and returning `toBe(expected)` fn.

```ts
function sum(a: number, b: number): number {
  return a - b; // This fn is broken
}

function expect(actual: any) {
  return {
    toBe(expected: any) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },
    toEqual(expected: any) {
      /* ...*/
    },
    toBeGreatherThan(expected: any) {
      /* ...*/
    },
    // etc.
  };
}

expect(sum(3, 7)).toBe(10);
```

## Encapsulating the tests into simple _framework_

In the simple case above, once any of the tests fails, the subsequent ones won't run. In addition of that, the stacktrace would display that the **`Error` occured in the same line it was thrown** (`:9`), whereas we'd like to see the broken sum fn as the reason for failing test (without digging through the stacktrace).

That's why we should encapsulate and isolate tests:

```ts
function sum(a: number, b: number): number {
  return a - b; // This fn is broken
}

function subtract(a: number, b: number): number {
  return a - b;
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },
  };
}

function test(title, callback) {
  try {
    callback();
    console.log(`[ok] ${title}`);
  } catch (error) {
    console.error(`[not ok] ${title}`);
    console.error(error);
  }
}

test("sum adds numbers", () => {
  const result = sum(3, 7);
  expect(result).toBe(10);
});

test("subtract subtracts numbers", () => {
  const result = subtract(7, 3);
  expect(result).toBe(4);
});
```

To sum up, the test should allow the developer to **quickly find what's broken**, without having to delve into the stack trace and else.

## Adding a way of testing `async` code

Simple adding `async` to the `callback()` fns and `await`ing for the result would cause the tests to falsely pass and to throw an `UnhandledPromiseRejection` `Error` with the reason of rejection (being our actual broken `sum` fn).

```sh
$ ts-node test.ts
[ok] sum adds numbers
[ok] subtract subtracts numbers

throw new Error (${actual} is not equal to ${expected});
Error: -4 is not equal to 10
at [...]
```

This is due to the fact that `async () => { /* test case */ }` returns a `Promise`. The `Error` thrown by the broken `sum()` in the test case causes **rejection of that `Promise`**. The `callback()` call inside `test()` returns that `Promise` without passing the error down. That's why we need to add `async/await` clauses to the `test` fn itself.

```ts
async function test(title: string, callback: () => any) {
  try {
    await callback();
    console.log(`[ok] ${title}`);
  } catch (error) {
    console.error(`[not ok] ${title}`);
    console.error(error);
  }
}

test("sum adds numbers", async () => {
  const result = await sum(3, 7);
  const expected = 10;
  expect(result).toBe(expected);
});
```

## Making test fns global

We want the test fns to be accessible in different `*.test.ts` files. However, we don't want to have to import the fns in each of test file (many testing frameworks seem to _embrace_ the global functions).

To make them so we can create a `setup-globals.ts` with the `test` and `expect` fns torn out...

```ts
// setup-globals.ts
function expect(actual: any) {
  return {
    toBe(expected: any) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },
  };
}

async function test(title: string, callback: () => any) {
  try {
    await callback();
    console.log(`[ok] ${title}`);
  } catch (error) {
    console.error(`[not ok] ${title}`);
    console.error(error);
  }
}

global.expect = expect;
global.test = test;
```

```ts
// test.ts
function sum(a: number, b: number): number {
  return a - b;
}

function subtract(a: number, b: number): number {
  return a - b;
}

test("sum adds numbers", async () => {
  const result = await sum(3, 7);
  const expected = 10;
  expect(result).toBe(expected);
});

test("subtract subtracts numbers", () => {
  const result = subtract(7, 3);
  const expected = 4;
  expect(result).toBe(expected);
});
```

...and run the tests in this manner:

```sh
$ ts-node --require ./setup-globals.ts test.ts
```

That being said, we've just created micro, `jest`-like testing framework.
