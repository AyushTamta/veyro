export default function VeyroLandingPage() {
  const showDemoModal = false;
  return (
    <main className="min-h-screen bg-[#F7F8FA] text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              VEYRO
            </p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">
              AI Client Retention OS for Fitness Coaches
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Predict churn before clients leave. Automate WhatsApp + SMS accountability,
              recovery flows, and retention actions that protect recurring coaching revenue.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-2xl bg-slate-950 px-7 py-4 text-sm font-medium text-white shadow-sm transition hover:shadow-md">
                Book Demo
              </button>
              <button className="rounded-2xl border border-slate-300 bg-white px-7 py-4 text-sm font-medium text-slate-900 transition hover:shadow-sm">
                Watch Product Tour
              </button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["4x", "Higher recovery rate"],
                ["91%", "Check-in completion"],
                ["$1.5k+", "Revenue protected / month"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-2xl font-semibold text-slate-950">{value}</p>
                  <p className="mt-2 text-sm text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Live Retention Intelligence</p>
            <div className="mt-6 space-y-4">
              {[
                ["Sarah Johnson", "At Risk", "Missed 2 workouts this week"],
                ["Michael Reed", "Warning", "Replied: NO TIME"],
                ["Emma Carter", "Healthy", "Replied: DONE consistently"],
              ].map(([name, status, note]) => (
                <div key={name} className="rounded-3xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-950">{name}</h3>
                    <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700">
                      {status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Why Coaches Lose Clients",
              text: "Missed check-ins, weak accountability, and delayed follow-up quietly cause churn before coaches even notice it."
            },
            {
              title: "How Veyro Fixes It",
              text: "Veyro detects warning signs early and triggers WhatsApp + SMS recovery flows before clients disappear."
            },
            {
              title: "Why It Matters",
              text: "Retaining just 2 extra clients per month can protect hundreds to thousands in recurring monthly revenue."
            }
          ].map((item) => (
            <div key={item.title} className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            ROI CALCULATOR
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
            Losing just 2 clients/month can cost you $600–$1500+
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            Most fitness coaches focus on lead generation, but retention is where real profit lives.
            Veyro protects recurring revenue by preventing avoidable client churn automatically.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-2xl bg-slate-950 px-7 py-4 text-sm font-medium text-white shadow-sm transition hover:shadow-md">
              Book Free Demo
            </button>
            <button className="rounded-2xl border border-slate-300 bg-white px-7 py-4 text-sm font-medium text-slate-900 transition hover:shadow-sm">
              See Revenue Recovery
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                BOOK A DEMO
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                Let’s protect your coaching revenue
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                See how Veyro helps fitness coaches reduce churn, improve accountability,
                and automate retention without spending hours chasing clients manually.
              </p>
            </div>

            <form className="space-y-4 rounded-[28px] border border-slate-200 p-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-sm outline-none"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-sm outline-none"
              />

              <input
                type="text"
                placeholder="Business Type (Online Coach / Gym / Trainer)"
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-sm outline-none"
              />

              <input
                type="text"
                placeholder="Monthly Active Clients"
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-sm outline-none"
              />

              <textarea
                placeholder="Biggest client retention problem"
                rows={4}
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-sm outline-none"
              />

              <button className="w-full rounded-2xl bg-slate-950 px-7 py-4 text-sm font-medium text-white shadow-sm transition hover:shadow-md">
                Book Free Demo Call
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
