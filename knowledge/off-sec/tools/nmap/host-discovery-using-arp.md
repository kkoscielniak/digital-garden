---
title: Nmap Host Discovery using ARP
---

[[knowledge/networks/address-resolution-protocol|address-resolution-protocol]] scan is possible only if you are on the same [[knowledge/networks/subnetworks|subnetworks]] as the target systems.

On an Ethernet (802.3) and WiFi (802.11), you need to know the MAC address of any system before you can communicate with it.

The MAC address is necessary for the Data Link layer (OSI) header; the header contains the source MAC address and the destination MAC address among other fields.

To get the MAC address, the OS sends an ARP query. A host that replies to ARP queries is **up**. You should expect to see many ARP queries generated during a [[knowledge/off-sec/tools/nmap/nmap|Nmap]] scan of a local network.

If you want Nmap only to perform an ARP scan without port-scanning, you can use `nmap -PR -sn TARGETS`, where `-PR` indicates that you only want an ARP scan.

The following example shows Nmap using ARP for host discovery without any port scanning to discover all the live systems on the same subnet as our target machine.

```sh
# Root privileges are needed for ARP scan
$ sudo nmap -PR -sn 10.10.210.6/24

Starting Nmap 7.60 ( https://nmap.org ) at 2021-09-02 07:12 BST
Nmap scan report for ip-10-10-210-75.eu-west-1.compute.internal (10.10.210.75)
Host is up (0.00013s latency).
MAC Address: 02:83:75:3A:F2:89 (Unknown)
Nmap scan report for ip-10-10-210-100.eu-west-1.compute.internal (10.10.210.100)
Host is up (-0.100s latency).
MAC Address: 02:63:D0:1B:2D:CD (Unknown)
Nmap scan report for ip-10-10-210-165.eu-west-1.compute.internal (10.10.210.165)
Host is up (0.00025s latency).
MAC Address: 02:59:79:4F:17:B7 (Unknown)
Nmap scan report for ip-10-10-210-6.eu-west-1.compute.internal (10.10.210.6)
Host is up.
Nmap done: 256 IP addresses (4 hosts up) scanned in 3.12 seconds
```

Nmap sends ARP requests to all the target computers, and those online should send an ARP reply back.

If we look at the packets generated using a tool such as `tcpdump` or Wireshark, we will see network traffic similar to this:
![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5f04259cf9bf5b57aed2c476/room-content/fc86462236edf4ee667f416b533c93fd.png)
Wireshark displays:

- the source MAC address
- destination MAC address
  - the broadcast address, as we don't know the MAC address of the target yet
    - we can see the IP address though
- protocol
- query related to each ARP request.

We can see that we are requesting the MAC addresses of all the IP addresses on the subnet, starting with `10.10.210.1`. The host with the IP address we are asking about will send an `ARP reply` with its MAC address, and that’s how we will know that it is online.

## See also

- [[knowledge/off-sec/tools/arp-scan|arp-scan]]
