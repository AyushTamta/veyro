"use client";

import { useState } from "react";

type Client = {
  name: string;
  phone: string;
  goal: string;
  status: string;
  lastCheckin: string;
  notes: string;
};

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false);

  const [clients, setClients] = useState<Client[]>([
    {
      name: "Sarah Johnson",
      phone: "+1 555-240-1122",
      goal: "Fat Loss",
      status: "At Risk",
      lastCheckin: "Missed 2 workouts this week",
      notes: "Needs immediate follow-up",
    },
    {
      name: "Michael Reed",
      phone: "+1 555-221-9988",
      goal: "Muscle Gain",
      status: "Warning",
      lastCheckin: "Replied: NO TIME",
      notes: "Engagement dropping",
    },
    {
      name: "Emma Carter",
      phone: "+1 555-888-4455",
      goal: "Accountability",
      status: "Healthy",
      lastCheckin: "Replied: DONE consistently",
      notes: "High consistency",
    },
  ]);

  const [newClient, setNewClient] = useState<Client>({
    name: "",
    phone: "",
    goal: "",
    status: "Healthy",
    lastCheckin: "",
    notes: "",
  });

  const handleAddClient = () => {
    if (!newClient.name || !newClient.phone) {
      alert("Please fill required fields");
      return;
    }

    setClients([newClient, ...clients]);

    setNewClient({
      name: "",
      phone: "",
      goal: "",
      status: "Healthy",
      lastCheckin: "",
      notes: "",
    });

    setShowModal(false);
  };

  return (
    <main className="min-h-screen bg-[#F7F8FA] px-6 py-10 text-slate-900 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
              Dashboard
            </p>

            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">
              Intelligence Command Center
            </h1>

            <p className="mt-3 text-base text-slate-700">
              Monitor retention, prevent churn, and protect recurring revenue.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="rounded-2xl bg-slate-950 px-6 py-4 text-sm font-medium text-white shadow-sm"
          >
            + Add Client
          </button>
        </div>

        {/* KPI CARDS */}
        <div className="grid gap-6 md:grid-cols-4">
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
              <p className="text-sm font-medium text-slate-600">{title}</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                {value}
              </h2>
            </div>
          ))}
        </div>

        {/* CLIENTS */}
        <div className="mt-10 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">
            Client Retention Monitor
          </h2>

          <div className="mt-8 space-y-4">
            {clients.map((client, index) => (
              <div
                key={index}
                className="rounded-3xl border border-slate-200 p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">
                      {client.name}
                    </h3>

                    <p className="mt-2 text-sm text-slate-700">
                      {client.goal} • {client.phone}
                    </p>

                    <p className="mt-2 text-sm text-slate-700">
                      {client.lastCheckin}
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      {client.notes}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        client.status === "At Risk"
                          ? "border border-red-200 bg-red-50 text-red-700"
                          : client.status === "Warning"
                          ? "border border-yellow-200 bg-yellow-50 text-yellow-700"
                          : "border border-green-200 bg-green-50 text-green-700"
                      }`}
                    >
                      {client.status}
                    </span>

                    <button className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-medium">
                      Send WhatsApp
                    </button>

                    <button className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-medium">
                      Send SMS
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ADD CLIENT MODAL */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-2xl">
              <h2 className="text-2xl font-semibold text-slate-950">
                Add New Client
              </h2>

              <div className="mt-6 space-y-4">
                <input
                  placeholder="Client Name"
                  value={newClient.name}
                  onChange={(e) =>
                    setNewClient({ ...newClient, name: e.target.value })
                  }
                  className="w-full rounded-2xl border border-slate-300 px-5 py-4"
                />

                <input
                  placeholder="Phone Number"
                  value={newClient.phone}
                  onChange={(e) =>
                    setNewClient({ ...newClient, phone: e.target.value })
                  }
                  className="w-full rounded-2xl border border-slate-300 px-5 py-4"
                />

                <input
                  placeholder="Goal"
                  value={newClient.goal}
                  onChange={(e) =>
                    setNewClient({ ...newClient, goal: e.target.value })
                  }
                  className="w-full rounded-2xl border border-slate-300 px-5 py-4"
                />

                <input
                  placeholder="Last Check-in Response"
                  value={newClient.lastCheckin}
                  onChange={(e) =>
                    setNewClient({
                      ...newClient,
                      lastCheckin: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-300 px-5 py-4"
                />

                <textarea
                  placeholder="Notes"
                  value={newClient.notes}
                  onChange={(e) =>
                    setNewClient({ ...newClient, notes: e.target.value })
                  }
                  className="w-full rounded-2xl border border-slate-300 px-5 py-4"
                />

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full rounded-2xl border border-slate-300 px-6 py-4"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleAddClient}
                    className="w-full rounded-2xl bg-slate-950 px-6 py-4 text-white"
                  >
                    Save Client
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}