---
title: TCP header
---

The TCP header is the first 24 bytes of a TCP Segment.

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5f04259cf9bf5b57aed2c476/room-content/79ca8e4acbd573a27cee413cde927769.png)
☝️ TCP header as defined in [RFC 793](https://datatracker.ietf.org/doc/html/rfc793.html)

Each row has 32 bits (4 bytes) with 6 rows giving 192bits (24 bytes) in total.

In the first row, we have:

- the source TCP port number (2 bytes)
- the destination port number (2 bytes)

In the second and third rows, we have:

- the sequence number (4 bytes)
- the acknowledgement number (4 bytes)

## Header flags

Setting a flag bit means setting its value to 1.

From left to right, the TCP header flags are:

1. _URG_ - indicates that the _urgent_ pointer filed is significant
   - that the incoming data is urgent
   - a TCP segment with the URG flag set is processed immediately without consideration of having to wait on previously sent TCP segments
2. _ACK_ - the _acknowledgement_ number is significant
   - used to acknowledge the receipt of a TCP segment
3. _PSH_ - _Push_ flag asking TCP to pass the data to the application promptly
4. _RST_ - used to reset the connection
   - Another device (e.g. a firewall), might send it to tear a TCP connection
   - also used when data is sent to a host and there is no service on the receiving end to answer
5. _SYN_ - initiate a TCP 3-way handshake and synchronize sequence numbers with the other host
   - The sequence number should be set randomly during TCP connection establishment.
6. _FIN_ - The sender has no more data to send
