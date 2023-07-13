---
title: DNSDumpster
---

> [!note] DNS lookup tools, such as [nslookup](knowledge/off-sec/tools/nslookup.md) and [dig](knowledge/off-sec/tools/dig.md), cannot find subdomains on their own.

[DNSDumpster](https://dnsdumpster.com/) is an online servise that offers detailed information for DNS queries.

If we search DNSDumpster for `tryhackme.com`, we will discover the subdomain `blog.tryhackme.com`, which a typical DNS query cannot provide. DNSDumpster will return the collected DNS information in easy-to-read tables and a graph. DNSDumpster will also provide any collected information about listening servers.
