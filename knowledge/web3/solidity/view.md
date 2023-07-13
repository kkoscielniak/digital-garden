---
title: view function modifier
---

A `view` function modifier in [solidity](/knowledge/web3/solidity/solidity.md) denotes a function used for _reading_ data from the [smart contract](/knowledge/web3/smart-contracts.md).

When we read data from the smart contract, no [transaction](/knowledge/web3/transaction.md) is made and the [gas-fee](/knowledge/web3/ethereum/gas-fee.md) is not applied, since we're not making any changes to the [blockchain](/knowledge/web3/blockchain.md).

```solidity
function getAllWaves() public view returns (Wave[] memory) {
    return waves;
}
```
