"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (
    e: React.FormEvent
  ) => {
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

    // wait for session to be available
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      router.push("/dashboard");
      router.refresh();
    } else {
      alert("Login successful, but session not found.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      {/* NAVBAR */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <a
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-900"
          >
            VEYRO
          </a>

          <a
            href="/"
            className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900"
          >
            Home
          </a>
        </div>
      </header>

      {/* LOGIN FORM */}
      <div className="flex min-h-[85vh] items-center justify-center px-6">
        <div className="w-full max-w-md rounded-[32px] border border-slate-300 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-950">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-700">
            Login to access your Intelligence Command Center
          </p>

          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-4"
          >
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 placeholder:text-slate-500 outline-none"
              required
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 placeholder:text-slate-500 outline-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-slate-950 px-6 py-4 text-sm font-medium text-white shadow-sm transition hover:shadow-md disabled:opacity-70"
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
      </div>
    </main>
  );
}