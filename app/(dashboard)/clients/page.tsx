"use client";

import { useState } from "react";

const clients = [
  {
    name: "Sarah Johnson",
    goal: "Fat Loss",
    risk: "High",
    lastReply: "Too busy this week",
    revenue: "$399/mo",
    action: "Send Recovery Message",
  },
  {
    name: "Michael Reed",
    goal: "Muscle Gain",
    risk: "Medium",
    lastReply: "Will update tomorrow",
    revenue: "$299/mo",
    action: "Follow Up",
  },
  {
    name: "Emma Carter",
    goal: "Transformation",
    risk: "Low",
    lastReply: "Workout completed",
    revenue: "$499/mo",
    action: "Maintain Momentum",
  },
];

export default function ClientManagementDashboard() {
  const [showModal, setShowModal] = useState(false);
  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Veyro Dashboard
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-950">
              Client Management System
            </h1>
            <p className="mt-3 text-slate-600">
              Track retention, revenue, and AI recovery actions for every client.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="rounded-2xl bg-slate-950 px-6 py-4 text-sm font-medium text-white shadow-sm"
          >
            + Add New Client
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500">Total Clients</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">42</h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500">High Risk</p>
            <h2 className="mt-3 text-3xl font-semibold text-red-600">7</h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500">Protected Revenue</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">$1,540</h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500">Retention Score</p>
            <h2 className="mt-3 text-3xl font-semibold text-emerald-600">87%</h2>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-xl font-semibold text-slate-950">
              Active Clients
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-sm text-slate-500">
                  <th className="px-6 py-4 font-medium">Client</th>
                  <th className="px-6 py-4 font-medium">Goal</th>
                  <th className="px-6 py-4 font-medium">Risk</th>
                  <th className="px-6 py-4 font-medium">Last Reply</th>
                  <th className="px-6 py-4 font-medium">Revenue</th>
                  <th className="px-6 py-4 font-medium">Action</th>
                </tr>
              </thead>

              <tbody>
                {clients.map((client) => (
                  <tr key={client.name} className="border-b border-slate-100">
                    <td className="px-6 py-5 font-medium text-slate-950">
                      {client.name}
                    </td>
                    <td className="px-6 py-5 text-slate-700">{client.goal}</td>
                    <td className="px-6 py-5">
                      <span className="rounded-full border border-slate-200 px-4 py-2 text-xs font-medium">
                        {client.risk}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-slate-700">{client.lastReply}</td>
                    <td className="px-6 py-5 font-medium text-slate-950">{client.revenue}</td>
                    <td className="px-6 py-5">
                      <button className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900">
                        {client.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-[32px] bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  New Client
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                  Add Client Profile
                </h2>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm"
              >
                Close
              </button>
            </div>

            <form className="mt-8 space-y-4">
              <input
                type="text"
                placeholder="Client Name"
                className="w-full rounded-2xl border border-slate-300 px-4 py-4 text-sm outline-none"
              />

              <input
                type="tel"
                placeholder="WhatsApp Number"
                className="w-full rounded-2xl border border-slate-300 px-4 py-4 text-sm outline-none"
              />

              <input
                type="text"
                placeholder="Primary Goal (Fat Loss / Muscle Gain)"
                className="w-full rounded-2xl border border-slate-300 px-4 py-4 text-sm outline-none"
              />

              <input
                type="number"
                placeholder="Monthly Revenue Value"
                className="w-full rounded-2xl border border-slate-300 px-4 py-4 text-sm outline-none"
              />

              <textarea
                rows={4}
                placeholder="Coach Notes"
                className="w-full rounded-2xl border border-slate-300 px-4 py-4 text-sm outline-none"
              />

              <button
                type="submit"
                className="w-full rounded-2xl bg-slate-950 px-5 py-4 text-sm font-medium text-white"
              >
                Save Client
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
