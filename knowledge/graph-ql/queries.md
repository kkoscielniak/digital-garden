---
title: GraphQL Queries
---

If we create such query:

```graphql
{
  greeting
  interestingUrls
  pi
  randomDiceThrow
}
```

We'll get data in such form:

```json
{
  "data": {
    "greeting": "Hello world!",
    "interestingUrls": ["https://kursreacta.pl", "https://64bites.com"],
    "pi": 3.141592653589793,
    "randomDiceThrow": 6
  }
}
```

The response retains the shape of the query (even the order of the field).

> [!danger] Explicite queries
>
> We cannot ask for a whole object without telling asking server for specific fields in the [[knowledge/graph-ql/typeDefs]]. If we want the whole object, we need to list all its fields first.

## Errors

If we'd ask for something that doesn't exist in schema:

```
{
	tau
}
```

We'd get an error response:

```json
{
  "errors": [
    {
      "message": "...",
      "locations": [
        {
          "line": 1,
          "column": 1
        }
      ],
      "extensions": {
        "code": "GRAPHQL_VALIDATION_FAILED"
      }
    }
  ]
}
```
