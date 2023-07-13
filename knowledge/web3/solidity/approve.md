---
title: approve fn
---

The `approve` function is used to _enable_ the user to _approve_ the transfer (once the owner allows for that transfer first).

```solidity
function transferFrom(address _from, address _to, uint256 _tokenId) external payable;

function approve(address _approved, uint256 _tokenId) external payable;`
```

The token's **owner** first calls `approve` with the address he wants to transfer to, and the `_tokenID` . The contract then stores who is approved to take a token, usually in a [mapping](/knowledge/web3/solidity/mapping.md) `(uint256 => address)`.

Then, when the owner or the approved address calls `transferFrom`, the contract checks if that `msg.sender` is the owner or is approved by the owner to take the token, and if so it transfers the token to him.

In the [transferFrom](/knowledge/web3/solidity/transferfrom.md) only case the sender of the token calls the `transferFrom` function; in this case the owner or the approved receiver of the token calls it.

> [!question] Best way for airdropping?
