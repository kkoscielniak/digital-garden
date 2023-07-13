# `React.useRef` hook

Allows to create references to functional components, so we can use them in side effects and events.

```js
const emailInput = useRef();

...

<input ref={emailInput} />
```

We can even keep `timeoutId` in references by assigning the value. Even though this looks a bit strange:

❗️ Reference variables live for the whole component's lifecycle and keeps its value between rerenders.

## Example

```js
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
function SignUpForm({ isVisible, onSignup }) {
  const emailInput = useRef();
  useEffect(() => {
    if (isVisible) {
      emailInput.current.focus();
    }
  }, [isVisible]);
  return (
    <form style={{ display: isVisible ? "block" : "none" }}>
      <label>
        Email
        <input ref={emailInput} />
      </label>
      <br />
      <button onClick={onSignup}>Sign up</button>
    </form>
  );
}
function App() {
  const [isSignUpFormVisible, setSignUpFormVisibility] = useState(false);
  const timeoutId = useRef();
  useEffect(() => {
    timeoutId.current = setTimeout(() => setSignUpFormVisibility(true), 3000);
    return () => {
      clearTimeout(timeoutId.current);
    };
  }, []);
  return (
    <div className="App">
      <SignUpForm
        isVisible={isSignUpFormVisible}
        onSignup={(event) => {
          event.preventDefault();
          setSignUpFormVisibility(false);
          clearTimeout(timeoutId.current);
        }}
      />
      <button onClick={() => setSignUpFormVisibility((prev) => !prev)}>
        Show sign up form
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```
