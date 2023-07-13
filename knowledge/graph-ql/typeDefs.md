---
title: typeDefs
---

`typeDefs` is a _contract_ between the client and the [[knowledge/graph-ql/server]], stating that, eg. the server can return data about `greeting` that's of type `String`:

```js
const { gql } = require("apollo-server");
const typeDefs = gql`
  type Query {
    greeting: String
    interestingUrls: [String]
  }
`;
```

This way the server **guarantees** the data shape.

## type Query

In GraphQL it is **==mandatory==** to create root type named `Query`. We can rename it, but then we'd need to redefine a schema as well:

```js
const { gql } = require("apollo-server");

const typeDefs = gql`
  schema {
    query: RenamedQuery
  }

  type RenamedQuery {
    greeting: String
    interestingUrls: [String]
  }
`;
```

## Supported types

### Scalars

- `String`
- `Int`
- `Float`
  - GraphQL differentiates integers and floating points (as opposed to JS which treats both as `Number`)
- `Boolean`
- `Id`
  - basically a `String`, but has different purposes
- `[String]`

### Enums

```graphql
enum DayOfWeek {
  MON
  TUE
  WED
  THU
  FRI
  SAT
  SUN
}

type Query {
  today: DayOfWeek
}
```

In [[knowledge/graph-ql/graph-ql|GraphQL]] enums are `String`s (not `Integer`s as in C++).

### Object types

We cannot create nested types like in TypeScript - we need to define flat types and reuse them later:

```graphql
type Quote {
  text: String!
  author: String!
}

type Query {
  randomQuote: Quote!
}
```

> [!danger] Use of `PascalCase` is mandatory for every type in GraphQL.

## non-nullable

If we won't provide value, GraphQL Server returns `null`. We can enforce returned value with `!` (making type _non-nullable_):

```graphql
type Query {
  today: DayOfWeek!
}
```

### In arrays

```graphql
type Query {
	workDays1: [DayOfWeek!] // GraphQL returns error if any of the array elements is `null`
	workDays2: [DayOfWeek]! // GraphQL returns error if the array is missing
	workDays3: [DayOfWeek!]! // both cases will cause an error
}

```

Empty array is a **valid** one.

> [!tip] Always make values non-nullable
>
> nullable types should be used only in specific cases.
