---
title: gas fee
---

In [Ethereum network](/ethereum%20network) the _gas_ is a _fuel_ the [dApps](/knowledge/web3/solidity/dapps.md) run on.

Every time the user executes a function on a [Ethereum network](/ethereum%20network), he has to pay for it in ETH.

How much gas is required to execute a particular function depends on its complexity. Each individual operation (like writing to a storage, or adding two numbers) has a **_gas cost_** based roughly on how much computing resources will be required to perform that operation.

The overall _gas fee_ is a sum of all these gas costs.

## Why is gas necessary?

[Ethereum network](/ethereum%20network) is like a big, slow, but extremely secure computer. When you execute a function, every single node on the network needs to run that same function to verify its output — thousands of nodes verifying every function execution is what makes Ethereum decentralized, and its data immutable and censorship-resistant.

The creators of Ethereum wanted to make sure someone couldn't clog up the network with an infinite loop, or hog all the network resources with really intensive computations. So they made it so transactions aren't free, and users have to pay for computation time as well as storage.

## Gas fee estimation

Every time a user tries to call a function on a [smart-contracts](/knowledge/web3/smart-contracts.md), the [crypto-wallet](/knowledge/web3/crypto-wallet.md) will try to estimate the gas fee. However, the estimation may not be precise, especially if some degree of [randomness](/randomness) is involved.

It's possible to _limit_ how much of gas the user would want to pay for calling the function, e.g. in [ethers](/knowledge/web3/frontend/ethers.md).

## Optimisation

Because every function costs real money, code optimisation is extremely important. There are some pretty simple ways to optimise the code:

- [struct-packing](/knowledge/web3/solidity/struct-packing.md)
