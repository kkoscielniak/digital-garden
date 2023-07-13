---
title: Configuring Jest for testing JS applications
---

> This note goes through useful Jests features, without actually going to how to write tests.

## process .env .NODE_ENV

For testing `process .env .NODE_ENV === 'test'`. This can be used to enable `commonjs` modules in `babel` just for testing.

Jest picks up `.babelrc.js` automatically.

## Configuring Jest's test environment for testing `node` or browser code

Jest uses JS DOM module to simulate browser in `node`. Technically the `window` property is simulated in `node` environment.

We can customize Jest to _enforce_ Browser/`node` environment with:

```sh
jest -- --env="node" // this will exclude JS DOM from the environment
```

Including JS DOM in the test runner without actually having a code that relies on the browser APIs may negatively affect the runners performance.

This can also be handled in `jest.config.js`:

```js
module.exports = {
  testEnvironment: "jest-environment-node",
  // testEnvironment: 'jest-environment-jsdom' // <-- this works as well
};
```

These `testEnviroment`s are actually `node_modules`.

## Support CSS imports with `moduleNameMapper`

Importing styles is handled with `webpack` and `style-loader`, however this only works for the application itself. By default Jest will complain about importing CSS files, because it's not sure how to handle that imports.

What we want to do is to _mock_ the non-JS module (CSS being one) with `moduleNameMapper` option:

```js
// jest.config.js
module.exports = {
  moduleNameMapper: {
    "\\.css$": require.resolve("./test/style-mock.js"),
  },
};

// test/style-mock.js
module.exports = {};
```

## Support Webpack CSS modules with `identity-obj-proxy`

