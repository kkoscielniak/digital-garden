---
title: GET aHEAD
---

[Link to the exercise](https://play.picoctf.org/practice/challenge/132)

## Steps

First, I've opened the "server" application. What I saw were two buttons that changed the background color on click. From the source code I got to know that a background color to set was determined by the request method:

- `GET /index.php` to the red background
- `POST /index.php` to the blue one

Using [Burp Suite] I've intercepted the requests and changed their method type. First I tried the `PUT` method, which made the background white. But it wasn't enough to solve the puzzle. I tried to use `DELETE` then with the same results.

A bit bummed I took a look at the exercise name, and even though I never heard of the [`HEAD` request method](https://reqbin.com/Article/HttpHead) before, I tried to use that. Bingo 😁

Ultimately, the flag was hidden in the `HEAD /index.php` request-response.

## Flag

I don't remember and I closed Burp Suite already 😅
