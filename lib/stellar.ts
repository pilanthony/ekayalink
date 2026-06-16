import {
  Horizon,
  TransactionBuilder,
  Operation,
  Asset,
  Networks,
} from "@stellar/stellar-sdk";

export const server = new Horizon.Server(
  "https://horizon-testnet.stellar.org"
);

export {
  TransactionBuilder,
  Operation,
  Asset,
  Networks,
};

export async function loadAccount(publicKey: string) {
  return await server.loadAccount(publicKey);
}

export async function fundTestnetAccount(publicKey: string) {
  const response = await fetch(
    `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fund account");
  }

  return await response.json();
}

export async function getAccountBalance(
  publicKey: string
) {
  const account = await server.loadAccount(
    publicKey
  );

  const balance = account.balances.find(
    (b: any) => b.asset_type === "native"
  );

  return balance?.balance || "0";
}