"use client";

import { connectFreighter } from "@/lib/freighter";
import {
  fundTestnetAccount,
  getAccountBalance,
} from "@/lib/stellar";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [email, setEmail] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [balance, setBalance] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  
  const [stellarAddress, setStellarAddress] = useState("");
  
  const [transactions, setTransactions] = useState<any[]>([]);
  const [freighterStatus, setFreighterStatus] = useState("");

  const [status, setStatus] = useState("");
  const router = useRouter();
  

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    };

  const handleConnectWallet = async () => {
  console.log("CONNECT BUTTON CLICKED");

  const result = await connectFreighter();

  if (!result?.address) {
  alert("No wallet address returned");
  return;
}

const {
  data: { session },
} = await supabase.auth.getSession();

const user = session?.user;

if (!user) {
  alert("User session not found");
  return;
}

const { error } = await supabase
  .from("wallets")
  .update({
    stellar_public_key: result.address,
  })
  .eq("user_id", user.id);

if (error) {
  console.error(error);
  alert("Failed to save wallet");
  return;
}

  console.log("RESULT:", result);

  setFreighterStatus(
  "Wallet Connected Successfully!"
);

alert(
  "Wallet Connected Successfully!"
);

};
  
  useEffect(() => {
    async function loadUser() {
const { data, error } = await supabase.auth.getSession();

console.log("SESSION DATA:", data);
console.log("SESSION ERROR:", error);

const user = data.session?.user;

if (!user) {
  setStatus("NO USER SESSION FOUND");
  return;
}

const { data: transactionsData, error: transactionsError } =
  await supabase
    .from("transactions")
    .select("*")
    .eq("sender_id", user.id)
    .order("created_at", { ascending: false });

if (!transactionsError) {
  setTransactionCount(transactionsData?.length || 0);
  setTransactions(transactionsData || []);
}

  setEmail(user.email || "");
 

const { data: wallets, error: walletError } = await supabase
  .from("wallets")
  .select("*")
  .eq("user_id", user.id);

if (walletError) {
  setStatus(`WALLET ERROR: ${walletError.message}`);
  return;
}

if (wallets && wallets.length > 0) {
  const wallet = wallets[0];

  console.log("WALLET RECORD:", wallet);

  try {
  const stellarBalance = await getAccountBalance(
    wallet.stellar_public_key
  );

  setBalance(Number(stellarBalance));
} catch (error) {
  console.error(
    "Balance fetch failed:",
    error
  );
}

  setStellarAddress(wallet.stellar_public_key || "");
  setStatus(`Wallet Connected`);
} else {
  setStatus("Wallet Not Found");
}

}

    loadUser();
  }, []);

  return (
    <main className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">
            eKayaLink Dashboard
        </h1>

        <button
            onClick={handleLogout}
            className="border rounded-lg px-4 py-2"
        >
            Logout
        </button>
        </div>

      <p className="mb-6">
        Welcome: {email}
      </p>

      <div className="mt-4">
        <button
          onClick={handleConnectWallet}
          className="border rounded-lg px-4 py-2"
        >
          Connect Wallet
        </button>

        <button
            onClick={() => router.push("/send-money")}
            className="border rounded-lg px-4 py-2 ml-2"
          >
            Send Money
          </button>

        <p className="mt-2">
          {freighterStatus}
        </p>

        <div className="mt-4 border rounded-lg p-4">
          <h3 className="font-bold">
            Stellar Wallet Address
          </h3>

          <p className="break-all mt-2">
            {stellarAddress || "No wallet connected"}
          </p>
        </div>

      </div>

      <p className="mb-6">
        {status}
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="border rounded-xl p-6">
          <h2 className="font-bold">
            Wallet Balance
          </h2>

          <p className="text-2xl mt-2">
            {balance.toFixed(2)} XLM
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="font-bold">
            Transactions
          </h2>

          <p className="text-2xl mt-2">
            {transactionCount}
          </p>
          </div>

        <div className="border rounded-xl p-6">
          <h2 className="font-bold">
            Stellar Status
          </h2>

          <p className="text-2xl mt-2">
            Ready
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Recent Transactions
        </h2>

        {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="border rounded-lg p-4 mb-4"
              >
                <div className="flex justify-between items-center">
                  <div>
                      <p className="font-bold text-lg">
                        {transaction.receiver_name}
                      </p>

                      <p className="text-sm">
                        {transaction.status === "Completed"
                          ? "✅ Completed"
                          : "⏳ Pending"}
                      </p>

                     {transaction.stellar_hash && (
                        <div className="mt-1">
                          <p className="text-xs break-all">
                            Hash: {transaction.stellar_hash}
                          </p>

                          <a
                            href={`https://stellar.expert/explorer/testnet/tx/${transaction.stellar_hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs underline"
                          >
                            View on Stellar Explorer
                          </a>
                        </div>
                      )}
                    </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">
                      {transaction.amount} XLM
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No transactions found</p>
          )}

        
      </div>

    </main>
  );
}