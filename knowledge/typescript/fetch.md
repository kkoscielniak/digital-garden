---
title: Fetch API
---

## Response

`response.body`: ReadableStream
`response.json()`: parsed stream

> 💡The stream can be read only once (`response.json()` can be used only once). To read the stream again, it needs to be fetched again

## Error handling

If the URL is wrong, `response.ok` will be `false` and `response.status` will be `404` but no error will be thrown by Fetch API.

But any other kind of issue with networking will throw an error. (`ERR_CONNECTION_REFUSED`)

## `POST`

JSON needs to be stringified, header needs to be set properly.

## Additional resources

- [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)

## Example

```ts

partiallyUpdateTimebox: async function (timeboxToPatch) {
	if (!timeboxToPatch.id) {
		throw new Error("Timebox has to have an id to be updated");
	}
	const response = await makeRequest(
		`${BASE_URL}/${timeboxToPatch.id}`,
		"PATCH",
		timeboxToPatch
	);
	const patchedTimebox = await response.json();
	return patchedTimebox;
};


searchTimeboxes: async function (query) {
	const response = await makeRequest(`${BASE_URL}/?q=${query}`, "GET");
	const timeboxes = await response.json();
	return timeboxes;
}

```
