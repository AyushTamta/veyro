"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function ClientsPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [checkinTime, setCheckinTime] = useState("");

  const handleSaveClient = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const { error } = await supabase
      .from("clients")
      .insert([
        {
          full_name: fullName,
          phone,
          fitness_goal: fitnessGoal,
          checkin_time: checkinTime,
        },
      ]);

    if (error) {
      console.error(error.message);
      alert("Failed to save client");
      return;
    }

    alert("Client added successfully!");

    setFullName("");
    setPhone("");
    setFitnessGoal("");
    setCheckinTime("");
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] p-8 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-slate-300 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Add New Client
          </h1>

          <p className="mt-2 text-slate-700">
            Add clients and start tracking accountability.
          </p>

          <form
            onSubmit={handleSaveClient}
            className="mt-8 space-y-6"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter client name"
                className="w-full rounded-2xl border border-slate-400 px-4 py-3 text-slate-900 placeholder:text-slate-500 outline-none focus:border-slate-600"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555 123 4567"
                className="w-full rounded-2xl border border-slate-400 px-4 py-3 text-slate-900 placeholder:text-slate-500 outline-none focus:border-slate-600"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Fitness Goal
              </label>
              <input
                type="text"
                value={fitnessGoal}
                onChange={(e) => setFitnessGoal(e.target.value)}
                placeholder="Weight loss / Muscle gain"
                className="w-full rounded-2xl border border-slate-400 px-4 py-3 text-slate-900 placeholder:text-slate-500 outline-none focus:border-slate-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Preferred Check-in Time
              </label>
              <input
                type="time"
                value={checkinTime}
                onChange={(e) => setCheckinTime(e.target.value)}
                className="w-full rounded-2xl border border-slate-400 px-4 py-3 text-slate-900 outline-none focus:border-slate-600"
              />
            </div>

            <button
              type="submit"
              className="rounded-2xl border border-slate-400 px-6 py-3 font-medium text-slate-900 shadow-sm transition hover:shadow-md"
            >
              Save Client
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}