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
  latest_status?: string;
  latest_response?: string;
};

export default function DashboardPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingSMS, setSendingSMS] = useState<string | null>(null);
  const [sendingWhatsApp, setSendingWhatsApp] = useState<string | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const { data: clientsData, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error.message);
      setLoading(false);
      return;
    }

    const enrichedClients = await Promise.all(
      (clientsData || []).map(async (client) => {
        const { data: checkinData } = await supabase
          .from("client_checkins")
          .select("status, response, created_at")
          .eq("client_phone", client.phone)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        return {
          ...client,
          latest_status: checkinData?.status || "at_risk",
          latest_response: checkinData?.response || "No Reply",
        };
      })
    );

    setClients(enrichedClients);
    setLoading(false);
  };

  const handleSendSMS = async (
    phone: string,
    fullName: string
  ) => {
    try {
      setSendingSMS(phone);

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
        setSendingSMS(null);
        return;
      }

      alert(`SMS sent to ${fullName}`);
      setSendingSMS(null);
      fetchClients();
    } catch (error) {
      console.error(error);
      alert("Failed to send SMS");
      setSendingSMS(null);
    }
  };

  const handleSendWhatsApp = async (
    phone: string,
    fullName: string
  ) => {
    try {
      setSendingWhatsApp(phone);

      const response = await fetch("/api/whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: `whatsapp:${phone}`,
          fullName,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to send WhatsApp");
        setSendingWhatsApp(null);
        return;
      }

      alert(`WhatsApp sent to ${fullName}`);
      setSendingWhatsApp(null);
      fetchClients();
    } catch (error) {
      console.error(error);
      alert("Failed to send WhatsApp");
      setSendingWhatsApp(null);
    }
  };

  const getStatusStyle = (status?: string) => {
    if (status === "healthy") {
      return {
        label: "Healthy",
        className: "bg-emerald-50 text-emerald-600",
      };
    }

    if (status === "warning") {
      return {
        label: "Warning",
        className: "bg-amber-50 text-amber-600",
      };
    }

    return {
      label: "At Risk",
      className: "bg-red-50 text-red-600",
    };
  };

  return (
    <main className="min-h-screen bg-[#F6F8FB] text-slate-900">
      <div className="mx-auto max-w-7xl space-y-8 px-8 py-8">
        {/* HERO SECTION */}
        <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                VEYRO
              </p>

              <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950">
                Intelligence Command Center
              </h1>

              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
                AI-powered client retention operating system for
                fitness coaches. Predict churn, recover clients,
                and protect recurring revenue before drop-offs happen.
              </p>
            </div>

            <button className="rounded-2xl bg-slate-950 px-7 py-4 text-sm font-medium text-white shadow-sm transition hover:shadow-md">
              + Add Client
            </button>
          </div>
        </section>

        {/* EXECUTIVE METRICS */}
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Protected Revenue",
              value: "$4,800",
              meta: "Recovered this month",
            },
            {
              title: "At-Risk Clients",
              value: clients.filter(
                (client) => client.latest_status === "at_risk"
              ).length,
              meta: "Immediate attention needed",
            },
            {
              title: "Retention Score",
              value: "84%",
              meta: "Strong weekly compliance",
            },
            {
              title: "Check-In Completion",
              value: "91%",
              meta: "Across all active clients",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-500">
                {card.title}
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950">
                {card.value}
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                {card.meta}
              </p>
            </div>
          ))}
        </section>

        {/* MAIN GRID */}
        <section className="grid gap-6 lg:grid-cols-3">
          {/* CLIENT CENTER */}
          <div className="lg:col-span-2 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-950">
                  Priority Client Feed
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  Live retention actions across your active clients
                </p>
              </div>

              <button className="text-sm font-medium text-slate-700">
                View all
              </button>
            </div>

            <div className="space-y-4">
              {loading ? (
                <p className="text-slate-600">
                  Loading clients...
                </p>
              ) : clients.length === 0 ? (
                <p className="text-slate-600">
                  No clients added yet.
                </p>
              ) : (
                clients.map((client) => {
                  const status = getStatusStyle(
                    client.latest_status
                  );

                  return (
                    <div
                      key={client.id}
                      className="rounded-[28px] border border-slate-200 p-6 transition hover:shadow-sm"
                    >
                      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-slate-950">
                              {client.full_name}
                            </h3>

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
                            >
                              {status.label}
                            </span>
                          </div>

                          <p className="mt-2 text-sm text-slate-700">
                            {client.fitness_goal || "No fitness goal added"}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                            <span>{client.phone}</span>
                            <span>•</span>
                            <span>
                              Last Reply: {client.latest_response}
                            </span>
                            <span>•</span>
                            <span>
                              Check-in: {client.checkin_time || "Not set"}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() =>
                              handleSendSMS(
                                client.phone,
                                client.full_name
                              )
                            }
                            disabled={sendingSMS === client.phone}
                            className="rounded-2xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-900 transition hover:shadow-sm"
                          >
                            {sendingSMS === client.phone
                              ? "Sending..."
                              : "Send SMS"}
                          </button>

                          <button
                            onClick={() =>
                              handleSendWhatsApp(
                                client.phone,
                                client.full_name
                              )
                            }
                            disabled={
                              sendingWhatsApp === client.phone
                            }
                            className="rounded-2xl bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition hover:shadow-md"
                          >
                            {sendingWhatsApp === client.phone
                              ? "Sending..."
                              : "Send WhatsApp"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="space-y-6">
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">
                Recovery Actions
              </h3>

              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-sm font-medium text-slate-900">
                    Immediate follow-up recommended for at-risk clients
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Personal outreach within 24h improves retention
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-sm font-medium text-slate-900">
                    Warning clients need motivational recovery flow
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    WhatsApp recovery message recommended
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">
                AI Retention Insight
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Clients who miss 2 check-ins in 7 days are 4x more
                likely to churn. Personal follow-up within 24 hours
                significantly improves recovery rates.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}