# `axios`

[[knowledge/typescript/fetch|fetch]] is available everywhere, but it's not convenient in use.

`axios` is more convenient.

```js
import axios from "axios";
window.axios = axios;
```

`response.data` isn't ReadableStream. Data is parsed already. It will also throw an exception once the request failed (we don't have to handle it on our own).

## Useful stuff

`onUploadProgress`
