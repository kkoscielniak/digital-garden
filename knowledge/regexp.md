---
title: RegExp
customHeader: true
---

# RegExp Cheatsheet

Regular expression - a sequence of characters representing a pattern.

They are pretty hard to maintain:

> If you'll use regular expression to solve a problem, [you'll have two problems](https://blog.codinghorror.com/regular-expressions-now-you-have-two-problems/).

Regular expressions are case-sensitive by default.

We need to keep in mind the special characters, like `.` (metacharacters).

It's generally better to re-use the regular expressions available over the Internet, as they are pretty tricky to write and maintain. The bugs in these are probably fixed by the community already.

## Metacharacters

| metachar      | meaning                                                          |
| ------------- | ---------------------------------------------------------------- |
| `.`           | any character                                                    |
| `^`           | match only the pattern that occures at the beginning of the line |
| `$`           | match only the pattern that occures at the end of the line       |
| `\w`          | word (a-z, A-Z, 0-9, `_`)                                        |
| `\W`          | **not** word (plus `\n`)                                         |
| `\n`          | new line                                                         |
| `\t`          | tab                                                              |
| `\d`          | digit                                                            |
| `\d\d`        | number of 2 digits                                               |
| `\d\d-\d\d\d` | Polish zip code (12-345)                                         |

## Operators

| operator     | meaning                            |
| ------------ | ---------------------------------- |
| `+`          | at least one occurence             |
| `\d+`        | at least one digit                 |
| `*`          | 0 or more occurences               |
| `{3}`        | exactly 3 occurences               |
| `\d{3}`      | exactly 3 digits                   |
| `{1,3}`      | between 1 and 3 occurences         |
| `[]`         | set of matched characters or range |
| `[ -]`       | either space or `-` or both        |
| `[A-Z]`      | letter between A-Z                 |
| `(-<pipe> )` | space **OR** `-` (`<pipe>` => OR)  |
| `\`          | escape metacharacters              |
| `\.`         | dot (escaped `.`)                  |
| `^`          | negation                           |

## Flags

| flag | meaning                                                            |
| ---- | ------------------------------------------------------------------ |
| `g`  | match **all** occurences                                           |
| `m`  | make `^` and `$` work in **every** line (not only first/last ones) |
| `i`  | make the expression case-insensitive                               |

## Groups

| operator | meaning                           |
| -------- | --------------------------------- |
| `()`     | encapsulate expression in a group |
| `(?:)`   | not group?                        |

### Groups indexing

Groups are indexed from 1.
`$2` - first group in matched pattern

## Examples

### Phone number

```
(\d{3}(-1 )){2}\d{3}
- (\d{3}(-1 )){2} - match (123- | 123<space>) twice
- then match last (123)

123-456-789
123 456 789
```

### Email

There's no perfect email regex, but [this one is pretty close](https://emailregex.com).

### CSS `rgb`/`rgba` function

```
^rgba?\([0-9, ]+\);$
```

### CSS `rgb()` and `rgba()` values

```regexp
^rgba?\((\d{1,3}(?:,\s?\d{1,3}){2}(?:,\s?[0-1]\.?\d?)?)?\);?$
```

Matches:

- rgb(**1, 2, 3**);
- rgba(**1, 2, 3, 0.4**);

## Apps

- regex101.com
- regexr.com
- [Expressions](https://www.apptorium.com/expressions)

## Ideas to explore

Regular Expressions aren't usable only for programming. They can be used to:

- [[tools/automation/index|automating]] the e-mails management via Zapier/Make.com
  - labeling the e-mails
  - sending them to Todoist

## Resources

- [Regex for WebDeveloper course](https://eduweb.pl/programowanie-i-www/javascript/regex-dla-webdevelopera) 🇵🇱
