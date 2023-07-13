---
title: traceroute
---

`traceroute` *traces the route* taken by the packets from your system to another host.

The purpose of a traceroute is to find the IP addresses of the routers or hops that a packet traverses as it goes from your system to a target host.

This command also reveals the number of routers between the two systems.

> [!note]
>
> The route taken by the packets might change as many routers use dynamic routing protocols that adapt to network changes.

```sh
# *nix
$ traceroute <IP>

# Windows
> tracert <IP>
```

There is no direct way to discover the path from your system to a target system. We rely on [icmp](knowledge/off-sec/glossary/icmp.md) to _trick_ the routers into revealing their IP addresses by using [ttl](knowledge/off-sec/glossary/ttl.md) in the IP header field.

## How it works?

On \*nix, `traceroute` will start by sending UDP datagrams within IP packets of `TTL=1`.

Thus, it causes the first router to encounter a `TTL=0` and send an ICMP Time-to-Live exceeded back. Hence, a TTL of 1 will reveal the IP address of the first router to you. Then it will send another packet with TTL=2; this packet will be dropped at the second router. And so on.

- The number of hops/routers between your system and the target system depends on the time you are running traceroute. There is no guarantee that your packets will always follow the same route, even if you are on the same network or you repeat `traceroute` within a short time.
- Some routers return a public IP address. You might examine a few of these routers based on the [sow](knowledge/off-sec/pentesting/sow.md).
- Some routers don’t return a reply.
