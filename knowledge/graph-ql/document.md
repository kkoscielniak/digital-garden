---
title: GraphQL Document
---

The queries written in one file are called a _GraphQL Document_:

```graphql
query GetSomeRandomStuff {
  greeting
  pi
  randomDiceThrow
  interestingUrls
}

query GetGreeting {
  greeting
}
```

To get data from the server we need to define which query we want to run.

Named queries also can help with debugging if the responses are wrong/erroneous.
