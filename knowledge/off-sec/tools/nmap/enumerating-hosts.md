---
title: Enumerating hosts
weight: 1
---

Before we scan the live targets, we need to specify them. Generally, we provide a list, a range, or a subnet. Examples of target specification are:

- list: `10.11.12.15 scanme.nmap.org example.com` - will scan 3 IP addresses.
- range: `10.11.12.15-20` - 6 IP addresses
  - `nmap -sL -n 10.10.0-255.101-125` - 6400 IPs lol
- subnet: `10.11.12.15/30` - 4 IP addresses
- list of targets: `nmap -iL list_of_hosts.txt` - as many as in the list

`nmap -sL list_of_hosts.txt` will give a detailed lists of hosts to scan without actually scanning them with reverse-DNS resolution on all targets to obtain their names (unless blocked with `-n`).
