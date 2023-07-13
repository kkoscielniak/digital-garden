---
title: require function
---

`require` [[knowledge/web3/solidity/function|function]] checks if the condition passed as an argument is `true`.

If it's not, the function will quit and the [[knowledge/web3/transaction|transaction]] will cancel.

## Example

```solidity
require(
    prizeAmount <= address(this).balance, // condition
    "Trying to withdraw more money than the contract has." // error message
);
```
