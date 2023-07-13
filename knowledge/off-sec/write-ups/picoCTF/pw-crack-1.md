---
title: PW Crack 1
tags:
  - ctf
  - picoctf
---

[Link to the exercise](https://play.picoctf.org/practice/challenge/245)

## Steps

I downloaded the `level1.py` (the script) and `level1.flag.py.enc` (the encrypted flag) files and opened the former with `python`.

The script asked for the password. From the source code, I knew the password was `8713`. However, the script was pretty stubborn about accepting the password:

```sh
$ python level1.py
Please enter correct password for flag: 8713
8713
That password is incorrect
```

### Source code analysis

```python
def level_1_pw_check():
	user_pw = input("Please enter correct password for flag: ")
	print(user_pw)
	if( user_pw == "8713"):
		print("Welcome back... your flag, user:")
		decryption = str_xor(flag_enc.decode(), user_pw)
		print(decryption)
		return
	print("That password is incorrect")
```

It seemed strange that `user_pw` should be equal to `"8713"`. I am not a daily Python user, but it seemed that it wanted me to pass a string value, not a number. I tried that:

```sh
$ python level1.py
Please enter correct password for flag: "8713"
8713
Welcome back... your flag, user:
<redacted>
```

...and the flag was mine. Easy peasy.

## Flag

`picoCTF{545h_r1ng1ng_1b2fd683}`
