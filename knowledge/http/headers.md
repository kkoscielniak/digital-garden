---
title: HTTP Headers
---

::: warning
Request headers and response headers **are not the same things**.
Some might have same name though, think `Content-Type`.
:::

## `Host`

**Necessary in HTTP 1.1**.

HTTP communication:

- we provide address
- we're asking DNS for target `IP`
- we connect to `IP:80` and send request with `Host: target.com` header
- for this header we can use other address, even the one we don't have in DNS
  - this could be used to locate hidden virtual domains
  - [ ] read more about that

Could be used to find [[knowledge/off-sec/pentesting/ssrf|SSRF]].

Might contain addresses in `IPv6` that cause erroneous behavior

- [ ] Read more about that

::: tip vuln
Attacker **who knows the Target's email** initiates the Password Reset, but comes to `/password-reset` with `Host: another-site.com`.

The vulnerable application uses `Host` to generate Password Reset Link. The link is sent to the Target.

The Target clicks in link and the one-use token is probably sent to `another-site.com`.

- [Report #281575 - Password reset link injection allows redirect to malicious URL @ HackerOne](https://hackerone.com/reports/281575)
- [Report #226659 - Password Reset link hijacking via Host Header Poisoning @ HackerOne](https://hackerone.com/reports/226659)
- [Don't Trust the Host Header for Sending Password Reset Emails | Lightning Security](https://lightningsecurity.io/blog/host-header-injection/)
  :::

## request

### `Referer`

::: warning
Yep, it's `Referer` not `Referrer`...
:::

Contains the full URL of the site that we've been on before clicking the URL (the _current_ site's URL). Some servers log `Referer` values by default. The logged URL might contain some sensitive data (session ID, password reset token, full url to Allegro.pl erotic stuff category) that would be logged. **Data leak**. - https://www.ezequiel.tech/p/10k-host-header.html

::: tip
Tokens in URL should be of **one use only**
:::

::: warning
If target uses HTTPS, the `Referer` value will be sent if the _current_ page is also HTTPS.
:::

### `Referrer-Policy`

::: warning
...and here it's `Referrer`.

Use `Referrer-Policy: no-referrer` not to send `Referer` header.

### `Cookie`

Sends a cookie or cookies to the server.

### `X-Forwarded-For`

An exceptionally interesting header with the potential to breach security.

## response

### `Strict-Transport-Security` (response header)

One of the headers that can directly increase the security of an application.

### `Location` (response header)

Implements client redirection to another address.

### `Set-Cookie` (response header)

Sets a cookie to the client.

### `Server` (response header)

Sometimes reveals the type/version of the used HTTP server.
