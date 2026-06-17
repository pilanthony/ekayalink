"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import {
  getWalletAddress,
  signTransaction,
} from "@/lib/freighter";

import {
  server,
  loadAccount,
  TransactionBuilder,
  Operation,
  Asset,
  Networks,
} from "@/lib/stellar";

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

  const cleanDestination =
  destinationAddress.trim();

console.log(
  "DESTINATION RAW:",
  destinationAddress
);

console.log(
  "DESTINATION CLEAN:",
  cleanDestination
);

const senderAddress =
  await getWalletAddress();  

    if (!senderAddress) {
    setMessage("Please connect your Freighter wallet first");
    return;
  }

    if (senderAddress?.address === cleanDestination) {
      setMessage("You cannot send money to your own wallet");
      return;
    }

    const senderAccount = await loadAccount(
      senderAddress!.address
    );

    console.log(
      "SENDER ACCOUNT:",
      senderAccount
    );

    console.log("DESTINATION:", destinationAddress);

  try {
    const destinationAccount = await loadAccount(
    cleanDestination
        );

      console.log(
        "DESTINATION ACCOUNT:",
        destinationAccount
        );
      } catch (error:any) {
        console.error(
          "DESTINATION ACCOUNT ERROR:",
          error
  );

  setMessage(
    `Destination error: ${error?.message}`
  );

  return;
}
    const transaction = new TransactionBuilder(
  senderAccount,
  {
    fee: "100",
    networkPassphrase:
      Networks.TESTNET,
  }
)
  .addOperation(
    Operation.payment({
      destination:
        cleanDestination,
      asset: Asset.native(),
      amount:
        amount,
    })
  )
  .setTimeout(30)
  .build();

console.log(
  "TRANSACTION:",
  transaction
);

const signed = await signTransaction(
  transaction.toXDR(),
  {
    networkPassphrase:
      Networks.TESTNET,
  }
);

const response = await server.submitTransaction(
  TransactionBuilder.fromXDR(
    signed.signedTxXdr,
    Networks.TESTNET
  )
);

console.log(
  "TX HASH:",
  response.hash
);

console.log(
  "SUBMIT RESPONSE:",
  response
);

console.log(
  "SIGNED:",
  signed
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
          status: "Completed",
          stellar_hash: response.hash,
        },
      ]);

          if (error) {
        setMessage(error.message);
      } else {
        setMessage(
          "Transaction completed successfully!"
        );

        setDestinationAddress("");
        setAmount("");

        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
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