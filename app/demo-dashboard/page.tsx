"use client";

import { useState } from "react";
import { Info } from "lucide-react";

const demoClients = [
  {
    name: "Sarah Johnson",
    status: "At Risk",
    risk: "87%",
    note: "Missed 3 workouts this week",
  },
  {
    name: "Michael Reed",
    status: "Warning",
    risk: "62%",
    note: "Late replies for 4 days",
  },
  {
    name: "Emma Carter",
    status: "Healthy",
    risk: "18%",
    note: "Consistent check-ins",
  },
];

function InfoBadge({ text }: { text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="rounded-full border border-slate-200 bg-white p-2 shadow-sm"
      >
        <Info size={16} className="text-slate-700" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-3 w-72 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-xl">
          {text}
        </div>
      )}
    </div>
  );
}

export default function DemoDashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <div className="flex items-center gap-8">
            <a
              href="/"
              className="text-sm font-semibold uppercase tracking-[0.25em]"
            >
              VEYRO
            </a>

            <span className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-medium text-blue-700">
              Interactive Product Demo
            </span>
          </div>

          <a
            href="/signup"
            className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white"
          >
            Start Free
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
              Demo Dashboard
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
              AI Client Retention Command Center
            </h1>
            <p className="mt-4 max-w-2xl text-slate-700">
              Explore how coaches reduce churn, protect monthly revenue, and automate client follow-ups using Veyro.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <InfoBadge text="This demo dashboard shows how Veyro identifies churn risks and helps coaches take fast action before clients leave." />
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Retention Score", "87%", "Overall client consistency and retention health."],
            ["At-Risk Clients", "12", "Clients likely to stop responding or cancel soon."],
            ["Recovery Rate", "4x", "How effectively recovery actions bring clients back."],
            ["Protected Revenue", "$1,540", "Monthly recurring revenue protected from churn."],
          ].map(([title, value, info]) => (
            <div
              key={title}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">{title}</p>
                <InfoBadge text={info} />
              </div>
              <h2 className="mt-4 text-3xl font-semibold">{value}</h2>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[32px] border border-red-100 bg-gradient-to-r from-red-50 to-white p-8 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
                AI Priority Alert
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Sarah Johnson — High Churn Risk
              </h2>
            </div>
            <InfoBadge text="AI analyzes missed workouts, delayed replies, and motivation patterns to identify which client needs attention first." />
          </div>

          <div className="mt-6 space-y-2 text-sm text-slate-700">
            <p>• Missed 3 workouts this week</p>
            <p>• Replied “too busy” twice</p>
            <p>• Weekly score dropped from 8 → 4</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-medium text-white">
              Send Recovery Message
            </button>
            <button className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium">
              Schedule Reset Call
            </button>
          </div>
        </div>

        <div className="mt-10 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Client Retention Monitor</h2>
            <InfoBadge text="Every client gets tracked by risk level, engagement pattern, and recommended next action." />
          </div>

          <div className="mt-8 space-y-4">
            {demoClients.map((client) => (
              <div
                key={client.name}
                className="rounded-3xl border border-slate-200 p-6"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{client.name}</h3>
                    <p className="mt-2 text-sm text-slate-700">{client.note}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium">
                      {client.status}
                    </span>
                    <span className="rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-xs font-medium text-purple-700">
                      Risk {client.risk}
                    </span>
                    <button className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium">
                      Send WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
