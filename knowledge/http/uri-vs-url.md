---
title: URL vs URI
---

- `URL` - _Uniform Resource Locator_
  - formally `URLs` are a subset of `URI`s
- `URI` -

Nowadays they _are_ basically the same thing. There's a [RFC](https://datatracker.ietf.org/doc/html/rfc3305) explaining the differences, but...

In [[knowledge/http/http|http]] context `URL` is more common. That's it.

```
http://user:pass@example.com:8042/dir/file.php?param=value#anchor
```

In HTTP Requests `URLs` can be **absolute or** **relative**

- `/dir/test.php?param=value`
- `http://example.com:8042/dir/file.php?param=value#anchor`

::: tip Possible vulnerability
Some servers HTTP do whitelist the `Host` header but forget that the request might contain the host address.

**The host address in the URL takes precedence over the `Host` header**.

In such case server checks if `Host` is valid, yet later it uses the host address from the request. Think about that:

```http
GET /../../../../../../../../../etc/passwd HTTP/1.1
Host: target.com
```

(Apache/MS servers prevent that, but it's quite possible in IoT world)
[See more](https://portswigger.net/blog/cracking-the-lens-targeting-https-hidden-attack-surface)
:::

Using `user:pass@` directly [[knowledge/http/http|http]] request is not valid and usually might result in `400 Bad Request` - some servers allow such requests, though

`#anchor` and what comes after **isn't** sent to the server

URL is oftenly normalised by the browser - e.g. `folder/../` defaults to `/`
