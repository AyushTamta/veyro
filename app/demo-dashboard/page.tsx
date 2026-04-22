"use client";

import { Info } from "lucide-react";

const clients = [
  {
    name: "Sarah Johnson",
    status: "At Risk",
    issue: "Missed 2 workouts this week",
  },
  {
    name: "Michael Reed",
    status: "Warning",
    issue: "Replied: NO TIME",
  },
  {
    name: "Emma Carter",
    status: "Healthy",
    issue: "Consistent check-ins and progress",
  },
];

const actions = [
  {
    title: "Send WhatsApp Recovery",
    info: "Automatically sends a personalized WhatsApp recovery message to re-engage clients showing signs of churn risk.",
  },
  {
    title: "Trigger SMS Check-In",
    info: "Sends accountability SMS prompts to improve consistency, increase engagement, and reduce silent drop-offs.",
  },
  {
    title: "View Churn Prediction",
    info: "AI analyzes client behaviour patterns and predicts potential cancellations before they happen.",
  },
];

export default function DemoDashboardPage() {
  return (
    <main className="min-h-screen bg-[#F7F8FA] px-6 py-10 text-slate-900 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
              Demo Dashboard
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">
              Veyro Intelligence Command Center
            </h1>
            <p className="mt-3 text-base text-slate-700">
              Interactive product tour — actions are disabled in demo mode.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {[
            ["Retention Score", "87%", "Overall health of your client retention system and long-term consistency."],
            ["At-Risk Clients", "12", "Clients likely to churn soon and requiring immediate intervention."],
            ["Recovery Rate", "4x", "Measures how effectively disengaged clients return to active participation."],
            ["Protected Revenue", "$1,540", "Estimated monthly revenue saved by preventing cancellations."],
          ].map(([title, value, info]) => (
            <div
              key={title}
              className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-600">{title}</p>
                  <h2 className="mt-3 text-3xl font-semibold text-slate-950">{value}</h2>
                </div>

                <div className="relative">
                  <button className="rounded-full border border-slate-200 p-2 text-slate-600">
                    <Info size={16} />
                  </button>
                  <div className="absolute right-0 top-12 z-20 hidden w-72 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700 shadow-xl group-hover:block">
                    {info}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">
                Client Retention Monitor
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                Dummy clients shown for product walkthrough experience.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {clients.map((client) => (
              <div
                key={client.name}
                className="rounded-3xl border border-slate-200 p-6"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">
                      {client.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-700">{client.issue}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {actions.map((action) => (
                      <div key={action.title} className="group relative">
                        <button className="cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-medium text-slate-500">
                          {action.title}
                        </button>

                        <button className="absolute -right-2 -top-2 rounded-full border border-slate-200 bg-white p-1 text-slate-600 shadow-sm">
                          <Info size={14} />
                        </button>

                        <div className="absolute right-0 top-14 z-20 hidden w-72 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700 shadow-xl group-hover:block">
                          {action.info}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
