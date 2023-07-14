---
title: mus1c
---

[Link to the exercise](https://play.picoctf.org/practice/challenge/15)

## Steps

After downloading and opening the `lyrics.txt` I saw somewhat cryptic lyrics of the _song_:

```Rockstar
Pico's a CTFFFFFFF
my mind is waitin
It's waitin

Put my mind of Pico into This
my flag is not found
put This into my flag
put my flag into Pico


shout Pico
shout Pico
shout Pico

My song's something
put Pico into This

Knock This down, down, down
put This into CTF

shout CTF
my lyric is nothing
Put This without my song into my lyric
Knock my lyric down, down, down

shout my lyric

Put my lyric into This
Put my song with This into my lyric
Knock my lyric down

shout my lyric

Build my lyric up, up ,up

shout my lyric
shout Pico
shout It

Pico CTF is fun
security is important
Fun is fun
Put security with fun into Pico CTF
Build Fun up
shout fun times Pico CTF
put fun times Pico CTF into my song

build it up

shout it
shout it

build it up, up
shout it
shout Pico
```

After a long while, I decided to check the hint, which suggested _mastering rockstar_. This little clue helped me to understand that the _song_ may be in fact the esoteric language.

I compiled the _song code_ in [Rockstar -> Try It](https://codewithrockstar.com/online) and got this output:

```ASCII
114
114
114
111
99
107
110
114
110
48
49
49
51
114
Program completed in 38 ms
```

I changed newlines into spaces and put the output into the ASCII to text converter. The flag was mine.

## Flag

`picoCTF{rrrocknrn0113r}`