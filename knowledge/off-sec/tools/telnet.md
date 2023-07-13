---
title: Telnet
---

> The _TELNET_ (Teletype Network) protocol was developed in 1969 to communicate with a remote system via a CLI.

The command `telnet` uses the TELNET protocol for remote administration that relies on [[knowledge/off-sec/tools/nmap/tcp-header|TCP]]. The default port used by telnet is `23`.

`telnet` is **not secure**. It sends all the data, including usernames and passwords, **in plaintext**, making it easy to steal the login credentials. The secure alternative is SSH.

`telnet`, with its simplicity, can be used for other purposes. We can connect to any service running on TCP to grab its banner and even exchange a few messages unless it uses encryption.

## Example

We want to discover more information about a web server at port 80.

We connect to the server at `:80`, and then we communicate using the HTTP protocol by issuing:

```sh
pentester@TryHackMe$ telnet MACHINE_IP 80

Trying MACHINE_IP...
Connected to MACHINE_IP.
Escape character is '^]'.
GET / HTTP/1.1
host: telnet

HTTP/1.1 200 OK
Server: nginx/1.6.2
Date: Tue, 17 Aug 2021 11:13:25 GMT
Content-Type: text/html
Content-Length: 867
Last-Modified: Tue, 17 Aug 2021 11:12:16 GMT
Connection: keep-alive
ETag: "611b9990-363"
Accept-Ranges: bytes

...
```

Of particular interest for us is discovering the type and version of the installed web server, `Server: nginx/1.6.2`.
