![logo](https://gitcdn.link/repo/Circelpod/Circlepod-Protocol/master/banner.png)

# Circlepod-Protocol
Circlepod Protocol is Podcast with NFT, create more interactivity and entertainment. Link fans and value through blockchain technology to form a good copyright and subscription ecosystem.

[READ MORE](https://xiaorangetech.gitbook.io/circlepod-protocol/)

# Environment Setup
1. Install Rust from https://rustup.rs/
2. Install Solana v1.6.7 or later from https://docs.solana.com/cli/install-solana-cli-tools#use-solanas-install-tool
3. Install Node
4. Install NPM, Yarn

# Directory structure

## program

Solana program template in Rust

### program/src/lib.rs
* process_instruction function is used to run all calls issued to the smart contract

## src/actions

Setup here actions that will interact with Solana programs using sendTransaction function

## src/contexts

React context objects that are used propagate state of accounts across the application

## src/hooks

Generic react hooks to interact with token program:
* useUserBalance - query for balance of any user token by mint, returns:
    - balance
    - balanceLamports
    - balanceInUSD
* useUserTotalBalance - aggregates user balance across all token accounts and returns value in USD
    - balanceInUSD
* useAccountByMint
* useTokenName
* useUserAccounts

## src/views

* home - main page for your app
* faucet - airdrops SOL on Testnet and Devnet

## Contract

> 使用 `yarn lanch` 可以快速建立環境，建置與部署。

### SPL Token use

`spl-token mint 4CbuRj5io3PmQTEorMzxGLivrmNNiJdxo7QUtTfV4aCT 1000`

`spl-token transfer --fund-recipient 4CbuRj5io3PmQTEorMzxGLivrmNNiJdxo7QUtTfV4aCT 500 DWAGPSj9h1ds2ezvwegnwCHiVzPhAHoBNthPMo6G17hE`

### Tests

`lockup.js`
lockup.js 是對於合約 `staking-lockup` 與 `staking-registry` 的整合測試，可以使用指令 `yarn test:lockup` 執行。其中如果是第一次執行需要把 `Deletes the default whitelisted addresses` 測試項目打開。

> 執行前記得先部署合約或使用 `yarn lanch`

# TIPs

切換部署環境
`solana config set --url https://api.devnet.solana.com`
`solana config set --url localhost`

[本地區塊鏈 explorer](https://explorer.solana.com/?cluster=custom&customUrl=http%3A%2F%2Flocalhost%3A8899)

如果你需要同步本地 validator，請使用下列指令(macos)，通常是需要 `ctx.accounts.clock.unix_timestamp`
[文件](https://docs.solana.com/developing/test-validator)
`rm -rf ~/test-ledger && solana-test-validator`

查看目前 Solana cli 使用的錢包
[文件](https://docs.solana.com/cli/transfer-tokens)
`solana-keygen pubkey`
