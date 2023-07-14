---
title: LFI CTF #1
---

[Link to the exercise](https://tryhackme.com/room/fileinc)

## Goal

Capture Flag1 at `/etc/flag1` using [lfi](knowledge/off-sec/pentesting/lfi.md).

## Steps

After spinning up the VM, I've opened the `/challenges/chall1.php` to see that `POST` param is used to include file contents into the web application.

I've opened Postman app (provided by THMs AttackBox) and called the PHP script with `file` request parameter:

![](/public/lfi-ctf-1.png)

## Flag

`F1x3d-iNpu7-f0rrn`
