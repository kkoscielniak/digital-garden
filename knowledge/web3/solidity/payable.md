---
title: payable modifier
---

`payable` denotes a function that can fund the [contract](/knowledge/web3/smart-contracts.md) and payout money from it to the users interacting with it.

```solidity
constructor() payable {
  console.log("We have been constructed!");
}
```

Missing the `payable` will cause `Non-payable constructor cannot override value` error.

## References

- [](/knowledge/web3/solidity/hardhat.md#`console.log`|console.log)
