---
title: Port
---

A TCP or UDP _port_ is used to identify a network service running on the host. A server provides the network service, and it adheres to a specific network protocol.

TCP and UDP ports are not related to each other. TCP ports are interpreted by the TCP stack, while the UDP stack interprets UDP ports.

No more than one service can listen on any TCP or UDP port (on the same IP address).

A port is usually linked to a service using that specific port number, eg:

## TCP

| Port | Service |
| ---- | ------- |
| 22   | SSH     |
| 53   | DNS     |
| 80   | HTTP    |
| 443  | HTTPS   |

## UDP

| Port | Service |
| ---- | ------- |
| 53   | DNS     |
