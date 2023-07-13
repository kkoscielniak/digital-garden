---
title: plumbing
---

[Link to the exercise](https://play.picoctf.org/practice/challenge/48)

## Steps

This one is really easy. I just needed to dump the output of `nc <server address and port>` to a text file and try to find `picoCTF` string in it 🤷‍♂️

To dump the output and open it in VS Code:
`nc jupiter.challenges.picoctf.org 4427 > f.txt && code f.txt`

## Flag

`picoCTF{digital_plumb3r_5ea1fbd7}`
