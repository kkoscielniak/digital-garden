---
title: Debugging tests in Cypress
---

To debug the test, we can use this `Promise` like syntax:

```tsx
describe("anonymous calculator", () => {
  it("can make calculations", () => {
    /* [...] */
    cy.findByText(/^\+$/)
      .then((subject) => {
        debugger;
        return subject;
      })
      // .pause()
      .click();

    /* [...] */
  });
});
```

If we call the `debugger` and have Dev Tools in Cypress opened, the test will pause and we're be redirected to Source tab in Dev Tools.

We also want to return the `subject` to maintain it through the chain of interactions.

`subject` is a jQuery node, btw.

We can also use `.pause()` to pause the execution without moving us to Dev Tools debugger. To resume the test, press ⏯️ in Cypress window.

`console.log`s go to Cypresses Dev Tools.

We could also mess with the Component code as well, as Cypress injects itself into `window`:

```tsx
function Calculator() {
  const [theme, setTheme] = useState();
  if (window.Cypress) {
    window.setTheme = setTheme;
  }
}
```

> [!danger] We need to keep in mind we want the tests to resemble **how the user would interact with the component**
>
> Probably the user won't use `window.setTheme` on his own. But this can help develop tests in the first place.
