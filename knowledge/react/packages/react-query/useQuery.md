---
title: useQuery hook
---

A hook used to fetch data in [React Query](knowledge/react/packages/react-query/react-query.md).

Allows to control the state of the component depending on the retrieved data. Helps with caching and refetching the remote data as well.

## Example

You need a [QueryClient](/knowledge/react/packages/react-query/queryclient.md) configured and a _query function_ (a function that returns a [[knowledge/typescript/promise|promise]] that either resolves the data, or throws an error).

```jsx
import { View, Text } from "react-native-web";
import { Link } from "@react-navigation/native";
import { useQuery } from "react-query";
import { getBudgets } from "../queries/budgets";

const BudgetListingScreen = ({ navigation }) => {
  const {
    isLoading,
    data: responseData,
    isError,
    error,
  } = useQuery(`budgets`, getBudgets);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error: {error}</Text>;
  }

  const budgetData = responseData?.data;

  return (
    <>
      {budgetData.budgets.map((budget) => {
        const { id: budgetId, name } = budget;

        return (
          <Link
            key={budgetId}
            to={{
              screen: "BudgetDetails",
              params: { budgetId },
            }}
          >
            {name}
          </Link>
        );
      })}
    </>
  );
};
```

When making a request for the first time, `isLoading` is true until the the `data` is ready or an `error` occures.

The **unique key** in `useQuery(key, fn)` (_budgets_ in this case) is needed for fetching, caching and sharing the cached data throughout the application.

When using the query with the same key again, React Query returns the cached data first, fetches new dataset in the background and updates the UI only if the new dataset differs from the old one.

## Example with passing the parameters

There are few ways to pass the parameters to the query, but the preferred one is:

Given the query that has **an array as a query key**

```js
const { budgetId } = route.params;

const {
  data,
  /* [...] */
} = useQuery([`transactions`, budgetId], getTransactions);
```

You can access the particular keys from the `queryKey` property.

```js
export const getTransactions = async ({ queryKey }) => {
  const [_, budgetId] = queryKey; // this is taken from the query key array

  const { data } = await client.get(`/budgets/${budgetId}/transactions`);
  return data;
};
```

## Useful features

- It's possible to fetch data in one component and retrieve it from cache in another one just by using the same query key
- Running queries in parallel is possible with [useQueries](/https://react-query.tanstack.com/guides/parallel-queries#dynamic-parallel-queries-with-usequeries) hook
- You can make sequences of [dependent queries](/https://react-query.tanstack.com/guides/dependent-queries)
  - for example when the data obtained by one query is needed to run another one
- [pagination](/https://react-query.tanstack.com/examples/pagination), [load more](/https://react-query.tanstack.com/examples/load-more-infinite-scroll) and else

## Drawbacks

The counterintuitive part for me was why the cache gets purged on page refresh. There is an [experimental feature](/https://react-query.tanstack.com/plugins/createwebstoragepersistor) (as of v3.30.0) that should make the cache persistent, but either it didn't work because of its experimental status or I couldn't use it properly. To investigate when needed.

<!--
lastUpdated: 24 Nov 2021
-->
