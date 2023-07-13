---
title: apisauce
---

A wrapper around `axios`.

Has support for standarized errors + easy request/response transforms

You don't have to use `try..catch` blocks, as the [[knowledge/typescript/promise|promise]] is always resolved. Even if there's an error. Just check the `response.ok` and `response.problem`.

```ts
import { create } from 'apisauce';

const apiClient = create({
	baseURL: 'http://192.168.0.14:9000/api'
});

apiClient.get() // ...
```
