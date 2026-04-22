"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      {/* TOP NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          {/* LEFT */}
          <div className="flex items-center gap-10">
            <a
              href="/"
              className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-950"
            >
              VEYRO
            </a>

            <nav className="hidden gap-8 md:flex">
              <a
                href="/dashboard"
                className="text-sm font-medium text-slate-700 hover:text-slate-950"
              >
                Dashboard
              </a>

              <a
                href="#"
                className="text-sm font-medium text-slate-700 hover:text-slate-950"
              >
                Clients
              </a>

              <a
                href="#"
                className="text-sm font-medium text-slate-700 hover:text-slate-950"
              >
                Billing
              </a>

              <a
                href="#"
                className="text-sm font-medium text-slate-700 hover:text-slate-950"
              >
                Settings
              </a>
            </nav>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900"
            >
              Profile ▼
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                <button className="w-full rounded-xl px-4 py-3 text-left text-sm hover:bg-slate-50">
                  My Profile
                </button>

                <button className="w-full rounded-xl px-4 py-3 text-left text-sm hover:bg-slate-50">
                  Settings
                </button>

                <button className="w-full rounded-xl px-4 py-3 text-left text-sm hover:bg-slate-50">
                  Billing
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full rounded-xl px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
          Dashboard
        </p>

        <h1 className="mt-3 text-4xl font-semibold text-slate-950">
          Intelligence Command Center
        </h1>

        <p className="mt-3 text-slate-700">
          Monitor retention, prevent churn, and protect recurring revenue.
        </p>

        {/* KPI CARDS */}
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Retention Score", "87%"],
            ["At-Risk Clients", "12"],
            ["Recovery Rate", "4x"],
            ["Protected Revenue", "$1,540"],
          ].map(([title, value]) => (
            <div
              key={title}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-slate-600">{title}</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                {value}
              </h2>
            </div>
          ))}
        </div>

        {/* PRIORITY ALERT */}
        <div className="mt-10 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">
            Today’s Priority Alert
          </h2>

          <div className="mt-6 rounded-3xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-950">
              🔴 Sarah Johnson — High Risk
            </h3>

            <div className="mt-4 space-y-2 text-sm text-slate-700">
              <p>• Missed 3 workouts this week</p>
              <p>• Low motivation detected</p>
              <p>• Weekly score dropped from 8 → 4</p>
            </div>

            <button className="mt-6 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-medium text-white">
              Send Recovery Message
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}