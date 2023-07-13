---
title: netcat
---

`nc` has different applications that can be of great value to a pentester.

It supports both TCP and UDP protocols.

It can function as a client that connects to a listening port or as a server that listens on a port of our choice. We can use it as a simple **client** **or server** over TCP or UDP.

## Connecting to the server

We can connect to a server, similarly to how [telnet](knowledge/off-sec/tools/telnet.md) connection is made, to collect servers banner:

```sh
$ nc MACHINE_IP 80
GET / HTTP/1.1
host: netcat

HTTP/1.1 200 OK
Server: nginx/1.6.2
Date: Tue, 17 Aug 2021 11:39:49 GMT
Content-Type: text/html
Content-Length: 867
Last-Modified: Tue, 17 Aug 2021 11:12:16 GMT
Connection: keep-alive
ETag: "611b9990-363"
Accept-Ranges: bytes
# ...
```

Based on the server banner we can tell that on port 80, we have `nginx@1.6.2` listening for incoming connections.

## Opening a port for listening

We can use netcat to listen on a TCP port and connect to a listening port on another system.

On the server, where we want to open a port and listen on it, we can issue:

```

nc -lp 1234
# or
nc -v -n -l -p 1234
```

to open `nc` in:

- `-l` - listening mode
- `-p` - at port 1234
- `-n` - in _numeric only_ way; without resolving hostnames via DNS
  - it will avoid dns lookups and warnings making us a bit _safer_
- `-v` - verbose output (`-vv` for _very_ verbose)
- `-k` (optional) - keeping listening after the client disconnects

Ports less than 1024 need `root` privileges to listen on

### Talking to open port 1234

On the *client*-side, we would issue:

```sh
$ nc MACHINE_IP 1234
```

After you successfully establish a connection to the server, whatever you type on the client-side will be _echoed_ on the server-side and vice versa.

This means that whatever we type on one side to the other side of the TCP tunnel.
