---
title: GraphQL Server
---

## Example

```js
const { ApolloServer, gql } = require("apollo-server");

// Query is a plain object with `greeting` property
const typeDefs = gql`
  type Query {
    greeting: String
    randomDiceThrow: Int
  }
`;

// if we pass rootValue which shape matches the typeDefs
// the server will handle the data out-of-the-box

// making `rootValue` a function ensures that data will be returned dynamically (and not calculated once and cached)
const rootValue = () => ({
  greeting: "Hello world!",
  randomDiceThrow: () => Math.ceil(Math.random() * 6),
});

const server = new ApolloServer({
  typeDefs, // type definitions for our server
  rootValue, // data
});

server.listen({ port: 5678 }).then((result) => {
  console.log(`Server listening on ${result.url}`);
});
```

## See also

- [typeDefs](/knowledge/graph-ql/typedefs.md)
