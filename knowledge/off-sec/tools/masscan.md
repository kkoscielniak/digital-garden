---
title: masscan
---

`masscan` is a network scanning tool that uses a similar approach to discover the available systems that [Nmap](knowledge/off-sec/tools/nmap/nmap.md) uses. However, to finish its network scan quickly, Masscan is quite aggressive with the rate of packets it generates.

The syntax is quite similar: `-p` can be followed by a port number, list, or range:

- `masscan MACHINE_IP/24 -p443`
- `masscan MACHINE_IP/24 -p80,443`
- `masscan MACHINE_IP/24 -p22-25`
- `masscan MACHINE_IP/24 ‐‐top-ports 100`
