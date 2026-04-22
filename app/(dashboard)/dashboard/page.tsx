"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Client = {
  id: number;
  name: string;
  phone: string;
  goal: string;
  status: "At Risk" | "Warning" | "Healthy";
  lastCheckin: string;
  revenue: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);

  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      phone: "+15552104421",
      goal: "Fat Loss",
      status: "At Risk",
      lastCheckin: "Missed 3 workouts this week",
      revenue: "$399/mo",
    },
    {
      id: 2,
      name: "Michael Reed",
      phone: "+15558881200",
      goal: "Muscle Gain",
      status: "Warning",
      lastCheckin: "Replied: No time today",
      revenue: "$299/mo",
    },
    {
      id: 3,
      name: "Emma Carter",
      phone: "+15554449821",
      goal: "Consistency",
      status: "Healthy",
      lastCheckin: "Workout completed consistently",
      revenue: "$499/mo",
    },
  ]);

  const [newClient, setNewClient] = useState({
    name: "",
    phone: "",
    goal: "",
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const handleAddClient = () => {
    if (!newClient.name || !newClient.phone || !newClient.goal) {
      alert("Please fill all fields");
      return;
    }

    const client: Client = {
      id: Date.now(),
      name: newClient.name,
      phone: newClient.phone,
      goal: newClient.goal,
      status: "Healthy",
      lastCheckin: "Newly added client",
      revenue: "$199/mo",
    };

    setClients([client, ...clients]);

    setNewClient({
      name: "",
      phone: "",
      goal: "",
    });

    setShowAddClientModal(false);
  };

  const handleSendWhatsApp = async (client: Client) => {
    try {
      const response = await fetch("/api/send-whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: client.phone,
          clientName: client.name,
          message: `Hey ${client.name} 👋

Just checking in on your workout progress today.

Did you complete your workout?

Reply:
DONE ✅
or
MISSED ❌

– Team Veyro`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(`WhatsApp sent successfully to ${client.name}`);
      } else {
        alert(result.message || "Failed to send WhatsApp");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while sending WhatsApp");
    }
  };

  const getStatusStyle = (status: string) => {
    if (status === "At Risk") {
      return "bg-red-50 text-red-700 border border-red-200";
    }

    if (status === "Warning") {
      return "bg-yellow-50 text-yellow-700 border border-yellow-200";
    }

    return "bg-green-50 text-green-700 border border-green-200";
  };

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
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
                className="text-sm font-semibold text-slate-950"
              >
                Dashboard
              </a>

              <button className="text-sm text-slate-600 hover:text-slate-950">
                Clients
              </button>

              <button className="text-sm text-slate-600 hover:text-slate-950">
                Billing
              </button>

              <button className="text-sm text-slate-600 hover:text-slate-950">
                Settings
              </button>
            </nav>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 shadow-sm"
            >
              Profile ▼
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-56 rounded-3xl border border-slate-200 bg-white p-2 shadow-xl">
                <button className="w-full rounded-2xl px-4 py-3 text-left text-sm text-slate-900 hover:bg-slate-50">
                  My Profile
                </button>

                <button className="w-full rounded-2xl px-4 py-3 text-left text-sm text-slate-900 hover:bg-slate-50">
                  Billing
                </button>

                <button className="w-full rounded-2xl px-4 py-3 text-left text-sm text-slate-900 hover:bg-slate-50">
                  Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full rounded-2xl px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
              Dashboard
            </p>

            <h1 className="mt-2 text-4xl font-semibold text-slate-950 md:text-5xl">
              Intelligence Command Center
            </h1>

            <p className="mt-4 max-w-2xl text-base text-slate-700">
              Monitor churn, protect revenue, and automate retention actions
              before clients leave.
            </p>
          </div>

          <button
            onClick={() => setShowAddClientModal(true)}
            className="rounded-2xl bg-slate-950 px-6 py-4 text-sm font-medium text-white shadow-sm"
          >
            + Add Client
          </button>
        </div>

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
              🔴 Sarah Johnson — High Churn Risk
            </h3>

            <div className="mt-4 space-y-2 text-sm text-slate-700">
              <p>• Missed 3 workouts this week</p>
              <p>• Low motivation language detected</p>
              <p>• Weekly score dropped from 8 → 4</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-medium text-white">
                Send Recovery Message
              </button>

              <button className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-medium text-slate-900">
                Schedule Reset Call
              </button>
            </div>
          </div>
        </div>

        {/* CLIENT MONITOR */}
        <div className="mt-10 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">
            Client Retention Monitor
          </h2>

          <div className="mt-8 space-y-4">
            {clients.map((client) => (
              <div
                key={client.id}
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

                    <p className="mt-2 text-sm text-slate-600">
                      {client.lastCheckin}
                    </p>

                    <p className="mt-2 text-sm font-medium text-slate-900">
                      Revenue: {client.revenue}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-4 py-2 text-xs font-medium ${getStatusStyle(
                        client.status
                      )}`}
                    >
                      {client.status}
                    </span>

                    <button
                      onClick={() => handleSendWhatsApp(client)}
                      className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50"
                    >
                      Send WhatsApp
                    </button>

                    <button className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50">
                      Send SMS
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADD CLIENT MODAL */}
      {showAddClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-[32px] bg-white p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-slate-950">
              Add New Client
            </h2>

            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Client Name"
                value={newClient.name}
                onChange={(e) =>
                  setNewClient({
                    ...newClient,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 placeholder:text-slate-500 outline-none"
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={newClient.phone}
                onChange={(e) =>
                  setNewClient({
                    ...newClient,
                    phone: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 placeholder:text-slate-500 outline-none"
              />

              <input
                type="text"
                placeholder="Goal"
                value={newClient.goal}
                onChange={(e) =>
                  setNewClient({
                    ...newClient,
                    goal: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 placeholder:text-slate-500 outline-none"
              />

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddClientModal(false)}
                  className="w-full rounded-2xl border border-slate-300 px-6 py-4 text-slate-900"
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
    </main>
  );
}