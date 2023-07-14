---
title: mapping
---

_Mapping_ is one of ways of storing organized data in [solidity](/knowledge/web3/solidity/solidity.md).

It's essentially a key-value store for storing and looking up data.

Mappings act as hash tables consiting of key-value pairs.

```solidity
mapping(_KeyType => _ValueType) public mappingName
```

Mappings are frequently used to associate unique [[knowledge/web3/ethereum/ethereum|ethereum]] network address with value types, e.g. a user's address to theirr corresponding level in a game:

```solidity
mapping(address => uint) public userLevel;
```

We can only use mappings for [state-variable](/knowledge/web3/solidity/state-variable.md)s.

## Accessing value types from a mapping with key types

To identify user's level in a game we can create a function taking an address as a parameter:

```solidity
function currentLevel(address addr) public constant returns (uint) {
    return userLevel[addr];
}
```

A mapping can store many `_KeyTypes` to `_ValueTypes`. Eg. many users playing the games all at once and they can have their own corresponding `userLevel`.

## Default value

Mappings **don't have length** by design. They also don't have a concept of a key or value being set.

When mappings are initialized every possible key exists in the mappings and are mapped to _values whose byte-representations are all zeros_.

In details it goes like this:

When `userLevel` is initialized it’s done in such a way that every possible Ethereum address exists in the mapping and is mapped to a corresponding level of 0.

It doesn't matter whether it’s a random Ethereum user’s MetaMask address who perhaps has never even heard of the game before, or maybe an arbitrary smart contract on the Ethereum blockchain doing something totally unrelated. Our mapping still maps them to a _value whose byte-representation are all zeros_.

## Resources
- [Mappings in Solidity Explained in Under Two Minutes | by Doug Crescenzi | Upstate Interactive | Medium](https://medium.com/upstate-interactive/mappings-in-solidity-explained-in-under-two-minutes-ecba88aff96e)