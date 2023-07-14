---
title: Useful configuration settings
---

## User Settings

Applied globally; can be overwritten in the Project Settings.

There are four main sub-sections of the User options tab:

- _Connections_ - controls how Burp makes connections to targets
  - we can set a proxy for Burp Suite to connect through - useful if we want to use Burp Suite through a network pivot
- _TLS_ - enables/disables various TLS options
  - a place to upload client certificates should a web app require us to use one for connections
- _Display_ - configuring various options to do with the rendering engine in [[knowledge/off-sec/tools/burp/repeater|repeater]]

## Project Settings

In _Community_ edition we can't save projects, effectively meaning these settings will reset each time we close Burp.

- _Connections_ - same as in User Settings with few differences, eg.
  - the _Hostname Resolution_ - allowing you to map domains to IPs directly within Burp Suite
  - _Out-of-Scope Requests_ settings - enabling us to determine whether Burp will send requests to anything we aren't explicitly targeting
- *HTTP* - defines how Burp handles various aspects of the HTTP protocol, eg.
  - whether it follows redirects
  - how to handle unusual response codes
- _TLS_
  - showing us a list of public server certificates for sites that we have visited
- _Sessions_
  - allows us to define how Burp obtains, saves, and uses session cookies that it receives from target sites
  - allows us to define macros which we can use to automate things such as logging into web applications
  - _cookie jar_
