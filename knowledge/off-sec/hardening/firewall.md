---
title: Firewall
---

A _firewall_ is a device within a network responsible for determining what traffic is allowed to enter and exit.

An administrator can configure a firewall to permit or deny traffic from entering or exiting a network based on numerous factors such as:

- Where the traffic is coming from?
  - accept/deny traffic from a specific network
- Where is the traffic going to?
  - accept/deny traffic destined for a specific network
- What port is the traffic for?
  - accept/deny traffic destined for port 80 only
- What protocol is the traffic using?
  - accept/deny traffic that is UDP, TCP or both

Firewalls come in all shapes and sizes. From dedicated pieces of hardware (often found in large networks like businesses) that can handle a magnitude of data to residential routers (like at your home!) or software such as [Snort](https://www.snort.org/).

## Firewall types

- _Stateful_
  - uses the entire information from a connection; rather than inspecting an individual packet, this firewall determines the behaviour of a device **based upon the entire connection**.
  - consumes many resources in comparison to stateless firewalls as the decision making is dynamic (e.g. a firewall could allow the first parts of a TCP handshake that would later fail)
  - If a connection from a host is bad, it will block the entire devices
- _Stateless_
  - uses a static set of rules to determine whether or not **individual packets** are acceptable or not (e.g. a device sending a bad packet will not necessarily mean that the entire device is then blocked)
  - Whilst these firewalls use much fewer resources than alternatives, they are much dumber. They are only as effective as the rules that are defined within them. If a rule is not exactly matched, it is effectively useless
  - They are great when receiving large amounts of traffic from a set of hosts (such as a DDoS attack)

A firewall generally works at **layer 3 and 4 of the OSI Model**.

## Useful info

MS Windows firewall blocks [ping](knowledge/off-sec/tools/ping.md) by default.
