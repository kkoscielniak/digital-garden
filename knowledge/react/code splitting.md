# Code Splitting

_Code splitting_ is an optimisation technique in [React](knowledge/react/react.md). It's splitting the application into chunks that are loaded upon request (whenever they are needed). 

Like every advanced optimisation technique it's wise to use it sparingly. Too many chunks mean the app needs to make too many requests for them which may render the app slower than intended.

## Webpack 
Webpack bundles all the files into one or more compressed and minified JS files.

By default `create-react-app` configures webpack that the code is returned in several files.

- `bundle.js` - minified webpack code that loads all the rest
- `x.chunk.js` - libs that are used by our app/lazy components
- `main.chunk.js` - our app
- `main.<uuid>.[...].js` - code that is hot-reloaded

## Asynchronous importing

```js
import("inspirational-quotes")
  .then((Quotes) => {
    this.setState({ quote: Quotes.getQuote() });
  })
  .catch((error) => console.error("Error!", error.message));
```

[[knowledge/react/react.lazy()]] & [[knowledge/react/react.Suspense]]
