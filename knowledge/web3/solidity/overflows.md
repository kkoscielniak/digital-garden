---
title: Overflows & Underflows
---

Let's say we have a `uint8`, which can only have 8 bits. That means the largest number we can store is binary `11111111` (or in decimal, 2^8 - 1 = 255).

If we'd call:

```
uint8 number = 255;
number++;
```

We've cause an _overflow_ — so `number` is counterintuitively now equal to `0` even though we increased it. (If you add 1 to binary `11111111`, it resets back to `00000000`).

An _underflow_ is similar, where if you subtract `1` from a `uint8` that equals `0`, it will now equal `255` (because `uint`s are unsigned, and cannot be negative).

It seems unlikely that a `uint256` would overflow as 2^256 is a really big number, but it's still good to put protections in our contract so that our [dApps](/knowledge/web3/solidity/dapps.md) are safe from unexpected behaviour.

To prevent overflows and underflows, we can use [SafeMath](/knowledge/web3/solidity/safemath.md) library.
