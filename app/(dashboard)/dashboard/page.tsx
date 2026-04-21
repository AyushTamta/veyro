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
  const [sendingSMS, setSendingSMS] = useState<string | null>(null);
  const [sendingWhatsApp, setSendingWhatsApp] = useState<string | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error.message);
      setLoading(false);
      return;
    }

    setClients(data || []);
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
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
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
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
      setSendingWhatsApp(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-slate-900">
      <div className="mx-auto max-w-7xl space-y-8 px-8 py-8">
        <header className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Veyro
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
                Coach Command Center
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
                Multi-channel client retention system for fitness coaches.
              </p>
            </div>

            <button className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:shadow-md">
              + Add Client
            </button>
          </div>
        </header>

        <section className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">
              Client Retention Center
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Send SMS and WhatsApp accountability check-ins instantly
            </p>
          </div>

          {loading ? (
            <p>Loading clients...</p>
          ) : clients.length === 0 ? (
            <p>No clients added yet.</p>
          ) : (
            clients.map((client) => (
              <div
                key={client.id}
                className="rounded-3xl border border-slate-200 p-5"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">
                      {client.full_name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-700">
                      {client.fitness_goal || "No fitness goal added"}
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      {client.phone}
                    </p>
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
                        ? "Sending SMS..."
                        : "Send SMS"}
                    </button>

                    <button
                      onClick={() =>
                        handleSendWhatsApp(
                          client.phone,
                          client.full_name
                        )
                      }
                      disabled={sendingWhatsApp === client.phone}
                      className="rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:shadow-md"
                    >
                      {sendingWhatsApp === client.phone
                        ? "Sending WhatsApp..."
                        : "Send WhatsApp"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
}