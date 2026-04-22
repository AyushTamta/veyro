"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
        },
      },
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    alert("Account created successfully. Please verify your email.");

    setFormData({
      fullName: "",
      email: "",
      password: "",
    });

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F7F8FA] px-6">
      <div className="w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          VEYRO
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
          Create Your Account
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Start using your AI Client Retention OS
        </p>

        <form onSubmit={handleSignup} className="mt-8 space-y-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-sm outline-none"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-sm outline-none"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-sm outline-none"
          />

          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-950 px-6 py-4 text-sm font-medium text-white shadow-sm transition hover:shadow-md"
          >
            {loading ? "Creating Account..." : "Sign Up For Free"}
          </button>
        </form>
      </div>
    </main>
  );
}
 