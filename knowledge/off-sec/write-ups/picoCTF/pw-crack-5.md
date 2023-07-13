---
title: PW Crack 5
tags:
  - ctf
  - picoctf
---

[Link to the exercise](https://play.picoctf.org/practice/challenge/249)

The final one of the _PW Crack_ series.

## Steps

I began by downloading all the files and opened `dictionary.txt` first.

It had >65k passwords (from `0x0000` to `0xffff`) and only one was correct. I knew could reuse the loop from [pw-crack-4](knowledge/off-sec/write-ups/picoCTF/pw-crack-4.md).

However, the hints mentioned the `.strip()` fn, which meant that some passwords in the file would have whitespaces that I'd need to get rid of.

So I slightly modified the loop to strip the whitespaces first, then compare the passwords hashes with the correct one:

```python
with open('dictionary.txt', 'r') as passwords:
	for password in passwords:
		stripped_password = password.strip()
		if (hash_pw(stripped_password) == correct_pw_hash):
			print(stripped_password)
```

And that was it.

## Flag

`picoCTF{h45h_sl1ng1ng_fffcda23}`
