---
title: transaction
---

Every function that is called on the blockchain is considered a _transaction_ which means the [gas-fee](/knowledge/web3/ethereum/gas-fee.md) is applicable (unless the function is a [view](/knowledge/web3/solidity/view.md)).

Deploying a [smart contract](/knowledge/web3/smart-contracts.md) is a transaction as well.

## Mining the transactions

Transactions are [mined](/mined) by the [miners](/miners):

1. We broadcast our transaction
2. Wait for it to be picked up by actual miners
3. Wait for it to be mined
4. Wait for it to be broadcasted back to the blockchain telling all the other miners to update their copies
