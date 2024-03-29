import * as anchor from '@project-serum/anchor';
import {NodeWallet} from '@project-serum/common';
import * as serumCmn from '@project-serum/common';
import {
  AccountInfo,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {TokenInstructions} from '@project-serum/serum';
import * as spl from '@solana/spl-token';

export const isProd = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';

export const saleTime = isProd ? Date.now() / 1000 : Date.now() / 1000;

// TODO: 如果是正式環境，請確認這是正確的銷售數量
export const idoAmount = 5 * Math.pow(10, 6);

// TODO: 如果是正式環境，請確認這是正確的銷售目標
const watermelonMintString = isProd
  ? 'CPXDs2uhNwDKAt9V3vXvtspv9U7rsQ2fVr1qAUDmuCaq'
  : '5QhsyriyneDvoZCt9Cji5GyrXRZ1pfBoj372PQbZ3eVz';
export const watermelonMint = new anchor.web3.PublicKey(watermelonMintString);

// TODO: 如果是正式環境，請確認這是正確的 USDC
const usdcMintString = isProd
  ? 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
  : 'USDJcm54FNVW2VfqNwAFnHv1BTRFoFr9zCzfrtQbHxX';
export const usdcMint = new anchor.web3.PublicKey(usdcMintString);

export const secTrans = isProd ? 20 : 20;
export const preSecForStartIdo = isProd ? 60 * 10 : 60 * 3; // 60 * 10 10Min;
export const saveSec = isProd ? 60 * 60 * 24 : 60 * 60 * 1; // 60 * 60 * 24 24H
export const endForEndIdo = isProd ? saveSec * 2 : saveSec * 2; // 60 * 60 * 24 * 2 48H

export async function getTokenAccount(
  provider: anchor.Provider,
  addr: anchor.web3.PublicKey,
): Promise<AccountInfo> {
  return await serumCmn.getTokenAccount(provider, addr);
}

export async function findTokenAccount(
  wallet: anchor.web3.PublicKey,
): Promise<anchor.web3.PublicKey> {
  const associatedPublicKey = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    watermelonMint,
    wallet,
  );

  return associatedPublicKey;
}

export async function createTokenAccount(
  provider: anchor.Provider,
  mint: anchor.web3.PublicKey,
  owner: anchor.web3.PublicKey,
): Promise<anchor.web3.PublicKey> {
  const token = new spl.Token(
    provider.connection,
    mint,
    TokenInstructions.TOKEN_PROGRAM_ID,
    (provider.wallet as any).payer,
  );
  const vault = await token.createAccount(owner);
  return vault;
}

export function getConnectionString(): string {
  let connectionString = isProd
    ? 'https://api.mainnet-beta.solana.com'
    : 'http://localhost:8899';
  connectionString = isTest
    ? 'https://api.devnet.solana.com'
    : connectionString;

  return connectionString;
}

export const connection = new anchor.web3.Connection(getConnectionString());
export const provider = new anchor.Provider(
  connection,
  NodeWallet.local(),
  anchor.Provider.defaultOptions(),
);

export const IDOSALE_Program_ID =
  'BvQQDMTy9XunH3muJaz6sckwpjyEeEvUqUowpSXBGVW7';
