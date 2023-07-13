---
title: cy.request fn
---

We can use `cy.request(req)` to make HTTP calls directly from Cypress.

```ts
cy.request({
  url: "http://localhost:3000/register",
  method: "POST",
  body: user,
});
```

These requests are usually reusable and can be used as [custom-cypress-cmds](/knowledge/javascript/testing/cypress/custom-cypress-cmds.md).

Typically, `cy.request`s are faster than calling HTTP from within the tested app.
