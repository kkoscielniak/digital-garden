---
title: Mocking
weight: 2
---

Mocking is used to enable testing modules that depend (as in _dependency_) on another modules, that we don't want to _really_ use, e.g. credit card service.

We may not want to do any requests with a credit card service, so we can mock it (btw making its behavior [deterministic](/deterministic)).

## Monkey patching

Monkey patching is the most naive (and limited) approach to mocking in JS. Basically it's overriding an object property (e.g. `utils.getWinner()`) in the test.

```ts
const assert = require("assert");
const thumbWawr = require("../thumbwar");
const utils = require("../utils"); // `utils` is the module we want to mock

const originalGetWinner = utils.getWinner; // saving the original implementation for cleanup
utils.getWinner = (p1, p2) => p1; // here we make sure `.getWinner` will always ensure the first player wins

const winner = thumbWar("Kent C. Dodds", "Ken Wheeler");
assert.strictEqual(winner, "Kent C. Dodds"); // PASS

utils.getWinner = originalGetWinner; // cleanup
```

> [!danger] In ES modules monkey patching does not work.

### Cleanup

Important thing in testing is to clean up after the mocking in the test case, so the other cases may use the original module again or mock it in a different way.

In this test case we reassign the real function, exported from the `utils.ts` back to `getWinner`.

## Ensuring fns are called properly with mocks

When writing tests and mocking dependencies, we want to verify that the function was called correctly, by tracking how often the function was called and what arguments it was called with. This is to ensure the usage of `utils.getWinner` in `thumbWar` implementation is correct.

To do that we may use `jest.fn` _mock function_. It keeps track the parameters and how many it was called.

```ts
utils.getWinner = jest.fn((p1, p2) => p1);

expect(utils.getWinner).toHaveBeenCalledTimes(2);
expect(utils.getWinner).toHaveBeenCalledWith("Kent C. Dodds", "Ken Wheeler");
expect(utils.getWinner).toHaveBeenNthCalledWith(
  1,
  "Kent C. Dodds",
  "Ken Wheeler",
);
expect(utils.getWinner).toHaveBeenNthCalledWith(
  2,
  "Kent C. Dodds",
  "Ken Wheeler",
);
```

## `jest.fn`

`jest.fn` internally is a function that has some nice properties for use:

- `mock`
  - `calls` - an array that holds all of the args that the function was called with

Last 3 assertions could be rewritten as one:

```ts
expect(utils.getWinner.mock.calls).toEqual([
  ["Kent C. Dodds", "Ken Wheeler"],
  ["Kent C. Dodds", "Ken Wheeler"],
]);
```

This could be implemented this way:

```ts
type MockFnType = { mock: { calls: any[] } };

function fn(impl) {
  const mockFn: MockFnType = (...args) => {
    mockFn.mock.calls.push(args);
    return impl(args);
  };
  mockFn.mock = { calls: [] }; // this implementation saves each call in the array
  return mockFn;
}

// usage
utils.getWinner = fn((p1, p2) => p1);
```

## `jest.spyOn`

We can use `jest.spyOn` to avoid keeping track of the original implementation (`const originalGetWinner = utils.getWinner`) and cleaning up after the test case (`utils.getWinner = originalGetWinner`) on our own.

```ts
jest.spyOn(utils, "getWinner"); // spying on the original implementation
utils.getWinner.mockImplementation((p1, p2) => p2);

utils.getWinner.mockRestore(); // cleanup
```

This could be implemented this way:

```ts
type MockFnType = {
  mock: { calls: any[] };
  mockImplementation: (any) => any;
};

function fn(impl = (args: any[]) => {}) {
  const mockFn: MockFnType = (...args: any[]) => {
    mockFn.mock.calls.push(args);
    return impl(args);
  };
  mockFn.mock = { calls: [] };
  mockFn.mockImplementation = (newImpl) => (impl = newImpl); // saving the mocked implementation
  return mockFn;
}

function spyOn(obj: any, property: string) {
  const originalProperty = obj[property]; // track original value, function

  obj[property] = fn();
  obj[property].mockRestore = () => (obj[property] = originalProperty); // adding a way to "release the mock"
}
```

Up to this point we still were doing something only just slightly more sophisticated to [[knowledge/javascript/testing/mocking|monkey-patching]]]. It works only because we're using CommonJS. In ES modules monkey patching does not work.

## `jest.mock`

`jest.mock` returns a mocked implementation of a whole module.

```ts
jest.mock('../utils', () => { // first arg: relative path to the mocked module
  // second arg: module factory function
  return {
      getWinner: jest.fn((p1, p2) => p1);
  }
});

// cleanup
utils.getWinner.mockReset();
```

`.mockReset()` will reset our mock function to the initial state clearing out the `calls`.

`jest.mock` works, because Jest is in control of the whole module system.

> [!tip] Jest hoists the `jest.mock` call to the top of the file, before imports.
>
> We don't have to do it manually.

This is how we can implement it on our own by using `require.cache`.

```ts
const utilsPath = require.resolve("../utils");

type MockFnType = {
  mock: { calls: any[] };
  mockImplementation: (any) => any;
};

function fn(impl = (...args: any[]) => {}) {
  const mockFn: MockFnType = (...args: any[]) => {
    mockFn.mock.calls.push(args);
    return impl(...args);
  };
  mockFn.mock = { calls: [] };
  mockFn.mockImplementation = (newImpl) => (impl = newImpl);
  return mockFn;
}

// @ts-ignore missing properties
require.cache[utilsPath] = {
  id: utilsPath,
  filename: utilsPath,
  loaded: true,
  exports: {
    getWinner: fn((p1, p2) => p1),
  },
};

delete require.cache[utilsPath]; // cleanup
```

This is something similar, yet simplified version of what Jest is doing.

## Mocking a module shared across the codebase

Use `__mocks__` directory.

```sh
$ tree
├── __mocks__
│   └── utils.ts
└── utils.ts
```

Then in test file:

```ts
jest.mock("../utils");
```

`jest` knows to pick up the path from **mocks** directory.
