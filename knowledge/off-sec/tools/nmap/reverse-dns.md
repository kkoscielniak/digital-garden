---
title: Reverse DNS lookup
weight: 3
---

Nmap’s default behaviour is to use reverse-DNS **online** hosts. Because the hostnames can reveal a lot, this can be a helpful step.

If you don’t want to send such DNS queries, you use `-n` to skip this step.

We can also use the option `-R` to query the DNS server even for offline hosts.
If we want to use a specific DNS server, we can add the `--dns-servers DNS_SERVER` option.
