"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { server, loadAccount } from "@/lib/stellar";
import { getWalletAddress } from "@/lib/freighter";

export default function SendMoneyPage() {
  const router = useRouter();
  const [destinationAddress, setDestinationAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMoney = async () => {

    if (!destinationAddress) {
    setMessage("Destination wallet address is required");
    return;
  }

  if (!amount) {
    setMessage("Amount is required");
    return;
  }

  if (Number(amount) <= 0) {
    setMessage("Amount must be greater than zero");
    return;
  }

  if (!destinationAddress.startsWith("G")) {
    setMessage("Invalid Stellar wallet address");
    return;
  }

  const senderAddress = await getWalletAddress();

if (senderAddress?.address === destinationAddress) {
  setMessage("You cannot send money to your own wallet");
  return;
}

    console.log("DESTINATION:", destinationAddress);

  const destinationAccount = await loadAccount(
      destinationAddress
    );

    console.log(
      "DESTINATION ACCOUNT:",
      destinationAccount
    );

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const user = session?.user;

    if (!user) {
      setMessage("User not logged in");
      return;
    }

    const { error } = await supabase
      .from("transactions")
      .insert([
        {
          sender_id: user.id,
          receiver_name: destinationAddress,
          amount: Number(amount),
          status: "Pending",
        },
      ]);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Transaction saved successfully!");
      setDestinationAddress("");
      setAmount("");
    }
  };

  return (
    <main className="min-h-screen p-8">
        <button
        onClick={() => router.push("/dashboard")}
        className="border rounded-lg px-4 py-2 mb-6"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-4xl font-bold mb-6">
        Send Money
      </h1>

      <div className="max-w-md space-y-4">

        <input
          type="text"
          placeholder="Destination Wallet Address"
          value={destinationAddress}
          onChange={(e) => setDestinationAddress(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <button
          onClick={handleSendMoney}
          disabled={!destinationAddress || !amount}
          className="w-full border rounded-lg p-3"
        >
          Send Money
        </button>

        {message && (
          <p>{message}</p>
        )}

      </div>
    </main>
  );
}