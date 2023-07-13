---
title: Time To Live
---

`/* [...] */`

Although the T in TTL stands for time, TTL indicates the maximum number of routers (hops) that a packet can pass through before being dropped. Therefore, TTL is not a maximum number of time units.

When a router receives a packet, it decrements the TTL by one before passing it to the next router.

If the TTL reaches 0, it will be dropped, and an [icmp](knowledge/off-sec/glossary/icmp.md) `Time-to-Live exceeded` error message would be sent to the original sender.

> [!note] Some routers are configured not to send such ICMP messages when discarding a packet.
