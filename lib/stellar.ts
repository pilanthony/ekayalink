import { Horizon } from "@stellar/stellar-sdk";

export const server = new Horizon.Server(
  "https://horizon-testnet.stellar.org"
);

export async function loadAccount(publicKey: string) {
  return await server.loadAccount(publicKey);
}