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

  return (
    <main className="min-h-screen bg-[#f8fafc] p-8 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-3xl border border-slate-300 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium text-slate-600">
            Veyro
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Coach Retention Dashboard
          </h1>

          <p className="mt-3 text-slate-700">
            Reduce client drop-offs before they happen.
          </p>
        </header>

        <section className="rounded-3xl border border-slate-300 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Client List
              </h2>

              <p className="text-slate-600">
                Track accountability and consistency
              </p>
            </div>
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
              clients.map((client) => (
                <div
                  key={client.id}
                  className="rounded-2xl border border-slate-300 p-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {client.full_name}
                      </h3>

                      <p className="text-slate-700">
                        {client.fitness_goal || "No goal added"}
                      </p>

                      <p className="mt-2 text-sm text-slate-600">
                        Check-in Time:{" "}
                        {client.checkin_time || "Not set"}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Phone: {client.phone}
                      </p>
                    </div>

                    <div className="rounded-full border border-slate-400 px-4 py-2 text-sm font-medium text-slate-800">
                      Active
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}