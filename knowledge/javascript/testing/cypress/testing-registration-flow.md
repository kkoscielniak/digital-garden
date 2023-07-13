---
title: Testing registration flow in Cypress
---

With E2E testing, there might be a situation we want to test a form by providing some data. However, the data we provided may already exist in the database.

We could cleanup the DB for testing before each test, but this may be troublesome (or even not possible at all).

We can create the `userBuilder()` fn in `support/generate.ts` that uses `test-data-bot`:

```ts
// support/generate.ts
import { build, fake } from "test-data-bot";

const userBuilder = build("User").fields({
  username: fake((f) => f.internet.userName()),
  password: fake((f) => f.internet.password()),
});

export { userBuilder };
```

```ts
// cypress/e2e/register.ts
import { userBuilder } from "../support/generate";

describe("registration", () => {
  it("should register a new user", () => {
    // given
    const user = userBuilder();
    // when
    cy.visit("/");
    cy.findByText(/register/i).click();
    cy.findByLabelText(/username/i).type(user.username);
    cy.findByLabelText(/password/i).type(user.password);
    cy.findByText(/submit/i).click();
    // then
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    cy.window().its("localStorage.token").should("be.a", "string");
    cy.findByTestId("username-display").should("have.text", user.username);
  });
});
```

## Simulate HTTP errors in Cypress

We need to intercept HTTP request in Cypress with `cy.server()` and `cy.route()`.

```ts
it(`should show an error message if there's an error registering`, () => {
  cy.server();
  cy.route({
    method: "POST",
    url: "http://localhost:3000/register",
    status: 500,
    response: {},
  });
  cy.visit("/register");
  cy.findByText(/submit/i).click();
  cy.findByText(/error.*try again/i);
});
```
