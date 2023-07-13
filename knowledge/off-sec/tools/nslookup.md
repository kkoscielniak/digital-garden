---
title: nslookup
---

`nslookup` (Name Server Lookup) is a tool used to find details regarding DNS servers, including but not limited to IPs of particular computers, domain name or aliases.

```sh
$ nslookup <opts> <domain> <server>
```

- `opts`
  - query type (`-type=A|AAAA|CNAME|MX|SOA|TXT`)
- `domain` - domain name to look up
- `server` - DNS server to query
  - we can choose any local or public DNS server to query (e.g. Cloudflares `1.1.1.1` and `1.0.0.1` or Google's `8.8.8.8` and `8.8.4.4`)

## Example #1

For instance `nslookup` can be used to return all the IPv4 addresses used by tryhackme.com:

```sh
$ nslookup -type=A tryhackme.com 1.1.1.1
Server:		1.1.1.1
Address:	1.1.1.1#53

Non-authoritative answer:
Name:	tryhackme.com
Address: 172.67.69.208
Name:	tryhackme.com
Address: 104.26.11.229
Name:	tryhackme.com
Address: 104.26.10.229
```

In the example above, we started with one domain name, and we obtained three IPv4 addresses. Each of these IP addresses can be further checked for insecurities.

## Example 2

Let’s we you want to learn about the email servers and configurations for a particular domain:

```sh
user@TryHackMe$ nslookup -type=MX tryhackme.com
Server:		127.0.0.53
Address:	127.0.0.53#53

Non-authoritative answer:
tryhackme.com	mail exchanger = 5 alt1.aspmx.l.google.com.
tryhackme.com	mail exchanger = 1 aspmx.l.google.com.
tryhackme.com	mail exchanger = 10 alt4.aspmx.l.google.com.
tryhackme.com	mail exchanger = 10 alt3.aspmx.l.google.com.
tryhackme.com	mail exchanger = 5 alt2.aspmx.l.google.com.
```

We can see that tryhackme.com’s current email configuration uses Google. We should not expect the mail servers to be running a vulnerable server version. However, in other cases, we might find mail servers that are not adequately secured.

---

For more advanced DNS queries and additional functionality, we can use [dig](knowledge/off-sec/tools/dig.md).
