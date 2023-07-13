---
title: Burp Repeater
---

_Burp Repeater_ allows to take the request captured in the [proxy](knowledge/off-sec/tools/burp/proxy.md), edit it, and send the same request repeatedly. We can also craft and send requests by hand.

Useful for:

- crafting a [payload](knowledge/off-sec/glossary/payload.md) through trial and error (e.g. in an [sqli](knowledge/off-sec/pentesting/sqli.md))
- poking around the endpoints
- testing the functionality of an endpoint for flaws
- rendering the numerous responses in HTML so that we can see the results of our handiwork in action.

## Basic usage

Whilst we *can* craft requests by hand, it would be much more common to simply capture a request in the Proxy, then send that through to Repeater for editing/resending.

With a request captured in the proxy, we can send to repeater either by _Right Click_ -> _Send to Repeater_ (or `⌃ + ⌘ + R`).

## View options

Repeater offers us various ways to present the responses to our requests, from `hex` all the way up to a fully rendered version of the page.

There's also _Show non-printable characters_ button (`\n`), allowing to display characters that usually wouldn't show up in the _Pretty_ or _Raw_ views.

## Req/Res Inspector

The _Inspector_ is a way to get a prettified breakdown of the requests and responses, as well as for experimenting to see how changes made using the higher-level Inspector affect the equivalent raw versions.
