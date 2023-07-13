---
title: Caching in Apollo Client
---

_Caching_ is enabled by default in [[knowledge/graph-ql/apollo-client|apollo-client]]. Occasionally it may provide erroneous responses.

## queryDeduplication

Apollo Client by default dedupes the queries if the same query is used subsequentially in very short periods of time. We can disable it with:

```js
const client = new ApolloClient({
  // ...
  queryDeduplication: false,
});
```

## fetchPolicy

We can turn caching off for particular queries with:

```js
const { data, loading, error, refetch } = useQuery(RANDOM_QUOTE_QUERY, {
  fetchPolicy: "no-cache",
});
```
