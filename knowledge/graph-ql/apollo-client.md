---
title: Apollo Client
---

Theorethically to access data from GraphQL Server, we could use only use `fetch`.

However, [@apollo/client](https://www.apollographql.com/docs/react/) is way more convinient.

```js
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

import App from "./App";

const URL = "https://examples.devmastery.pl/random-stuff/graphql";

const client = new ApolloClient({
  cache: new InMemoryCache(),

  uri: URL,
});

const RANDOM_QUOTE_QUERY = gql`
  query getRandomQuote {
    randomQuote {
      text
      author
    }
  }
`;

client
  .query({ query: RANDOM_QUOTE_QUERY })
  .then((result) => console.log("Query result", result));
```

In React we also can use `<ApolloProvider />` and use `useQuery` hook instead of handling everything with promises and [prop-drilling](/knowledge/react/prop-drilling.md).
