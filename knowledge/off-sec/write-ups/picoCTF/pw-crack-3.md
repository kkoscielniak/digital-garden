---
title: PW Crack 3
tags:
  - ctf
  - picoctf
---

[Link to the exercise](https://play.picoctf.org/practice/challenge/247)

This one is similar, but a bit harder than [pw-crack-1](knowledge/off-sec/write-ups/picoCTF/pw-crack-1.md) and [pw-crack-2](knowledge/off-sec/write-ups/picoCTF/pw-crack-2.md).

## Steps

First I downloaded the files:

- `level3.py` - the script
- `level3.flag.py.enc` - the encrypted flag
- `level3.hash.bin` - the hash of the encrypted password

As suggested, I've also installed `bvi` (or "binary vi") from _brew_ (ultimately I didn't need it, but it's good to know such a program exists).

### Source code analysis

The source code for this one differed a bit from the previous exercises. Namely - the password that the script asked for was read from the binary file.

To compare what's read from the file with what I put into the script, this function hashed the input string:

```python
def hash_pw(pw_str):
	pw_bytes = bytearray()
	pw_bytes.extend(pw_str.encode())
	m = hashlib.md5()
	m.update(pw_bytes)
	return m.digest()
```

Also, there was a list of possible passwords and one of them _should_ work.

I could just go one by one and put them in, but it wouldn't be performant, so I decided to open `level3.hash.bin` in VS Code first and check what's the content. This is what it looked like:

```
�`E��BC�;���Ϣi�
```

I wrote a simple function that'd iterate over the array of possible passwords and print the hashes for them:

```python
pos_pw_list = ["8799", "d3ab", "1ea2", "acaf", "2295", "a9de", "6f3d"]

for p in pos_pw_list:
	print(hash_pw(p))
```

The third hash looked exactly the same as the one in `level3.hash.bin`:

```
�;�qlģ�/9��s
+&�A��)HBf�C
�`E��BC�;���Ϣi� // <-- this one
=�9d�=�����1�-
m`��TA45���&
��秦����=��F��L
��V�Jx��CR���j
```

...so I just tried the third password from the array and it worked 😁

> Note: this time I've had to put it in the prompt without quotes

## Flag

`picoCTF{m45h_fl1ng1ng_6f98a49f}`
