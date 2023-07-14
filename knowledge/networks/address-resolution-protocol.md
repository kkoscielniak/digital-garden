---
title: ARP
customHeader: true
---

# Address Resolution Protocol

ARP is the technology that is responsible for allowing devices to identify themselves on a network.

It allows a device to associate its MAC address with an IP address on the network. Each device on a network will keep a log of the MAC addresses associated with other devices in a _cache_ (or a _ledger_).

When devices wish to communicate with another, they will send a broadcast to the entire network searching for the specific device. Devices can use the ARP protocol to find the MAC address of a device for communication.

## How does ARP Work?

In order to map these two identifiers together (IP and MAC), The ARP protocol sends two types of messages:

1. `ARP Request` is sent, a message is broadcasted to every other device found on a network by the device, asking whether or not the device's MAC address matches the requested IP address.
2. If the device does have the requested IP address, an `ARP Reply` is returned to the initial device to acknowledge this.
3. The initial device stores the IP it within its cache (as an ARP entry).

This process aims to get the MAC address so that communication over the OSI Data Link layer becomes possible (it's a Layer 2 protocol).
