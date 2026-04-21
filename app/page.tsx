export default function VeyroDashboard() {
  const stats = [
    { title: "Total Clients", value: "48", subtext: "+6 this month" },
    { title: "Today's Check-ins", value: "36", subtext: "75% completed" },
    { title: "Missed Alerts", value: "5", subtext: "Needs attention" },
    { title: "At-Risk Clients", value: "3", subtext: "Predicted churn" },
  ];

  const clients = [
    {
      name: "Sarah Johnson",
      goal: "Weight Loss",
      status: "Completed",
      streak: "12 day streak",
    },
    {
      name: "Michael Reed",
      goal: "Muscle Gain",
      status: "Missed",
      streak: "Recovery needed",
    },
    {
      name: "Emma Wilson",
      goal: "Body Recomposition",
      status: "Skipped",
      streak: "5 day streak",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] p-8 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Veyro</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Reduce Client Drop-Offs Before They Happen
            </h1>
            <p className="mt-3 text-slate-600">
              Monitor accountability, detect missed check-ins, and protect coach revenue.
            </p>
          </div>

          <button className="rounded-2xl border border-slate-300 px-6 py-3 font-medium shadow-sm transition hover:shadow-md">
            + Add Client
          </button>
        </header>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-slate-500">{item.title}</p>
              <h2 className="mt-3 text-3xl font-semibold">{item.value}</h2>
              <p className="mt-2 text-sm text-slate-500">{item.subtext}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Client Activity</h2>
                <p className="text-sm text-slate-500">
                  Daily accountability overview
                </p>
              </div>
              <button className="text-sm font-medium">View all</button>
            </div>

            <div className="space-y-4">
              {clients.map((client) => (
                <div
                  key={client.name}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 p-5"
                >
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{client.goal}</p>
                    <p className="mt-2 text-sm text-slate-400">{client.streak}</p>
                  </div>

                  <span className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium">
                    {client.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Weekly Compliance</h3>
              <p className="mt-4 text-sm text-slate-500">Average compliance score</p>
              <p className="mt-2 text-4xl font-semibold">84%</p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Revenue Protection</h3>
              <p className="mt-4 text-sm text-slate-500">Clients saved this month</p>
              <p className="mt-2 text-4xl font-semibold">11</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
