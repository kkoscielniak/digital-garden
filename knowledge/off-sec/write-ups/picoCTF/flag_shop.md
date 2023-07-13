---
title: flag_shop
---

[Link to the exercise](https://play.picoctf.org/practice/challenge/49)

## Steps

The exercise uses a simple server application that allows _buying the flag_, but initially, we don't have enough _funds_ to do so. The problem is how to get more funds by exploiting the server.

Fortunately, the author left the [source code](https://jupiter.challenges.picoctf.org/static/253c4651d852ac6342752ff222cf2a83/store.c) for reference. I am not that proficient in C, I've been using it a few years ago at the university, but I tried to hack this one nonetheless.

The only place where I am able to anything is when I get into `Buy flags -> Definitely not the flag Flag`. _Buying_ this one won't get me the flag needed to pass the exercise, it'll just adjust the _funds_ (or: `account_balance`) accordingly.

### Source code analysis

There are some suspicious looking lines of code in the source:

```c
int total_cost = 0;
total_cost = 900 * number_flags;
```

Both `total_cost` and `number_flags` are Integers, which means their the maximum value is `2147483647` (adding `1` will result in a signed int of `-2147483648`).

The `number_flags` is the only variable I can change.

Also:

```c
account_balance = account_balance - total_cost;
```

The `account_balance` is an Integer as well. It's decreased by the `total_cost`. That'd mean if I'd be able to make `total_cost` negative, the `account_balance` **would increase** (base maths, _negative_ + _negative_ => _positive_).

### Making `total_cost` negative

So how can we make `total_cost` negative?

Let's get back to the integer overflowing idea. I've opened an online C compiler and tried to mess with the values:

```c
#include <stdio.h>

int main()
{
    int x = 2147483647 + 1; // overflowed to -2147483648
    int y = 900 * x;
    printf("number_flags: %d\ntotal_cost: %d", x, y);

    return 0;
}

// Output:
// number_flags: -2147483648
// total_cost: 0
```

That's no good. `900 * -2147483648` resulted in this:

```sh
warning: overflow in conversion from ‘long int’ to ‘int’ changes value from ‘-1932735283200’ to ‘0’ [-Woverflow]
```

Let's try another:

```c
int x = 2147483647 + 10; // overflowed to -2147483639
int y = 900 * x;

// Output:
// number_flags: -2147483639
// total_cost: 8100
```

Yay, we've increased the `total_cost`! But it's not enough to finish the task, as we need to make it negative.

> The thing is that we'd need to find such a value for incrementing the maximum integer value of `2147483647` to make the `900 * result` overflowing and becoming negative as well.

I've been appending zeros to the `x` increment to the point when the `total_cost` would become negative. I've settled with that:

```c
#include <stdio.h>

int main ()
{
  int x = 2147483647 + 100000000;
  int y = 900 * -2047483649;
  printf ("number_flags: %d \ntotal_cost: %d", x, y);

  return 0;
}

// Output:
// number_flags: -2047483649
// total_cost: -194314116
```

### Grabbing the flag

Ultimately I've opened the server once again, tried to _buy_ `100000000` flag knockoffs and my `account_balance` increased to `194314316`, which was enough to buy the final flag. Problem solved 💪

## Disclaimer

As I said, at the time of writing this I am not that proficient in C, and the numeric systems are still a bit of the open waters to me. Probably I could find the easier way of increasing the `account_balance`. But thanks to that meddling I was able to find the flag and that's most important to me 😉

## Flag

`picoCTF{m0n3y_bag5_65d67a74}`
