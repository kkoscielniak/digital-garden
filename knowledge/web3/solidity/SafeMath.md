---
title: SafeMath
---

`SafeMath` is a [library](/knowledge/web3/solidity/libraries.md) created by [OpenZeppelin](https://www.openzeppelin.com/) to make sure math operations won't cause the [overflows](/knowledge/web3/solidity/overflows.md).

## Example

`SafeMath` attaches 4 functions — `add`, `sub`, `mul`, and `div` to native data types. We can access them from `uint256` as follows:

```
using SafeMath for uint256;

uint256 a = 5;
uint256 b = a.add(3); // 5 + 3 = 8
uint256 c = a.mul(2); // 5 * 2 = 10
```

> [!tip]
>
> It's a good idea in general to just use SafeMath instead of the basic math operations. Maybe in a future version of Solidity these will be implemented by default, but for now we have to take extra security precautions in our code.

> [!danger]
>
> `SafeMath` library is designed for `uint256` type. For `uint16`/`32` you need to implement the library yourself or use an existing implementation (?)
