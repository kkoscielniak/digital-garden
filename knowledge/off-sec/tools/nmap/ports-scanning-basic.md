---
title: Port scanning with NMap
weight: 4
---

## Port states

Nmap considers the following states for [port](knowledge/off-sec/tools/nmap/port.md)s:

1. _Open_ - a service is listening on the specified port
2. _Closed_ - no service is listening on the specified port, although the port is accessible (it is reachable and is not blocked by a firewall or other security appliances/programs)
3. _Filtered_ - Nmap cannot determine if the port is open or closed because the port is not accessible.
   - usually due to a firewall preventing Nmap from reaching that port
   - either Nmap’s packets are blocked from reaching the port or the responses are blocked from reaching Nmap’s host
4. _Unfiltered_ - Nmap cannot determine if the port is open or closed, although the port is accessible.
   - encountered when using an ACK scan `-sA`
5. _Open|Filtered_ - Nmap cannot determine whether the port is open or filtered
6. _Closed|Filtered_ - Nmap cannot decide whether a port is closed or filtered

## TCP Flags

Nmap supports different types of TCP port scans.

To understand the difference between these port scans, we need to focus on the flags that Nmap can set or unset in [tcp-header](knowledge/off-sec/tools/nmap/tcp-header.md).

## TCP Connect scan

_TCP connect scan_ works **by completing the TCP 3-way handshake** (SYN -> SYN/ACK -> ACK). This might make the logs to appear on the target device.

We are interested in learning whether the TCP port is open, not establishing a TCP connection. Hence the connection is torn as soon as its state is confirmed by sending a RST/ACK. We can choose to run TCP connect scan using `nmap -sT ...`.

As a non-privileged user, a TCP connect scan is the only possible option to discover open TCP ports.

Nmap sends TCP packets with SYN flag set to various ports, 256, 443, 143, and so on (1000 most common ports). A closed TCP port responds to a SYN packet with RST/ACK to indicate that it is not open. This pattern will repeat for all the closed ports as we attempt to initiate a TCP 3-way handshake with them.

```sh
$ nmap -sT MACHINE_IP

Starting Nmap 7.60 ( https://nmap.org ) at 2021-08-30 09:53 BST
Nmap scan report for MACHINE_IP
Host is up (0.0024s latency).
Not shown: 995 closed ports
PORT    STATE SERVICE
22/tcp  open  ssh
25/tcp  open  smtp
80/tcp  open  http
111/tcp open  rpcbind
143/tcp open  imap
MAC Address: 02:45:BF:8A:2D:6B (Unknown)

Nmap done: 1 IP address (1 host up) scanned in 0.40 seconds
```

### Opts

- `-F` - enable fast mode (100 most common ports instead of 1000)
- `-r` - scan in consecutive order instead of random one
  - useful when testing whether ports open in a consistent manner, e.g. during target boot up

## TCP SYN scan

The default scan mode is _SYN scan_, and it requires a privileged user to run it and is a very reliable option.

SYN scan **does not need to complete the TCP 3-way handshake**; instead, it tears down the connection once it receives a response from the server. Because we didn’t establish a TCP connection, this decreases the chances of the scan being logged (SYN -> SYN/ACK -> RST)

We can select this scan type by using the `-sS` option.

The behaviour in the case of closed TCP ports is similar to that of the TCP connect scan.

```sh
$ sudo nmap -sS 10.10.148.171

Starting Nmap 7.60 ( https://nmap.org ) at 2021-08-30 09:53 BST
Nmap scan report for 10.10.148.171
Host is up (0.0073s latency).
Not shown: 994 closed ports
PORT    STATE SERVICE
22/tcp  open  ssh
25/tcp  open  smtp
80/tcp  open  http
110/tcp open  pop3
111/tcp open  rpcbind
143/tcp open  imap
MAC Address: 02:45:BF:8A:2D:6B (Unknown)

Nmap done: 1 IP address (1 host up) scanned in 1.60 seconds
```

## UDP Scan

UDP is a _connectionless protocol_, and hence it does not require any handshake for connection establishment.

We cannot guarantee that a service listening on a UDP port would respond to our packets. Therefore, sending a UDP packet to an open port won’t tell us anything.

However, if a UDP packet is sent to a closed port, an `ICMP port unreachable` error (`type 3, code 3`) is returned. The UDP ports that don’t generate any response are the ones that Nmap will state as open.

We can select UDP scan using the `-sU` option; moreover, we can combine it with another TCP scan.

```sh
$ sudo nmap -sU 10.10.148.171

Starting Nmap 7.60 ( https://nmap.org ) at 2021-08-30 09:54 BST
Nmap scan report for 10.10.148.171
Host is up (0.00061s latency).
Not shown: 998 closed ports
PORT    STATE         SERVICE
68/udp  open|filtered dhcpc
111/udp open          rpcbind
MAC Address: 02:45:BF:8A:2D:6B (Unknown)

Nmap done: 1 IP address (1 host up) scanned in 1085.05 seconds
```

## Options

### Ports to scan

- `-p-` - scan all 65535 ports
- `-F` - scan 100 most common ports
- `--top-ports 69` - scan top 69 most common ports

### Scan timing

- `-T<0-5>` - scan timing - paranoid (0) - slowest - sneaky (1) - polite (2) - **normal** (3) - aggressive (4) - insane (5) - fastest

To avoid IDS alerts, you might consider `-T0` or `-T1`, e.g. `-T0` scans one port at a time and waits 5 minutes between sending each probe.

`-T5` is the most aggressive in terms of speed; however, this can affect the accuracy of the scan results due to the increased likelihood of packet loss.

`-T4` is often used during CTFs and when learning to scan on practice targets, whereas `-T1` is often used during real engagements where stealth is more important.

Alternatively, you can choose to control the packet rate using `--min-rate <number>` and `--max-rate <number>` (up to 10 packets per second).

### Parallelization

We can control probing parallelization using `--min-parallelism <numprobes>` and `--max-parallelism <numprobes>`.
