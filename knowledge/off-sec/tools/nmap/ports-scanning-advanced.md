---
title: Advanced Port Scanning with NMap
weight: 5
---

Some of these scan types can be useful against specific systems or in particular network setups.

## Null Scan (-sN)

The _null scan_ does not set any flag (all six flag bits in [tcp-header](knowledge/off-sec/tools/nmap/tcp-header.md) are set to zero).

A TCP packet with no flags set will not trigger any response when it reaches an open port. From Nmap’s perspective, a lack of reply in a null scan indicates that either the port is open or a firewall is blocking the packet.

We expect the target server to respond with an RST packet if the port is closed.

```sh
$ sudo nmap -sN MACHINE_IP

Starting Nmap 7.60 ( https://nmap.org ) at 2021-08-30 10:30 BST
Nmap scan report for MACHINE_IP
Host is up (0.00066s latency).
Not shown: 994 closed ports
PORT    STATE         SERVICE
22/tcp  open|filtered ssh
25/tcp  open|filtered smtp
80/tcp  open|filtered http
110/tcp open|filtered pop3
111/tcp open|filtered rpcbind
143/tcp open|filtered imap
MAC Address: 02:45:BF:8A:2D:6B (Unknown)

Nmap done: 1 IP address (1 host up) scanned in 96.50 seconds
```

## FIN Scan (-sF)

The _FIN scan_ sends a TCP packet with the FIN flag set.

No response will be sent if the TCP port is open. Again, Nmap cannot be sure if the port is open or if a firewall is blocking the traffic related to this TCP port. However, the target system should respond with an RST if the port is closed.

It's worth noting some firewalls will 'silently' drop the traffic without sending an RST.

