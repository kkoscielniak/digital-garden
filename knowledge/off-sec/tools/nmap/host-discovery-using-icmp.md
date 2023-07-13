---
title: Nmap Host Discovery Using ICMP
---

We can [[knowledge/off-sec/tools/ping]] every IP address on a target network and see who would respond to our `ping` (`ICMP Type 8/Echo`) requests with a `ping reply` (`ICMP Type 0`).

However, it is not always reliable as many firewalls block `ICMP echo` (e.g. Windows are configured to block `ICMP echo` by default)

Remember that an [[knowledge/off-sec/tools/nmap/host-discovery-using-arp|ARP]] query will precede the [[knowledge/off-sec/glossary/icmp|icmp]] request if we target is on the same [[knowledge/networks/subnetworks|subnetworks]].

In the example below, we scanned the target’s subnet using `nmap -PE -sn MACHINE_IP/24`. This scan will send ICMP echo packets to every IP address on the subnet. Again, we expect live hosts to reply; however, it is wise to remember that many firewalls block ICMP.

## Example

We will scan from a system that belongs to a different subnet. The results are similar to what we've seen in [[knowledge/off-sec/tools/nmap/host-discovery-using-arp]] but without the MAC addresses.

```sh
$ sudo nmap -PE -sn 10.10.68.220/24

Starting Nmap 7.92 ( https://nmap.org ) at 2021-09-02 12:16 EEST
Nmap scan report for 10.10.68.50
Host is up (0.12s latency).
Nmap scan report for 10.10.68.52
Host is up (0.12s latency).
Nmap scan report for 10.10.68.77
Host is up (0.11s latency).
Nmap scan report for 10.10.68.110
Host is up (0.11s latency).
Nmap scan report for 10.10.68.140
Host is up (0.11s latency).
Nmap scan report for 10.10.68.142
Host is up (0.11s latency).
Nmap scan report for 10.10.68.220
Host is up (0.11s latency).
Nmap scan report for 10.10.68.222
Host is up (0.11s latency).
Nmap done: 256 IP addresses (8 hosts up) scanned in 8.26 seconds
```

With Wireshark, we can see that we have one source IP address on a different subnet than that of the destination subnet, sending ICMP echo requests to all the IP addresses in the target subnet to see which one will reply.

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5f04259cf9bf5b57aed2c476/room-content/0fa352ccc303a6e840929ab4a21848b1.png)

Because ICMP echo requests tend to be blocked, we might also consider `ICMP Timestamp` (`ICMP Type 13` and `ICMP Timestamp reply (Type 14)`) or `ICMP Address Mask` requests to tell if a system is online:

Adding the `-PP` option tells Nmap to use ICMP timestamp requests:

```sh
$ sudo nmap -PP -sn 10.10.68.220/24

Starting Nmap 7.92 ( https://nmap.org ) at 2021-09-02 12:06 EEST
Nmap scan report for 10.10.68.50
Host is up (0.13s latency).
Nmap scan report for 10.10.68.52
Host is up (0.25s latency).
Nmap scan report for 10.10.68.77
Host is up (0.14s latency).
Nmap scan report for 10.10.68.110
Host is up (0.14s latency).
Nmap scan report for 10.10.68.140
Host is up (0.15s latency).
Nmap scan report for 10.10.68.209
Host is up (0.14s latency).
Nmap scan report for 10.10.68.220
Host is up (0.14s latency).
Nmap scan report for 10.10.68.222
Host is up (0.14s latency).
Nmap done: 256 IP addresses (8 hosts up) scanned in 10.93 seconds
```

Similar to the previous ICMP scan, this scan will send many ICMP timestamp requests to every valid IP address in the target subnet. In the Wireshark we can see one source IP address sending ICMP packets to every possible IP address to discover online hosts.

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5f04259cf9bf5b57aed2c476/room-content/61ddb58cf7ffb3472f12388ff3ac3f4b.png)

Similarly, Nmap uses `address mask` queries (`ICMP Type 17`) and checks whether it gets an `address mask reply` (`ICMP Type 18`). This scan can be enabled with the option `-PM`.

If one type of packet is being blocked, we can always choose another to discover the target network and services.
