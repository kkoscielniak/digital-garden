---
title: ICMP
customHeader: true
---

# Internet Control Message Protocol

`/* [...] */`

IMCP supports many types of queries.

In [[knowledge/off-sec/tools/ping|ping]] we're relying on `ping` (`IMCP echo/type 8`) and `ping reply` (`IMCP echo reply/type 0`). If we want to ping a system on the same subnet, an [[knowledge/networks/address-resolution-protocol|address-resolution-protocol]] query should precede the `ICMP Echo`.
