"use client";

import { Keypair, Horizon } from "@stellar/stellar-sdk";
import { useEffect, useState } from "react";

export default function TestStellarPage() {
  const [publicKey, setPublicKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    const keypair = Keypair.random();

    setPublicKey(keypair.publicKey());
    setSecretKey(keypair.secret());
  }, []);

  async function checkBalance() {
  try {
    const server = new Horizon.Server(
      "https://horizon-testnet.stellar.org"
    );

    const account = await server.loadAccount(publicKey);

    const nativeBalance = account.balances.find(
      (b) => b.asset_type === "native"
    );

    if (nativeBalance) {
      setBalance(nativeBalance.balance);
    }
  } catch (error) {
    console.error(error);
    alert("Account not funded or not found.");
  }
}

  return (
    <div style={{ padding: "20px" }}>
      <h1>eKayaLink Stellar Test</h1>

      <p>
        <strong>Public Key:</strong>
      </p>
      <p>{publicKey}</p>

      <p>
        <strong>Secret Key:</strong>
      </p>
      <p>{secretKey}</p>

       <button onClick={checkBalance}>
          Check Balance
      </button>

      <p>
      <strong>XLM Balance:</strong> {balance}
    </p>
    </div>
  );
}