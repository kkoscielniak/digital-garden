---
title: Hardhat
---

[Hardhat](https://hardhat.org/docs) is a development environment for [smart-contracts](/knowledge/web3/smart-contracts.md) that aids editing, compiling, debugging and deploying smart contracts and [dApps](/knowledge/web3/solidity/dapps.md).

In practice it's a local development enviroment for [solidity](/knowledge/web3/solidity/solidity.md) that spins up the [[knowledge/web3/ethereum/ethereum|ethereum]] network for development and gives you fake ETH, and fake test accounts to work with the smart contract being developed. Also, it handles the `owner` address for you as well.

## `hre`

HRE (the _Hardhat Runtime Environment_) is an object containing all the functionality Hardhat exposes when running a task, test or script.

Every time you run a `hardhat` command the `hre` object is built on the fly using the `hardhat.config.js`.

## `hardhat.config.js`

```ts
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.STAGING_QUICKNODE_KEY,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
};

export default config;
```

Defines the [solidity](/knowledge/web3/solidity/solidity.md) version to be used and [blockchain](/knowledge/web3/blockchain.md)s to target.

> [!danger] Mind the compiler version
>
> The compiler version set by [pragma](/knowledge/web3/solidity/pragma.md)s in `*.sol` files has to be the same as in `hardhat.config.js`.

In this case the [Goerli network](/knowledge/web3/ethereum/goerli.md) is defined through [QuickNode](/knowledge/web3/quicknode.md):

- `STAGING_QUICKNODE_KEY` - an endpoint created in [QuickNode](/knowledge/web3/quicknode.md)
- `PRIVATE_KEY` - a **private** key of the [crypto-wallet](/knowledge/web3/crypto-wallet.md) used for deploying the [contract](/knowledge/web3/smart-contracts.md).
  - this can be taken from [[knowledge/web3/crypto-wallet|MetaMask]]

## `run.ts` and `deploy.ts`

Hardhat can be used to locally run the smart contract and to deploy it to an Ethereum network.

Typically it's good to create 2 files in `/scripts/`:

- `run.ts`
- `deploy.ts`

> [!danger] Hardhat is very strict about project tree

```sh
npx hardhat run scripts/run.ts
npx hardhat run scripts/deploy.ts --network goerli
```

### `run.ts`

```sh
npx hardhat run scripts/run.ts
```

Used for compiling the smart contract, running it, testing and debugging locally.

Hardhat will create a local Ethereum network, just for this contract. After the script completes it'll destroy that local network. Every time you run the contract, it'll be a fresh blockchain.

```ts
// WavePortal is the contract name

const main = async () => {
  // get an owner and the non-owner addresses for testing
  const [owner, randomPerson] = await hre.ethers.getSigners();

  // compile the contract and generate necessary files under `/artifacts` dir
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

  // deploy the smart contract to a local network and wait for the deployment to finish
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  // get waves from `view` function
  await waveContract.getTotalWaves();

  // make wave transactino
  const waveTxn = await waveContract.wave();

  // wait for the transaction to be mined
  await waveTxn.wait();
  await waveContract.getTotalWaves();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
```

### `deploy.ts`

```sh
npx hardhat run scripts/deploy.ts --network goerli
```

Used to deploy to a real blockchain (in this case to [Goerli Testnet](/knowledge/web3/ethereum/goerli.md)).

```ts
const main = async () => {
  // get an owner address for deployment (the person who deploys)
  const [deployer] = await hre.ethers.getSigners();

  // get the owners balance
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    // funding the contract
    value: hre.ethers.utils.parseEther("0.001"),
  });
  await waveContract.deployed();

  console.log("WavePortal address: ", waveContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
```

### Funding the contract

During the deployment it's possible to _fund_ the contract so it can send money to the users who interact with it (e.g. for prizes).

## `hardhat node`

Creates a local [[knowledge/web3/ethereum/ethereum|ethereum]] network that stays alive until killed by **CTRL + C**.

## Hardhat for VS Code

An extension that adds Solidity language support and provides editor integration for Hardhat-based projects.

## `console.log`

Solidity doesn't have any `console.log` equivalent out-of-the-box. Hardhat fills that void with an implementation:

```solidity
import "hardhat/console.sol";

constructor() {
    console.log("Here I am!");
}
```
