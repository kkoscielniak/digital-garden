---
title: Testing login flow in Cypress
---

The simplest form of testing the login flow would be to make Cypress register, login and logout several times:

```ts
import { userBuilder } from "../support/generate";
describe("login", () => {
  it("should login an existing user", () => {
    const user = userBuilder();

    cy.visit("/");
    cy.findByText(/register/i).click();
    cy.findByLabelText(/username/i).type(user.username);
    cy.findByLabelText(/password/i).type(user.password);
    cy.findByText(/submit/i).click();
    cy.findByText(/login/i).click();
    cy.findByLabelText(/username/i).type(user.username);
    cy.findByLabelText(/password/i).type(user.password);
    cy.findByText(/submit/i).click();
    cy.findByText(/logout/i).click();
  });
});
```

But we are a bit of overtesting here. We have a very similar flow to the one presented in [testing-registration-flow](/knowledge/javascript/testing/cypress/testing-registration-flow.md). If there would be an error, we'd have it visible in many test cases, which might obscure where the issue really occures. Also, it makes Cypress to run longer.

We can make Cypress to handle the `/login` request for us with [cy-request-fn](/knowledge/javascript/testing/cypress/cy-request-fn.md) as a [custom command](/knowledge/javascript/testing/cypress/custom-cypress-cmds.md).

```ts
describe("login", () => {
  it("should login an existing user", () => {
    cy.createUser().then((user) => {
      cy.visit("/");
      cy.findByText(/login/i).click();
      cy.findByLabelText(/username/i).type(user.username);
      cy.findByLabelText(/password/i).type(user.password);
      cy.findByText(/submit/i).click();
      cy.findByText(/logout/i).click();
      cy.findByText(/login/i).click();
      cy.findByLabelText(/username/i).type(user.username);
      cy.findByLabelText(/password/i).type(user.password);
      cy.findByText(/submit/i).click();
      cy.findByText(/logout/i).click();
    });
  });
});
```
