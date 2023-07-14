---
title: QueryClient
---

## Example

```jsx
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

/* This needs to be outside of the React App */
const queryClient = new QueryClient({);

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			{/* ... */}
			<ReactQueryDevtools initialIsOpen /> {/* optional but useful */}
		</QueryClientProvider>
	);
};

export default App;
```

## Useful methods

- `invalidateQueries([key])` - makes the query/queries with a given key invalid, forcing React Query to fetch that data again. Can be used in [useMutation](/knowledge/react/packages/react-query/usemutation.md) hook -> `onSuccess` method.
- `setQueryData` - used for [[knowledge/others/optimistic-updates|optimistic-updates]] of the query's cached data
- `prefetchQuery` - allows to fetch data earlier than it's needed
  - e.g. to improve UX
- `clear` - clears all connected caches 🤷‍♂️

## `useQueryClient` hook

Allows to assign the present `QueryClient` to a variable when needed.

```js
import { useQueryClient } from "react-query";

const queryClient = useQueryClient();

/* ... */
queryClient.clear();
```
