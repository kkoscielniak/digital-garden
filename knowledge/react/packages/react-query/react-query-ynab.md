---
title: Demo of React Query + YNAB
---

I am an YNAB heavy user. While learning [[knowledge/react/packages/react-query/react-query|React Query]] I decided to create a demo that uses [YNAB API](https://api.youneedabudget.com/v1). This file describes the high-level process of the demo development and my findings.

The full code is [here](https://github.com/kkoscielniak/react-query-ynab). I've also added links to particular files/commits (denoted as 📄).

## Assumptions

- relying on React Query as much as possible
- very basic. Two queries, one mutation. _Enough is enough_.
- using React Navigation for simplicity
- diching the styling

## Log

### Initial configuration

I've decided to use `create-react-app` just for the sake of simplicity.

I've created an API client ([📄](https://github.com/kkoscielniak/react-query-ynab/blob/main/src/queries/apiclient.js)) for YNAB using `apisauce` and added first _query_ ([📄](https://github.com/kkoscielniak/react-query-ynab/blob/main/src/queries/budgets.js)) (a function that fetches budgets from YNAB; `getBudgets`).

Then I've created a `BudgetSelectionScreen` ([📄](https://github.com/kkoscielniak/react-query-ynab/blob/main/src/screens/budgetselectionscreen.js)) (In YNAB you can keep tabs on several budgets with one subscribtion and I wanted to use a testing one anyway).

### Adding queries

I configured the [QueryClient](/knowledge/react/packages/react-query/queryclient.md) ([📄](https://github.com/kkoscielniak/react-query-ynab/blob/main/src/app.js)) and with [useQuery](/knowledge/react/packages/react-query/usequery.md) hook I utilised the `getBudgets` query from before and rendered links to a details screen ([📄](https://github.com/kkoscielniak/react-query-ynab/blob/main/src/app.js)).

I moved the app to React Native Web to be able to [use React Navigation](https://reactnavigation.org/docs/web-support/). I've added `BudgetDetailsScreen` and passed the selected `budgetId` to it via props.

In the meantime I learned the [QueryClient](/knowledge/react/packages/react-query/queryclient.md) shouldn't live inside the React App so I moved it outside ([📄](https://github.com/kkoscielniak/react-query-ynab/commit/451565cc19bf76038d67c7ff0d320b618097e804)) (and added useful React Query Devtools) ([📄](https://react-query.tanstack.com/devtools)).

Then I've added another query ([📄](https://github.com/kkoscielniak/react-query-ynab/blob/22b20426777db5f58d3f0a723deaafc881494524/src/queries/transactions.js)) for fetching the transactions for a given `budgetId`. This is where I learned about [preferred way of passing parameters](/knowledge/react/packages/react-query/usequery.md#example%20with%20passing%20the%20parameters) to the queries. Ultimately I rendered the transactions.

### Adding mutation

I wanted to have a way of adding the transactions to my YNAB budget. In React Query it's done with [useMutation](/knowledge/react/packages/react-query/usemutation.md) hook.

I've created a separate component ([📄](https://github.com/kkoscielniak/react-query-ynab/blob/main/src/components/addtransaction.js)) for the _Add Transaction form_ that had 2 inputs (_Payee_ and _Amount_) and a button that ran the mutation.

### Invalidating the cached query

Lastly, I wanted to make sure the transactions the I see in my little app reflect the ones that are, in fact, in my budget. To do that I **just** needed to invalidate the query created 2 paragraphs above.

To do that I just needed to call the `invalidateQueries` [method](/knowledge/react/packages/react-query/queryclient.md#useful%20methods|method) of the `QueryClient` in the `onSuccess` [callback](/knowledge/react/packages/react-query/usemutation.md#methods%20inside%20of%20usemutation%20options|callback) of the mutation ([📄.](https://github.com/kkoscielniak/react-query-ynab/commit/1dc7c9ebb37d2736f48c9c4bb07963aa712d5d76)).

And that's it. Honestly? It was great.

## Conclusions

It was a breeze. I didn't know this library before and right now I think it'll be my preferred way of handling the state of the remote servers. I just scratched the surface and yet I was able to quickly create a pretty neat demo that is performant and features-rich. And the best part is that I didn't have to think of how to develop those features. Nicely done, Tanner 🙌.
