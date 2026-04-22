"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F7F8FA] px-6">
      <div className="w-full max-w-md rounded-[32px] border border-slate-300 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">
          VEYRO
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
          Welcome Back
        </h1>

        <p className="mt-2 text-sm text-slate-700">
          Login to access your Intelligence Command Center
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full rounded-2xl border border-slate-300 px-5 py-4 text-sm outline-none"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full rounded-2xl border border-slate-300 px-5 py-4 text-sm outline-none"
          />

          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-950 px-6 py-4 text-sm font-medium text-white shadow-sm transition hover:shadow-md"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-700">
          New here?{" "}
          <a
            href="/signup"
            className="font-medium text-slate-950 underline"
          >
            Create your account
          </a>
        </p>
      </div>
    </main>
  );
}