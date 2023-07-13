---
title: Fuzzing
---

_Fuzzing_ is when we take a set of data (e.g. wordlist) and apply it to a parameter to test functionality or to see if something exists.

For example, we may choose to _fuzz for endpoints_ in a web application; this would involve taking each word in a wordlist and adding it to the end of a request to see how the web server responds.
