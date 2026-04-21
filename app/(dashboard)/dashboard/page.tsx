"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type Client = {
  id: string;
  full_name: string;
  phone: string;
  fitness_goal: string;
  checkin_time: string;
  created_at: string;
};

export default function DashboardPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingTo, setSendingTo] = useState<string | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching clients:", error.message);
      setLoading(false);
      return;
    }

    setClients(data || []);
    setLoading(false);
  };

  const handleSendCheckin = async (
    phone: string,
    fullName: string
  ) => {
    try {
      setSendingTo(phone);

      const response = await fetch("/api/twilio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          fullName,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to send SMS");
        setSendingTo(null);
        return;
      }

      alert(`Check-in sent successfully to ${fullName}`);
      setSendingTo(null);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while sending SMS");
      setSendingTo(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-slate-900">
      <div className="mx-auto max-w-7xl px-8 py-8 space-y-8">
        <header className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
                Veyro
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
                Coach Command Center
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
                Reduce client drop-offs before they happen with accountability,
                check-ins, and retention intelligence.
              </p>
            </div>

            <button className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:shadow-md">
              + Add Client
            </button>
          </div>
        </header>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Total Clients",
              value: clients.length || 0,
              meta: "Active accounts",
            },
            {
              title: "Today's Check-ins",
              value: "31",
              meta: "74% completion",
            },
            {
              title: "At-Risk Clients",
              value: "4",
              meta: "Needs attention",
            },
            {
              title: "Weekly Compliance",
              value: "84%",
              meta: "Strong retention",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-500">
                {card.title}
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-slate-950">
                {card.value}
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                {card.meta}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">
                  Client Activity
                </h2>

                <p className="mt-1 text-sm text-slate-600">
                  Live accountability overview for all active clients
                </p>
              </div>

              <button className="text-sm font-medium text-slate-700">
                View all
              </button>
            </div>

            <div className="space-y-4">
              {loading ? (
                <p className="text-slate-600">Loading clients...</p>
              ) : clients.length === 0 ? (
                <p className="text-slate-600">
                  No clients added yet.
                </p>
              ) : (
                clients.map((client) => (
                  <div
                    key={client.id}
                    className="rounded-3xl border border-slate-200 p-5 transition hover:shadow-sm"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-950">
                          {client.full_name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-700">
                          {client.fitness_goal || "No fitness goal added"}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-500">
                          <span>Phone: {client.phone}</span>
                          <span>•</span>
                          <span>
                            Check-in:{" "}
                            {client.checkin_time || "Not set"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">
                          Active
                        </span>

                        <button
                          onClick={() =>
                            handleSendCheckin(
                              client.phone,
                              client.full_name
                            )
                          }
                          disabled={sendingTo === client.phone}
                          className="rounded-2xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-900 transition hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {sendingTo === client.phone
                            ? "Sending..."
                            : "Send Check-in"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-950">
                Revenue Protection
              </h3>

              <p className="mt-3 text-sm text-slate-600">
                Clients recovered this month
              </p>

              <p className="mt-4 text-4xl font-semibold text-slate-950">
                11
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-950">
                High-Risk Alerts
              </h3>

              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-700">
                  Michael missed 2 check-ins this week
                </div>

                <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-700">
                  Sarah streak recovered after coach follow-up
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}