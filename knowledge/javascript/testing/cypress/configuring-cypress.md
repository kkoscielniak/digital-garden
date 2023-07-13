---
title: Fundamentals of testing with Cypress and Testing Library
---

Cypress is a tool for E2E testing.

Internally Cypress is an application that runs natively on the computer, but is installed via `npm`/`yarn`.

To open Cypress application we use `cypress open`. We don't need the application to run tests, we can default to running them in CLI (headless mode), via `cypress run`.

## Configuring Cypress

```json
// cypress.json
{
  "baseUrl": "http://localhost:8080",
  "integrationFolder": "cypress/e2e", // where the test files lie
  "viewportHeight": 900,
  "viewportWidth": 400
}
```

> [!tip] The configuration can be viewed from `cypress open`
>
> Check out the settings tab to see what options were set and where exactly (`cypress.json`, ENV etc.)

### Enabling `cypress` in `eslint`

```tsx
module.exports = {
  /* [...] */
  root: true,
  plugins: ["eslint-plugin-cypress"],
  extends: ["plugin:cypress/recommended"],
  env: { "cypress/globals": true },
  /* [...] */
};
```

It's also useful to add `cypress/videos` and `cypress/screenshots` to `.gitignore`.

## Installing Cypress Testing Library

```
yarn add -D @testing-library/cypress
```

```tsx
// cypress/support/index.js

import "@testing-library/cypress/add-commands";
/* [...] */
```

This adds `findBy`/`getBy`... methods to `cy` object.

## Scripting Cypruss for local development and CI

By default we need to run the application in the background for the tests to run. Also, we want to default to `cypress run` for CI.

For that kind of setup we can use `start-server-and-test` package. `is-ci-cli` package is also useful for determining in which environment we want to run `cypress`.

```json
{
  /* [...] */
  "scripts": {
    "cy:run": "cypress run",
    "cy:open": "cypress open",
    "test:e2e": "is-ci \"test:e2e:run\" \"test:e2e:dev\"",
    "pretest:e2e:run": "npm run build",
    "test:e2e:run": "start-server-and-test start http://localhost:8080 cy:run",
    "test:e2e:dev": "start-server-and-test dev http://localhost:8080 cy:open",
    /* [...] */

    "dev": "/* [...] */",
    "start": "/* [...] */",
    "setup": "npm install"
    /* [...] */
  }
}
```

> [!tip] Btw, `npm` has `pre<scripts>` 👌
>
> Every script named `pre<other-script>` where `other-script` is an existing `npm` script will run **before** that `other-script`.

We could set up `husky:precommit` to run E2E tests, but as the project grows, the tests would need lot of time to go through the tests, so it's better to rely on CI for these.

```yml
# .travis.yml

# [...]
addons:
  apt:
    packages:
      - libgconf-2-4
cache:
  directories:
    - ~/.npm
    - ~/.cache
script: npm run setup
```
