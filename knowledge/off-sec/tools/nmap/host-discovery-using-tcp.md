---
title: Nmap Host Discovery Using TCP
---

## TCP SYN Ping

We can send a packet with the SYN flag set to a TCP port (80 by default), and wait for a response. An open port should reply with a SYN/ACK; a closed port would result in an RST.
We check whether we will get any response to infer whether the host is up. The specific state of the port is not significant here.

If we want Nmap to use TCP SYN ping, you can do so via the option `-PS` followed by the port number, range, list, or a combination of them:

- `-PS21` will target port 21
- `-PS21-25` will target ports 21..25.
- `-PS80,443,8080` will target ports 80, 443, and 8080.

Privileged users (`root` and _sudoers_ can send TCP SYN packets and don’t need to complete the TCP 3-way handshake even if the port is open. Unprivileged users have no choice but to complete the 3-way handshake to see if the port is open.

```sh
$ sudo nmap -PS -sn 10.10.68.220/24
Starting Nmap 7.92 ( https://nmap.org ) at 2021-09-02 13:45 EEST
Nmap scan report for 10.10.68.52
Host is up (0.10s latency).
Nmap scan report for 10.10.68.121
Host is up (0.16s latency).
Nmap scan report for 10.10.68.125
Host is up (0.089s latency).
Nmap scan report for 10.10.68.134
Host is up (0.13s latency).
Nmap scan report for 10.10.68.220
Host is up (0.11s latency).
Nmap done: 256 IP addresses (5 hosts up) scanned in 17.38 seconds
```

Let's take a look at the network traffic on WireShark. Any service listening on port 80 is expected to reply, indirectly indicating that the host is online.

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5f04259cf9bf5b57aed2c476/room-content/e580a3279be3798ddb78f61a9ee21587.png)

## TCP ACK Ping

_TCP ACK Ping_ sends a packet with an ACK flag set. You must be running Nmap as a privileged user to be able to accomplish this (as an unprivileged user, Nmap will attempt a 3-way handshake). By default, port 80 is used.

The syntax is similar to TCP SYN ping. `-PA` should be followed by a port number, range, list, or a combination of them.

Any TCP packet with an ACK flag should get a TCP packet back with an RST flag set. The target responds with the RST flag set because the TCP packet with the ACK flag is not part of any ongoing connection. The expected response is used to detect if the target host is up.

```shell-session
$ sudo nmap -PA -sn 10.10.68.220/24
Starting Nmap 7.92 ( https://nmap.org ) at 2021-09-02 13:46 EEST
Nmap scan report for 10.10.68.52
Host is up (0.11s latency).
Nmap scan report for 10.10.68.121
Host is up (0.12s latency).
Nmap scan report for 10.10.68.125
Host is up (0.10s latency).
Nmap scan report for 10.10.68.134
Host is up (0.10s latency).
Nmap scan report for 10.10.68.220
Host is up (0.10s latency).
Nmap done: 256 IP addresses (5 hosts up) scanned in 29.89 seconds
```

If we peek at the network traffic, we will discover many packets with the ACK flag set and sent to port 80 of the target systems. Nmap sends each packet twice. The systems that don’t respond are offline or inaccessible.

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5f04259cf9bf5b57aed2c476/room-content/6ccdba7337684b8e8f532a23c5259ffc.png)

## UDP Ping

We can also use UDP to discover if the host is online. Contrary to TCP SYN ping, sending a UDP packet to an open port **is not expected to lead to any reply**. However, if we send a UDP packet to a closed UDP port, we expect to get an `ICMP Destination Unreachable` (`Type 3, Code 3`) packet; this indicates that the target system is up and available.

The syntax to specify the ports is similar to that of TCP SYN ping and TCP ACK ping; Nmap uses `-PU` for UDP ping:

```sh
pentester@TryHackMe$ sudo nmap -PU -sn 10.10.68.220/24
Starting Nmap 7.92 ( https://nmap.org ) at 2021-09-02 13:45 EEST
Nmap scan report for 10.10.68.52
Host is up (0.10s latency).
Nmap scan report for 10.10.68.121
Host is up (0.10s latency).
Nmap scan report for 10.10.68.125
Host is up (0.14s latency).
Nmap scan report for 10.10.68.134
Host is up (0.096s latency).
Nmap scan report for 10.10.68.220
Host is up (0.11s latency).
Nmap done: 256 IP addresses (5 hosts up) scanned in 9.20 seconds
```

Let’s inspect the UDP packets generated. We notice Nmap sending UDP packets to UDP ports that are most likely closed. The image below shows that Nmap uses an uncommon UDP port to trigger an `ICMP Destination Unreachable` error.

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5f04259cf9bf5b57aed2c476/room-content/2417b8b03f00fe5f589a08d9e6e62209.png)

## See also

- [[knowledge/off-sec/tools/masscan|masscan]]
