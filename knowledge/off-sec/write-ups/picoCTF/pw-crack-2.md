---
title: PW Crack 2
tags:
  - ctf
  - picoctf
---

[Link to the exercise](https://play.picoctf.org/practice/challenge/246)

## Steps

I downloaded the `level2.py` (the script) and `level2.flag.py.enc` (the encrypted flag) files and opened the former with `python`.

Similar to [pw-crack-1](knowledge/off-sec/write-ups/picoCTF/pw-crack-1.md), the script asked for the password. The difference lies in how the password was hardcoded in the source code.

### Source code analysis

```python
def level_2_pw_check():
	user_pw = input("Please enter correct password for flag: ")
	if( user_pw == chr(0x64) + chr(0x65) + chr(0x37) + chr(0x36) ):
		print("Welcome back... your flag, user:")
		decryption = str_xor(flag_enc.decode(), user_pw)
		print(decryption)
		return
	print("That password is incorrect")
```

From the source code, I knew the password was a concatenated set of strings:
`chr(0x64) + chr(0x65) + chr(0x37) + chr(0x36)`.

I just printed it in Python's REPL:

```python
print (chr(0x64) + chr(0x65) + chr(0x37) + chr(0x36));

# output:
# de76
```

Again, it needed to be passed as a string:

```sh
$ python level2.py
Please enter correct password for flag: "de76"
Welcome back... your flag, user:
<redacted>
```

## Flag

`picoCTF{tr45h_51ng1ng_489dea9a}`
