---
title: PW Crack 4
tags:
  - ctf
  - picoctf
---

[Link to the exercise](https://play.picoctf.org/practice/challenge/248)

This one is basically the same as [pw-crack-3](knowledge/off-sec/write-ups/picoCTF/pw-crack-3.md), the only difference is the possible passwords count.

## Steps

_PW Crack 3_ was proposing a valid password among 6 non-valid ones. This exercise gives 100 options to validate instead.

I could go over each of them, but it wouldn't be feasible. Instead, I modified the function I created before to print out the hashes to print only the password that's hash is the same as `correct_pw_hash`.

```python
for p in pos_pw_list:
	if (hash_pw(p) == correct_pw_hash):
		print(p)
```

I seriously wonder why I didn't take the same route when doing _PW Crack 3_. I'm starting to like Python...

## Flag

`picoCTF{fl45h_5pr1ng1ng_ae0fb77c}`
