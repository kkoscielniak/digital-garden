---
title: inheritance
---

In [solidity](/knowledge/web3/solidity/solidity.md), to inherit from a contract, use `is` keyword:

```solidity
import "./zombieattack.sol";

contract ZombieOwnership is ZombieAttack {

}
```

It's possible to inherit from multiple contracts as follows:

```solidity
import "./zombieattack.sol";
import "./zombieforces.sol";

contract ZombieOwnership is ZombieAttack, ZombieForces {

}
```
