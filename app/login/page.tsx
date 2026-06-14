"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSignUp = async () => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

 if (error) {
  setMessage(error.message);
} else {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.from("wallets").insert([
      {
        user_id: user.id,
        balance: 0,
      },
    ]);
  }

  setMessage("Account created successfully!");
}
};

const handleSignIn = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    setMessage(error.message);
  } else {
    setMessage("Login successful!");
     router.push("/dashboard");
  }
};

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          eKayaLink Login
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <div className="space-y-2">
  <button
    onClick={handleSignUp}
    className="w-full border rounded-lg p-3"
  >
    Create Account
  </button>

  <button
    onClick={handleSignIn}
    className="w-full border rounded-lg p-3"
  >
    Sign In
  </button>
</div>

          {message && (
            <p className="text-center">
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}