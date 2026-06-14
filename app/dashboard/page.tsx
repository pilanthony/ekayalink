"use client";

import { checkFreighter } from "@/lib/freighter";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  
  const [transactions, setTransactions] = useState<any[]>([]);
  const [freighterStatus, setFreighterStatus] = useState("");

  const [status, setStatus] = useState("");
  const router = useRouter();
  

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    };

  
  const handleCheckFreighter = async () => {
  const installed = await checkFreighter();

  if (installed) {
    setFreighterStatus("Freighter Detected");
  } else {
    setFreighterStatus("Freighter Not Installed");
  }
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

  setBalance(Number(wallet.balance));
  setStatus(`Wallet Found: ${wallet.balance}`);
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
          onClick={handleCheckFreighter}
          className="border rounded-lg px-4 py-2"
        >
          Check Freighter
        </button>

        <p className="mt-2">
          {freighterStatus}
        </p>
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
            ₱{balance.toFixed(2)}
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
    </main>
  );
}