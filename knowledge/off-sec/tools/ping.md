---
title: ping
---

`ping` is one of the most fundamental network tools. It uses [icmp](knowledge/off-sec/glossary/icmp.md) packets to determine the performance of a connection between devices. The primary purpose of `ping` is to check whether you can reach the remote system and that the remote system can reach you back (if the system is online, if the packet is blocked by a firewall etc.) before we spend time carrying out more detailed scans to discover the running operating system and services.

`ping` measures the time for IMCP packets to travel between devices (using `echo` packet from host and `echo reply` packet from the target device).

We can use ping as `ping MACHINE_IP` or `ping HOSTNAME`. In the latter, the system needs to resolve HOSTNAME to an IP address before sending the ping packet.

## Opts

- `-c` - number of packets to send
  - `-n` in Windows
- `-s` - packet size
  - 56 bytes by default; with 8 bytes from IMCP header it translates to 64 bytes

## No ping reply?

There are a few explanations that would explain why we didn’t get a `ping reply`:

- The destination computer is not responsive
  - still booting up or turned off, or the OS has crashed
- It is unplugged from the network
- There is a faulty network device across the path.
- A [firewall](knowledge/off-sec/hardening/firewall.md) is configured to block such packets.
- The system is unplugged from the network.
