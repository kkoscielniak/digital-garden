---
title: Comments
---

The standard in the [solidity](/knowledge/web3/solidity/solidity.md) community is to use a format called [natspec](https://docs.soliditylang.org/en/v0.8.16/natspec-format.html), which looks like this:

```solidity
/// @title A contract for basic math operations
/// @author H4XF13LD MORRIS 💯💯😎💯💯
/// @notice For now, this contract just adds a multiply function
contract Math {
  /// @notice Multiplies 2 numbers together
  /// @param x the first uint.
  /// @param y the second uint.
  /// @return z the product of (x * y)
  /// @dev This function does not currently check for overflows
  function multiply(uint x, uint y) returns (uint z) {
    // This is just a normal comment, and won't get picked up by natspec
    z = x * y;
  }
}
```

`@notice` explains to a **user** what the contract / function does. `@dev` is for explaining extra details to developers. At the very least, leave a `@dev` note explaining what each function does.
