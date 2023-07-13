---
title: Burp Decoder
---

Burp Suite's _Decoder_ module allows us to manipulate data. We can *decode* information that we capture during an attack, but we can also *encode* data of our own, ready to be sent to the target.

Decoder also allows us to create [_hashsums_](knowledge/off-sec/glossary/hashing.md) of data, as well as providing a Smart Decode feature which attempts to decode provided data recursively until it is back to being plaintext.

We can also send data here from other sections of the framework by _Right Click_ -> *Send to Decoder.*
