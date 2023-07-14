---
title: LFI CTF 2
---

[Link to the exercise](https://tryhackme.com/room/fileinc)

## Goal

Similarly to [lfi-ctf-1](knowledge/off-sec/write-ups/thm/lfi-ctf-1.md), the goal is to capture the flag at `/etc/flag2` using [lfi](knowledge/off-sec/pentesting/lfi.md).

## Steps

### Recon

The PHP application forced me to refresh itself at the very first contact. After refreshing the page, the cookie named `THM` was set with `Guest` as the value.

By chaning `Guest` to `Administrator`, I've been able to see the file inclusion error:

```
Warning: include(includes/Administrator.php) [function. include]: failed to open stream: No such file or directory in /var/www/html/chall2.php on line 37
Warning: include() [function. include]: Failed opening 'includes/Administrator. php' for inclusion (include_path='.:/usr/lib/php5.2/lib/php') in /var/www
/html/chall2.php on line 37
```

From the error it's kinda obvious that the username set in `THM` cookie is also an included file name.

To validate the idea, I've changed the cookie value to `Dupa` and saw the same error, but with `Dupa.php` file missing (btw, nice privileges management).

### Exploitation

I've changed the cookie value once more to `../../../../../etc/flag2%00` (using the [null byte](knowledge/off-sec/pentesting/null-byte.md) to omit `php` extension in `include` fn). After refreshing the page flag was mine.

![](/public/lfi-ctf-2.png)

## Flag

`c00k13_i5_yuMmy1`
