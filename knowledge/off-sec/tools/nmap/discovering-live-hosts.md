---
title: Discovering live hosts with Nmap
weight: 2
---

We will leverage the protocols to discover the live hosts.

- [[knowledge/networks/address-resolution-protocol|ARP]] from Data-link Layer
  - [[knowledge/off-sec/tools/nmap/host-discovery-using-arp]]
- [[knowledge/off-sec/glossary/icmp]] from Network Layer
  - [[knowledge/off-sec/tools/nmap/host-discovery-using-icmp]]
- TCP or UDP from Transport Layer
  - [[knowledge/off-sec/tools/nmap/host-discovery-using-tcp]]

Although TCP and UDP are transport layers, for network scanning purposes, a scanner can send a **specially-crafted** packet to common TCP or UDP ports to check whether the target will respond. This method is efficient, especially when `ICMP Echo` is blocked.

## Approaches to discover hosts

When no host discovery options are provided, Nmap follows the following approaches to discover live hosts:

1.  When a *privileged* user tries to scan targets on a local network (_Ethernet_), Nmap uses [[knowledge/networks/address-resolution-protocol|ARP]] requests. A privileged user is `root` or a user who belongs to *sudoers*.
2.  When a *privileged* user tries to scan targets outside the local network, Nmap uses [[knowledge/off-sec/glossary/icmp]] `echo` requests, TCP ACK (Acknowledge) to port 80, TCP SYN (Synchronize) to port 443, and ICMP `timestamp` request.
3.  When an *unprivileged* user tries to scan targets outside the local network, Nmap resorts to a TCP 3-way handshake by sending SYN packets to ports 80 and 443.

Nmap, by default, uses a ping scan to find live hosts, then proceeds to scan live hosts only.

If you want to use Nmap to discover online hosts without port-scanning the live systems, we can issue:

```sh
nmap -sn TARGETS
```

## Types of ICMP Requests

We can make Nmap to use ICMP requests with these flags:

- `-PP` - timestamp
- `-PM` - address mask
- `-PE` - echo
