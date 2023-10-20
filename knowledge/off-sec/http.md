---
title: HTTP
---
## methods
- HTTP methods don't have to be called `UPPERCASE`
	- `PUT` might be disabled. `pUt` not necessarily

### `GET`
### `POST`
### `PUT`
- allows to create files on the server
	- by creating an, e.g. PHP file on the server we might basically execute any code there
- might be disabled by default
- 
### `PATCH`
### `DELETE`

### `HEAD` 
- Returns response headers that would be sent by the server if the `GET` request would be called on same URL
	- Returns **no response `body`**
- Useful for locating hidden files on the server (by [[brute force]])
	- Simple test is faster since server has less bytes to send back

::: tip
`200 OK` doesn't necessarily mean everything's fine. Server might return `200 OK` and inform us about the problem in `body`. 
:::

### `OPTIONS`
- Indicates methods available on this server or endpoint
	- `OPTIONS /test.php HTTP/1.1` -> endpoint
	- `OPTIONS * HTTP/1.1` -> server
	- The returned value **might not be true**

## See also
- [[uri-vs-url]]

