"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SendMoneyPage() {
  const [receiverName, setReceiverName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMoney = async () => {
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
          receiver_name: receiverName,
          amount: Number(amount),
          status: "Pending",
        },
      ]);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Transaction saved successfully!");
      setReceiverName("");
      setAmount("");
    }
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">
        Send Money
      </h1>

      <div className="max-w-md space-y-4">

        <input
          type="text"
          placeholder="Receiver Name"
          value={receiverName}
          onChange={(e) => setReceiverName(e.target.value)}
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