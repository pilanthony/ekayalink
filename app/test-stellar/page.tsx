"use client";

import { Keypair, Horizon } from "@stellar/stellar-sdk";
import { useEffect, useState } from "react";

export default function TestStellarPage() {
  const [publicKey, setPublicKey] = useState("");
  
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    const keypair = Keypair.random();

     setPublicKey(keypair.publicKey());
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
    <div
        style={{
          minHeight: "100vh",
          background: "#000",
          color: "#fff",
          padding: "40px",
        }}
      >
      
      
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Stellar Testnet Wallet
      </h1>

      <div style={{ marginBottom: "20px" }}>
          <h3>Wallet Address</h3>

          <div
            style={{
              background: "#111",
              padding: "12px",
              borderRadius: "8px",
              wordBreak: "break-all",
            }}
          >
            {publicKey}
          </div>
        </div>

          <button
            onClick={checkBalance}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          ></button>

      <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #333",
            borderRadius: "10px",
          }}
        >
          <h3>Balance</h3>

          <h1>{balance} XLM</h1>

          <p>Stellar Testnet</p>
        </div>
    </div>
  );
}