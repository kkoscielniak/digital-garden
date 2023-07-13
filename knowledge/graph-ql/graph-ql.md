---
title: GraphQL
---

[_GraphQL_](https://graphql.org/learn/) (Graph Query Language) is a language used to create a data schema and to retrieve/edit that data. It's used to work with data relating to each other, built on top of a graph (e.g. books and authors and readers).

GraphQL Server defines schema and Client creates queries according to that schema. GraphQL Schema becomes a _contract_ between the server and the client.

In that manner, GraphQL is an alternative to REST (that doesn't handle graph data well).

GraphQL is not related to a particular technology (we can write code in any well-known language). As long as both server and client are written according to the [GraphQL specs](http://spec.graphql.org/), it should be fine.

It's useful to install [this extension](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo) to VS Code.

## Playgrounds

- [GraphQL Playground](https://examples.devmastery.pl/random-stuff/playground)
  - provides `curl` commands to use queries in CLI
- [GraphiQL](https://examples.devmastery.pl/random-stuff/graphiql)
- [Star Wars GraphQL API Explorer (Apollo Studio)](https://studio.apollographql.com/public/star-wars-swapi/explorer)