By just mocking the styles module with `moduleNameMapper` may result in skipping the `className` property (or, to be precise, the `class` attr) in rendered component (`style-mock.js` is an empty object, so `styles.exampleStyle` is `undefined`.

However, it may prove useful to add the `className` to the in-test rendered component for many purposes (eg handling the `classNames` logic).

If we’re using CSS modules with webpack, then we can improve our `moduleNameMapper` to include the css module property name in our tests using `identity-obj-proxy`:

```js
// jest.config.js
module.exports = {
  moduleNameMapper: {
    "\\.module.css$": "identity-obj-proxy",
  },
};

// test/style-mock.js
module.exports = {};
```

`identity-obj-proxy` returns the path that was accessed to resolve a particular module.

## Snapshot testing

If we'd like to test if the function returns a serializable value, we could just write:

```js
import { getFlyingSuperHeros } from "../super-heros";

test("returns returns super heros that can fly", () => {
  const flyingHeros = getFlyingSuperHeros();
  expect(flyingHeros).toEqual([
    { name: "Dynaguy", powers: ["disintegration ray", "fly"] },
    { name: "Apogee", powers: ["gravity control", "fly"] },
  ]);
});
```

However, at some point `flyingHeroes` might change, and when it'd happen, we'd need to figure out what changes in the object and to manually change the assertion in test case. This can be _semi-automated_ with _snapshot testing_:

```js
import { getFlyingSuperHeros } from "../super-heros";

test("returns returns super heros that can fly", () => {
  const flyingHeros = getFlyingSuperHeros();
  expect(flyingHeros).toMatchSnapshot();
});
```

This will make Jest to create a `<test-filename>.js.snap` file in which the most recent snapshot will live.

If the snapshot test fails (because the tested object was changed), we can update the snapshot with `jest -u` (_update_).

We may also use `toMatchInlineSnapshot` - in this case, the snapshot won't live in a separate file. Jest will pass the snapshot to the test file itself. Using `-u` flag will update the test file assertion.

This also works with serializing and snapshotting the DOM nodes. In such case it's great to use Prettier, to make sure the real HTML and snapshot HTML are formatted in the same manner.

## Custom Jest Snapshot Serializers

If we're using some custom UI Library, like `emotion`, we may see strange classes in our snapshots. It'd be more clear to see the clear CSS, instead of weird class names.

The general rule is to use custom Jest Snapshot Serializer.

For Emotion, this can be done with `@emotion/jest`:

```js
module.exports = {
  snapshotSerializers: ["@emotion/jest/serializer"],
};
```

## Custom Module Resolution with `moduleDirectories`

If we use Webpack's `resolve.modules` configuration to make common utils accessible across the application without relative paths, we need to emulate similar behavior in Jest. To do that, we use `moduleDirectories` configuration option:

```js
module.exports = {
  moduleDirectories: ["node_modules", path.join(__dirname, "src"), "shared"],
};
```

This will make Jest to look up the imported modules in `node_modules` and in `./shared`. No more relative paths.

## Configuring Jest to run setup for all tests before actual testing

To take care of test boilerplate and establish a good testing environment for our tests, we use the `setupFilesAfterEnv` option, together with e.g. `@testing-library/jest-dom`.

```js
// jest.config.js
module.exports = {
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
```

Note: `@testing-library/jest-dom/extend-expect` is a _script_. It could be any other boilerplate setup script out there.

## Watch Mode

Just use `jest --watch`. Preferably in `npm` script (eg. `test:watch`).

It uses `git` working copy to determine what files have changed.

Interactive Snapshots (`i`) are quite useful. It's also possible to filter by filename or test description (`p` and `t`).

### `--watchAll`

`jest --watchAll` will open `jest` in watch mode, but will run **all tests** every time any test file changes.

It's possible to make Jest to automatically run in watch mode in development environment and in _normal_ mode if it's in CI with `is-ci-cli` npm package:

```json
// package.json
{
  "scripts": {
    "test": "is-ci test:coverage test:watch",
    "test:coverage": "...",
    "test:watch": "..."
  }
}
```

## Connecting Jest to Node.js Debugger/Chrome DevTools

By default using the `debugger` keyword won't do anything. To run tests with Node.js debugger, we need:

```sh
node --inspect-brk <path_to_jest_binary> --runInBand // inspect break
```

`--runInBand` makes sure `jest` will run only in one `node` process (`jest` is spawning processes by default to fasten things up, but it may be forced to use one process - helpful for tests debugging).

Then we can connect the debugger with DevTools. The remote sessions available are from chrome://inspect/.

> [!tip] There also should be possible to use NodeJS button in DevTools upper left

## Using different configuration files

Let's say we have that set options differently (e.g. have different `testEnvironment`):

- `jest.common.config.js`
- `jest.server.config.js`
- `jest.client.config.js`

To make sure the different configuration files target different test files, we can set `testMatch` option:

```js
// jest.server.config.js
module.exports = {
  // rootDir: <if custom test file is not in `/`>
  testMatch: "./__tests__server__/**/*.test.js",
};
```

Then we need to use `jest --config jest.server.config.js`

This method would need us to maintain lots of `npm scripts`, since it's not possible to run multiple `watch` sessions at once

Allow to run multiple Jest configurations at once (and reduce the complexity of `npm scripts` by the way).

```js
module.exports = {
  ...require("./jest.common.config.js"),
  /* ... */
  projects: ["./jest.client.js", "./jest.server.js"],
};
```

> [!tip] The _project_ configurations can use `displayName` option to differentiate the output.

### Checking out the configuration

To display the whole resolved configuration use `jest --config`. The `globalConfig` states the configuration in the root `jest.config.js` file. It'll list also other options that **should be** configured in root config.

## Run ESLint with Jest

It's possible to change the `runner` which Jest will use - by default it uses `jest-runner`, but we can use e.g. `jest-runner-eslint` to lint the code that'll run `eslint` during evaluation of the project state through `yarn test`.

This may prove useful when it comes to organize the toolkit around the project especially when it comes to bigger, legacy projects (e.g. ones that weren't linted before, and we want to lint only the code that we changed - improving the code quality gradually).

## Test specific projects in Watch Mode

With `jest-watch-select-projects` plugin it's possible to specify which projects should be tested in `jest --watch`, similarly to how we select files for current tests run.

```js
module.exports: {
    watchPlugins: ['jest-watch-select-projects']
}
```

## Filtering tests ran with Typeahead support

> [!tip] Typeahead is similar of Intellisense, but non-proprietary

Thanks to `jest-watch-typeahead` plugins it's possible to add patternmatching to the tests filtering:

```js
module.exports: {
    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname']
}
```

## Run only relevant tests on Git commit hook

`husky` and `lint-staged` allow to configure the git hook to run tests only

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged && ..."
    }
  },
  "lint-staged": {
    "**/*.+(js|json|css|html|md)": [
      "prettier",
      "jest --findRelatedTests", // <-- This
      "git add"
    ]
  }
}
```

`jest --findRelatedTests` will find tests that are related to the files defined in `lint-staged`.