The result is quite similar to the result we obtained earlier using a [Null Scan](knowledge/off-sec/tools/nmap/ports-scanning-advanced.md#Null%20Scan%20-sN).

```sh
$ sudo nmap -sF 10.10.235.110

Starting Nmap 7.60 ( https://nmap.org ) at 2021-08-30 10:32 BST
Nmap scan report for 10.10.235.110
Host is up (0.0018s latency).
Not shown: 994 closed ports
PORT    STATE         SERVICE
22/tcp  open|filtered ssh
25/tcp  open|filtered smtp
80/tcp  open|filtered http
110/tcp open|filtered pop3
111/tcp open|filtered rpcbind
143/tcp open|filtered imap
MAC Address: 02:45:BF:8A:2D:6B (Unknown)

Nmap done: 1 IP address (1 host up) scanned in 96.52 seconds
```

### Xmas Scan (-sX)

The Xmas scan gets its name after Christmas tree lights. An Xmas scan sets the FIN, PSH, and URG flags simultaneously.

Like the Null scan and FIN scan, if an RST packet is received, it means that the port is closed. Otherwise, it will be reported as open|filtered.

The obtained results are pretty similar to that of the [null scan](knowledge/off-sec/tools/nmap/ports-scanning-advanced.md) and the [FIN scan](knowledge/off-sec/tools/nmap/ports-scanning-advanced.md).

```sh
$ sudo nmap -sX 10.10.235.110

Starting Nmap 7.60 ( https://nmap.org ) at 2021-08-30 10:34 BST
Nmap scan report for 10.10.235.110
Host is up (0.00087s latency).
Not shown: 994 closed ports
PORT    STATE         SERVICE
22/tcp  open|filtered ssh
25/tcp  open|filtered smtp
80/tcp  open|filtered http
110/tcp open|filtered pop3
111/tcp open|filtered rpcbind
143/tcp open|filtered imap
MAC Address: 02:45:BF:8A:2D:6B (Unknown)

Nmap done: 1 IP address (1 host up) scanned in 84.85 seconds
```

> [!tip] Null, FIN and Xmas scan types can be efficient is when scanning a target behind a stateless (non-stateful) [firewall](knowledge/off-sec/hardening/firewall.md).
>
> A stateless firewall will check if the incoming packet has the SYN flag set to detect a connection attempt. Using a flag combination that does not match the SYN packet makes it possible to deceive the firewall and reach the system behind it.
>
> A stateful firewall will practically block all such crafted packets and render this kind of scan useless.

## Maimon Scan (-sM)

> [!info] From the name of Uriel Maimon
>
> He first described this scan in 1996.

In this scan, the FIN and ACK bits are set. The target should send an RST packet as a response.

Certain BSD-derived systems drop the packet if it is an open port exposing the open ports.

This scan won’t work on most targets encountered in modern networks. Most target systems respond with an RST packet regardless of whether the TCP port is open. But it's useful to better understand the port scanning mechanism and the hacking mindset.

## TCP ACK Scan (-sA)

An ACK scan will send a TCP packet with the ACK flag set. The target would respond to the ACK with RST regardless of the state of the port. This behaviour happens because a TCP packet with the ACK flag set should be sent only in response to a received TCP packet to acknowledge the receipt of some data, unlike our case. Hence, this scan won’t tell us whether the target port is open in a simple setup.

However, this kind of scan would be helpful if there is a [firewall](knowledge/off-sec/hardening/firewall.md) in front of the target.

Consequently, based on which ACK packets resulted in responses, you will learn which ports were not blocked by the firewall. In other words, **this type of scan is more suitable to discover firewall rule sets and configuration**.

```sh
$ sudo nmap -sA MACHINE_IP

Starting Nmap 7.60 ( https://nmap.org ) at 2021-09-07 11:34 BST
Nmap scan report for MACHINE_IP
Host is up (0.00046s latency).
Not shown: 997 filtered ports
PORT    STATE      SERVICE
22/tcp  unfiltered ssh
25/tcp  unfiltered smtp
80/tcp  unfiltered http
MAC Address: 02:78:C0:D0:4E:E9 (Unknown)

Nmap done: 1 IP address (1 host up) scanned in 15.45 seconds
```

This result indicates that the firewall is blocking all other ports except for these three ports.

## TCP Window scan (-sW)

The _TCP Window Scan_ is almost the same as [ACK Scan](knowledge/off-sec/tools/nmap/ports-scanning-advanced.md), however, it examines the TCP Window field of the RST packets returned.

On specific systems, this can reveal that the port is open.

Launching a TCP window scan against a Linux system with no firewall will not provide much information. However, if we repeat our TCP window scan against a server behind a firewall, we expect to get more satisfying results.

```shell-session
pentester@TryHackMe$ sudo nmap -sW 10.10.11.81

Starting Nmap 7.60 ( https://nmap.org ) at 2021-09-07 11:39 BST
Nmap scan report for 10.10.11.81
Host is up (0.00040s latency).
Not shown: 997 filtered ports
PORT    STATE  SERVICE
22/tcp  closed ssh
25/tcp  closed smtp
80/tcp  closed http
MAC Address: 02:78:C0:D0:4E:E9 (Unknown)

Nmap done: 1 IP address (1 host up) scanned in 14.84 seconds
```

The TCP Window Scan pointed that three ports are detected as closed (this is in contrast with the ACK scan that labelled the same three ports as unfiltered).

Although we know that these three ports are not closed, we realize they responded differently, indicating that the firewall does not block them.

## Custom Scan

We can make a Custom Scan using `--scanflags`, eg `--scanflags RSTSYNFIN`.

We need to know how the different ports will behave to interpret the results in different scenarios correctly.

> [!tip] Usability of the ACK scan and the Window scan
>
> They can be very efficient at helping us map out the firewall rules. However, just because a firewall is not blocking a specific port, it does not necessarily mean that a service is listening on that port.
>
> There is a possibility that the firewall rules need to be updated to reflect recent service changes. Hence, ACK and window scans are exposing the firewall rules, not the services.
