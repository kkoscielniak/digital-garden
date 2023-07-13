---
title: tokens
---

A *token* on [Ethereum](/ethereum) is basically just a [smart contract](/knowledge/web3/smart-contracts.md) that implements a standard set of functions that all other token contracts share, such as:

- `transferFrom`
- `balanceOf`

Internally the smart contract usually has a [mapping](/knowledge/web3/solidity/mapping.md) that keeps track of how much balance each address has:

```solidity
mapping(address => uint256) balances
```

So basically a token is just a contract that keeps track of who owns how much of that token, and some functions so those users can transfer their tokens to other addresses.

> [!danger] ERC20
> By default, by _token_ we mean specifically an **ERC20 token**, but there are other standards of tokens.

## ERC20 token interoperability

Since all ERC20 tokens **share the same set of functions**, they can all be interacted with in the same ways.

If you build an application that is capable of interacting with one ERC20 token, it's also capable of interacting with any ERC20 token without any additional work to do (except plugging in another ERC20 token contract address).

In practice - when an exchange adds a new ERC20 token, really it just needs to add another smart contract it talks to. For the exchange example it means the transfers logic needs to be implemented once.

## Token standards

**ERC20** tokens are a go-to solution for currency-like usage. But they're not particularly useful for representing the _objects_, for example:

_Collectible_ isn't divisible like currency — transfering you 0.237 of a _collectible_ doesn't make sense. _Collectibles_ don't necesarrily have to be _equal_ (their internal state may differ, they may have different parameters and [rarity](/rarity)).

For collectibles a go-to solution is to use [ERC721](/knowledge/web3/ethereum/erc721.md) standard.
