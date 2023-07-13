# Integration with non-React 3rd party libs

Example: jQueryUI

## Rules

- We should never change props and put children into `div`s that are used by 3rd party libs
  - never touch the minimal structure that's necessary for the 3rd party lib to run properly
    - the minimal structure also shouldn't malform any React stuff
  - they may become malformed by React
- We should always cleanup the 3rd party library in [[knowledge/react/class-component-lifecycle|componentWillUnmount]] to prevent memory leaks
- we should always create component that contains the external library (Blackbox-like, for the rest of the application)

## Resources

- [Exemplary Codepen](https://codesandbox.io/s/progressbarjui-ottpu?file=/src/index.js)
