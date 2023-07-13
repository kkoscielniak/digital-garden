---
title: event
---

On a basic level, an `event` in [solidity](/knowledge/web3/solidity/solidity.md) is a message the [smart-contracts](/knowledge/web3/smart-contracts.md) throw out that can be captured in a client **in real time**.

## Example

```solidity
// defining an event
event NewWave(address indexed from, uint256 timestamp, string message);

// calling an event
emit NewWave(msg.sender, block.timestamp, _message);
```
