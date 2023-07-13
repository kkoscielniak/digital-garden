---
title: Burp Extender
---

The Burp Suite *Extender* module can quickly and easily load extensions into the framework, as well as providing a marketplace to download third-party modules (referred to as the "BApp Store"). These can be written in Java, Python (using [Jython](https://www.jython.org/)), or Ruby (using [JRuby](https://www.jruby.org/)).

Whilst many of these extensions require a professional license to download and add in, there are still a fair number that can be integrated with Burp Community. For example, we may wish to extend the inbuilt logging functionality of Burp Suite with the [Logger++](https://github.com/portswigger/logger-plus-plus) module.

Extensions are invoked in *descending* order on the list. All traffic passing through Burp Suite will be passed through each extension in order. This is important when dealing with extensions that modify the requests as some may counteract or otherwise hinder one another.

## Notable extensions

- The [Request Timer](https://github.com/portswigger/request-timer) extension (Written by Nick Taylor) allows us to log the time that each request we send takes to receive a response
  - can be extremely useful for discovering the presence of (and exploiting) [time-based vulnerabilities](knowledge/off-sec/pentesting/sqli.md#Time-based%20SQLi)
- The [Logger++] for extended logging functionality

## Jython

If we want to use Python modules in Burp Suite, we need to have downloaded and included the separate Jython Interpreter JAR file to integrate it with Burp in _Options_ -> _Python Environment_.

## Extensions development

If you are particularly interested in coding your own extensions for Burp Suite, PortSwigger provide a wonderful reference which can be found [here](https://portswigger.net/burp/extender/writing-your-first-burp-suite-extension).
