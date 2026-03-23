"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-[350px]">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Welcome Back 👋
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button className="bg-black text-white p-2 rounded">
            Login
          </button>
        </form>

        {/* GOOGLE LOGIN */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="mt-4 w-full bg-red-500 text-white p-2 rounded"
        >
          Continue with Google
        </button>

        {/* SIGNUP LINK */}
        <p className="text-sm mt-4 text-center">
          New here?{" "}
          <Link href="/signup" className="text-blue-600 font-medium">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}