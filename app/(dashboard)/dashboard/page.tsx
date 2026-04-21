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
  const [triggeringRecovery, setTriggeringRecovery] = useState<string | null>(null);

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

  const handleSendSMS = async (phone: string, fullName: string) => {
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

  const handleSendWhatsApp = async (phone: string, fullName: string) => {
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

  const handleRecoveryFlow = async (
    phone: string,
    fullName: string,
    status: string
  ) => {
    try {
      setTriggeringRecovery(phone);

      const response = await fetch("/api/recovery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          fullName,
          status,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Recovery flow failed");
        setTriggeringRecovery(null);
        return;
      }

      alert(`Recovery flow triggered for ${fullName}`);
      setTriggeringRecovery(null);
    } catch (error) {
      console.error(error);
      alert("Failed to trigger recovery flow");
      setTriggeringRecovery(null);
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

        <section className="grid gap-6 lg:grid-cols-3">

          <div className="lg:col-span-2 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-950">
                Priority Client Feed
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                AI-guided retention actions across active clients
              </p>
            </div>

            <div className="space-y-4">
              {loading ? (
                <p>Loading clients...</p>
              ) : (
                clients.map((client) => {
                  const status = getStatusStyle(client.latest_status);

                  return (
                    <div
                      key={client.id}
                      className="rounded-[28px] border border-slate-200 p-6"
                    >
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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

                            <p className="mt-2 text-sm text-slate-600">
                              {client.fitness_goal || "No goal added"}
                            </p>

                            <p className="mt-2 text-sm text-slate-500">
                              Last Reply: {client.latest_response}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={() =>
                                handleSendWhatsApp(
                                  client.phone,
                                  client.full_name
                                )
                              }
                              className="rounded-2xl bg-slate-950 px-5 py-2.5 text-sm font-medium text-white"
                            >
                              {sendingWhatsApp === client.phone
                                ? "Sending..."
                                : "Send WhatsApp"}
                            </button>

                            <button
                              onClick={() =>
                                handleSendSMS(
                                  client.phone,
                                  client.full_name
                                )
                              }
                              className="rounded-2xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-900"
                            >
                              {sendingSMS === client.phone
                                ? "Sending..."
                                : "Send SMS"}
                            </button>

                            <button
                              onClick={() =>
                                handleRecoveryFlow(
                                  client.phone,
                                  client.full_name,
                                  client.latest_status || "at_risk"
                                )
                              }
                              className="rounded-2xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white"
                            >
                              {triggeringRecovery === client.phone
                                ? "Triggering..."
                                : "Trigger Recovery Flow"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">
                AI Recovery Recommendations
              </h3>

              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    High Priority Intervention
                  </p>

                  <p className="mt-2 text-sm text-slate-600">
                    At-risk clients should receive personal follow-up
                    within 24 hours to maximize recovery.
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Warning State Recovery
                  </p>

                  <p className="mt-2 text-sm text-slate-600">
                    SKIPPED and NO TIME replies should trigger
                    motivation recovery flows immediately.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">
                Revenue Protection Opportunity
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Recovering just 2 at-risk clients/month can protect
                $500–$1500+ in recurring revenue.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}