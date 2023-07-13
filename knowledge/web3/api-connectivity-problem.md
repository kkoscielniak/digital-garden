---
title: The API Connectivity problem
---

Due to the deterministic nature of the [blockchain](/knowledge/web3/blockchain.md) we can't use APIs in the [smart-contracts](/knowledge/web3/smart-contracts.md) directly.

If we'd want to send a variable amount based on the price of ETH to Alice from Bob’s account, we'd have our contract call an API to get the price of ETH and then send that amount to Bob. When every other node goes to verify this, they also have to call this API.

However, the API and/or its response may change:

- the API could be hacked, deprecated or broken
- the response may change depending on the timing

The different blockchain nodes might get different API responses (or didn't get them at all). That means the blockchain wouldn't be able to verify transactions, as the different nodes would be in different states and wouldn't be able to agree on the actual one.
