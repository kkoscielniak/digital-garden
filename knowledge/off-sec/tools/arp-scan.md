---
title: arp-scan
---

`arp-scan` is an [[knowledge/networks/address-resolution-protocol|ARP]] oriented network scanner.

## Opts

- `arp-scan -l` (`--localnet`) - sends ARP queries to all valid IP addresses on your local networks

- `arp-scan -I wlan0` - specify `wlan0` as the interface to use

```sh
$ sudo arp-scan 10.10.210.6/24

Interface: eth0, datalink type: EN10MB (Ethernet)
WARNING: host part of 10.10.210.6/24 is non-zero
Starting arp-scan 1.9 with 256 hosts (http://www.nta-monitor.com/tools/arp-scan/)
10.10.210.75	02:83:75:3a:f2:89	(Unknown)
10.10.210.100	02:63:d0:1b:2d:cd	(Unknown)
10.10.210.165	02:59:79:4f:17:b7	(Unknown)

4 packets received by filter, 0 packets dropped by kernel
Ending arp-scan 1.9: 256 hosts scanned in 2.726 seconds (93.91 hosts/sec). 3 responded
```

Similarly to [[knowledge/off-sec/tools/nmap/host-discovery-using-arp|Nmap]], `arp-scan` will generate many ARP queries that we can see using `tcpdump`, WireShark, or a similar tool.

## See also

- [arp-scan wiki](http://www.royhills.co.uk/wiki/index.php/Main_Page)
