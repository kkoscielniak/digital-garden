---
title: Burp Intruder
---

_Intruder_ is [[knowledge/off-sec/tools/burp/burp|Burp]]'s built-in [fuzzing](knowledge/off-sec/glossary/fuzzing.md) tool. It allows us to take a request (usually captured in the [proxy](knowledge/off-sec/tools/burp/proxy.md) beforehand) and use it as a template to send many more requests with slightly altered values automatically.

For example, by capturing a request containing a login attempt, we could configure Intruder to swap out the username and password fields for values from a wordlist, effectively allowing us to bruteforce the login form. Similarly, we could use Intruder to fuzz for subdirectories, endpoints, or virtual hosts.

In Burp Community Intruder is heavily rate-limited. This restriction means that many choose to use other tools such as `wfuzz` or `ffuf` for fuzzing and bruteforcing.

To send a a request in from the Burp Proxy we _Right Click_ -> _Send to Intruder_ (or `⌃ + ⌘ + I`).

## Positions

*Positions* allows us to select an _Attack Type_, as well as configure where in the request template we wish to insert our [payload](knowledge/off-sec/glossary/payload.md)s.

Burp will attempt to determine the most likely places we may wish to insert a payload automatically (highlighted in green and surrounded by `§` (silcrows)).

There are the buttons labelled "Add §", "Clear §", and "Auto §":

- *Add* lets us define new positions by highlighting them in the editor and clicking the button.
- *Clear* removes all defined positions, leaving us with a blank canvas to define our own.
- *Auto* attempts to select the most likely positions automatically

## Attack Types

::: question
How did they come up with those names, lol
:::

### Sniper

_Sniper_ is the first and most common attack type. In this case we provide *one* set of payloads, eg. a wordlist or a range of numbers. Intruder will take each payload in a payload set and put it into each defined position in turn.
Let's assume we have a wordlist:

```
burp
suite
intruder
```

With the two positions set, Intruder would use these words to make **six** requests:

```
username=§pentester§&password=§Expl01ted§

# username
username=burp&password=Expl01ted
username=suite&password=Expl01ted
username=intruder&password=Expl01ted

#password
username=pentester&password=burp
username=pentester&password=suite
username=pentester&password=intruder
```

Intruder starts with the first position (`username`) and tries each of our payloads, then moves to the second position (`passwword`) and tries the same payloads again.

> [!tip] Number of requests
>
> `requests = numberOfWords * numberOfPositions`

This quality makes Sniper very good for **single-position attacks** (e.g. a password bruteforce if we know the username or *fuzzing for API endpoints*).

### Battering Ram

Like Sniper, _Battering ram_ takes **one set of payloads**. However, the Battering Ram puts the same payload in **every** position rather than in each position in turn.

Let's assume we have a wordlist:

```
burp
suite
intruder
```

Intruder would use these words to make **three** requests:

```
username=§pentester§&password=§Expl01ted§

username=burp&password=burp
username=suite&password=suite
username=intruder&password=intruder
```

### Pitchfork

_Pitchfork_ is the attack type we are most likely to use, as it's like using numerous Snipers running simultaneously.

Pitchfork uses one payload set **per position** (max 20) and iterates through them all at once.

Let's assume we have 2 wordlists:

```
# usernames
joel
harriet
alex

# passwords
J03l
Emma1815
Sk1ll
```

When using Intruder in pitchfork mode, the requests made would look something like this:

```
username=§pentester§&password=§Expl01ted§

username=joel&password=J03l
username=harriet&password=Emma1815
username=alex&password=Sk1ll
```

Pitchfork takes the first item from each list and puts them into the request, one per position, then repeats this for the next request: taking the second item from each list and substituting it into the template. Intruder will keep doing this until one of the lists run out.

Ideally, our payload sets should be identical lengths.

This attack type is exceptionally useful when forming things like **_credential stuffing_** attacks.

### Cluster Bomb

Like Pitchfork, _Cluster Bomb_ allows us to choose multiple payload sets: one per position, up to a maximum of 20. However, whilst Pitchfork iterates through each payload set simultaneously, Cluster bomb iterates through each payload set **individually**, making sure that every possible combination of payloads is tested.

```
# usernames
joel
harriet
alex

# passwords
J03l
Emma1815
Sk1ll
```

```
username=§pentester§&password=§Expl01ted§

username=joel&password=J03l
username=harriet&password=J03l
username=alex&password=J03l
username=joel&password=Emma1815
username=harriet&password=Emma1815
username=alex&password=Emma1815
username=joel&password=Sk1ll
username=harriet&password=Sk1ll
username=alex&password=Sk1ll
```

Cluster Bomb will iterate through every combination of the provided payload sets to ensure that every possibility has been tested.

This attack-type can create a *huge* amount of traffic.

When using Burp Community and its Intruder rate-limiting a Cluster Bomb attack with any moderately sized payload set will take an incredibly long time.

## Payloads

*Payloads* allows us to select values to insert into each of the positions we defined in _Positions_

- we may choose to load items in from a wordlist to serve as payloads. How these get inserted into the template depends on the attack type we chose in the Positions tab.
- this also allows us to alter Intruder's behaviour with regards to payloads, e.g., we can define pre-processing rules to apply to each payload, add a prefix or suffix, match and replace, or skip if the payload matches a defined regex

## Other options

_Options_ apply primarily to how Burp handles results and how Burp handles the attack itself

- we can choose to flag requests that contain specified pieces of text or define how Burp responds to redirect (3xx) responses.
