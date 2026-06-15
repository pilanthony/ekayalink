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