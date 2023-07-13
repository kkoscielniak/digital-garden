---
title: Libraries
---

In web3 ecosystem in general, libraries take form of the special types of [smart-contracts](/knowledge/web3/smart-contracts.md) in [solidity](/knowledge/web3/solidity/solidity.md).

- [SafeMath](/knowledge/web3/solidity/safemath.md)

## SafeMath library declaration example

```solidity
library SafeMath {
  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }

    // ...sub, mul, div funcions
}
```

We create a library with `library` keyword.

Libraries allow us to use the `using` keyword, which automatically tacks on all of the library's methods to another data type:

```solidity
using SafeMath for uint;

// now we can use these methods on any uint
uint test = 2;
test = test.mul(3); // test now equals 6
test = test.add(5); // test now equals 11
```

When we declare `using SafeMath for uint`, the `uint` we call the function on (`test`) is automatically passed in as the first argument.

Basically `add` just adds 2 `uint`s like `+`, but it also contains an [assert](/knowledge/web3/solidity/assert.md) to make sure the sum is greater than `a`. This protects us from [overflows](/knowledge/web3/solidity/overflows.md).
