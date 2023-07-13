---
title: useMutation hook
---

Used to update/create/delete data. Provides the `mutate` function that takes the parameters. Returns the status of our API call.

The status can be

- `idle`
- `loading` for the currently running mutation
- `error` when encountered
- `success`

## Example

```js
const addTransaction = async ({ budgetId, payee, value, accountId }) => {
  const { data } = await client.post(`/budgets/${budgetId}/transactions`, {
    transaction: {
      payee_name: payee,
      amount: value,
      date: "2021-09-01",
      account_id: accountId,
    },
  });
  return data;
};

/* ... */

const { isLoading, isError, mutate } = useMutation(addTransaction);

/* ... */

mutate({
  budgetId,
  payee: payeeText,
  value: valueText,
  accountId: selectedAccountId,
});
```

## Request Retries

You can pass the `retry` option with the number of times React Query should retry the mutation **after reconnection**.

```js
const mutation = useMutation(addArticle, { retry: 3 });
```

## Methods inside of `useMutation` options

- `onMutate` - fires before `useMutation`. Useful when you want to run [[private/v1/Coding/Glossary/Optimistic updates|Optimistic updates]] on local cache and update data on the UI side before updating them on the server.
- `onSuccess` - fires when the mutation is successful
- `onError` - fires when the mutation encounters an error
  - a common practice is to set cache to previous data in such case
