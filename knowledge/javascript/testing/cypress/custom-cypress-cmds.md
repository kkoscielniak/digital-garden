---
title: Custom Cypress commands
---

We can append commands to `cy` object with usage of _custom commands_. This can be used for making reusable assertions, making HTTP requests directly etc.:

```ts
// cypress/support/commands.js
Cypress.Commands.add("createUser", (overrides) => {
  const user = userBuilder(overrides);
  return cy
    .request({
      url: "http://localhost:3000/register",
      method: "POST",
      body: user,
    })
    .then(({ body }) => body.user);
});
Cypress.Commands.add("assertHome", () => {
  cy.url().should("eq", `${Cypress.config().baseUrl}/`);
});

Cypress.Commands.add("assertLoggedInAs", (user) => {
  cy.window().its("localStorage.token").should("be.a", "string");
  cy.findByTestId("username-display").should("have.text", user.username);
});
```

After that we can use `cy.createUser()`, `cy.assertHome()` and `cy.assertLoggedInAs()` to call them.

We can use `overrides` to override the default configuration.

## Command `subject`

If the command returns anything, we can get to this returned value in this way:

```ts
cy.createUser().then(user => /* [...] */)
```
