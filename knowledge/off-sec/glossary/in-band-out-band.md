---
title: In-band vs Out-band
---

## In-band

_In-Band_ refers to the same method of communication being used to exploit the vulnerability and also receive the results

For example, discovering an [sqli](knowledge/off-sec/pentesting/sqli.md) vulnerability on a website page and then being able to extract data from the database to the same page.

## Out-of-band

An Out-Of-Band attack is classified by having two different communication channels, one to launch the attack and the other to gather the results, eg. the attack channel could be a web request, and the data gathering channel could be monitoring HTTP/DNS requests made to a service we control.

1. An attacker makes a request to a website vulnerable to SQL Injection with an injection [payload](knowledge/off-sec/glossary/payload.md).
2. The Website makes a query to the DB which also passes the payload.
3. The payload contains a request which forces an HTTP request back to the hacker's machine containing data from the DB.
