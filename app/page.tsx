"use client";

import { useState } from "react";

export default function VeyroLandingPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    businessType: "",
    monthlyClients: "",
    retentionProblem: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const response = await fetch("/api/demo-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to save lead");
        setSubmitting(false);
        return;
      }

      setShowSuccessModal(true);

      setFormData({
        fullName: "",
        phone: "",
        businessType: "",
        monthlyClients: "",
        retentionProblem: "",
      });

      setSubmitting(false);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-white/20 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-700">
            VEYRO
          </p>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#pricing"
              className="text-sm font-medium text-slate-700 hover:text-slate-950"
            >
              Pricing
            </a>

            <a
              href="#demo-form"
              className="text-sm font-medium text-slate-700 hover:text-slate-950"
            >
              Demo
            </a>

            <a
              href="/login"
              className="text-sm font-medium text-slate-700 hover:text-slate-950"
            >
              Login
            </a>

            <a
              href="#pricing"
              className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:shadow-md"
            >
              Sign Up For Free
            </a>
          </nav>
        </div>
      </header>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-[32px] border border-slate-300 bg-white p-8 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-3xl">
                ✨
              </div>

              <h2 className="mt-6 text-2xl font-semibold text-slate-950">
                Demo Call Booked
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Your Veyro strategy demo request has been received successfully.
                Our team will contact you shortly to schedule your personalized
                walkthrough.
              </p>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="mt-8 w-full rounded-2xl bg-slate-950 px-6 py-4 text-sm font-medium text-white"
              >
                Perfect, Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-700">
              VEYRO
            </p>

            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">
              AI Client Retention OS for Fitness Coaches
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">
              Predict churn before clients leave. Automate WhatsApp + SMS
              accountability, recovery flows, and retention actions that protect
              recurring coaching revenue.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#pricing"
                className="inline-flex rounded-2xl bg-slate-950 px-7 py-4 text-sm font-medium text-white"
              >
                Sign Up For Free
              </a>

              <a
                href="/demo-dashboard"
                className="inline-flex rounded-2xl border border-slate-300 bg-white px-7 py-4 text-sm font-medium text-slate-900"
              >
                Watch Product Demo
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["4x", "Higher recovery rate"],
                ["91%", "Check-in completion"],
                ["$1.5k+", "Revenue protected / month"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-slate-300 bg-white p-5 shadow-sm"
                >
                  <p className="text-2xl font-semibold text-slate-950">
                    {value}
                  </p>

                  <p className="mt-2 text-sm text-slate-700">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* LIVE RETENTION INTELLIGENCE */}
          <div className="rounded-[32px] border border-slate-300 bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-slate-700">
              Live Retention Intelligence
            </p>

            <div className="mt-6 space-y-4">
              {[
                [
                  "Sarah Johnson",
                  "At Risk",
                  "Missed 2 workouts this week",
                ],
                [
                  "Michael Reed",
                  "Warning",
                  "Replied: NO TIME",
                ],
                [
                  "Emma Carter",
                  "Healthy",
                  "Replied: DONE consistently",
                ],
              ].map(([name, status, note]) => (
                <div
                  key={name}
                  className="rounded-3xl border border-slate-300 p-5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-950">{name}</h3>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        status === "At Risk"
                          ? "border border-red-200 bg-red-50 text-red-700"
                          : status === "Warning"
                          ? "border border-yellow-200 bg-yellow-50 text-yellow-700"
                          : "border border-green-200 bg-green-50 text-green-700"
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-slate-700">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section
        id="pricing"
        className="mx-auto max-w-7xl px-6 py-24 md:px-10"
      >
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">
            PRICING
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
            Simple pricing built for serious coaches
          </h2>

          <p className="mt-4 text-base text-slate-700">
            Choose the right retention system for your coaching business.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            [
              "Starter",
              "$99/mo",
              "Perfect for solo coaches",
              "/signup",
              "Sign Up For Free",
            ],
            [
              "Growth",
              "$149/mo",
              "Best for premium fitness coaches",
              "#demo-form",
              "Book Demo",
            ],
            [
              "Elite",
              "$299+/mo",
              "Done-for-you retention operations",
              "#demo-form",
              "Book Strategy Call",
            ],
          ].map(([title, price, desc, link, cta]) => (
            <div
              key={title}
              className="rounded-[32px] border border-slate-300 bg-white p-8 shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-slate-950">
                {title}
              </h3>

              <p className="mt-4 text-4xl font-semibold text-slate-950">
                {price}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                {desc}
              </p>

              <a
                href={link}
                className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-6 py-4 text-sm font-medium text-white"
              >
                {cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* DEMO FORM */}
      <section
        id="demo-form"
        className="mx-auto max-w-7xl px-6 pb-24 md:px-10"
      >
        <div className="rounded-[32px] border border-slate-300 bg-white p-10 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">
                BOOK A DEMO
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                Let’s protect your coaching revenue
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-slate-700">
                See how Veyro helps fitness coaches reduce churn, improve
                accountability, and automate retention.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full rounded-2xl border border-slate-300 px-5 py-4"
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full rounded-2xl border border-slate-300 px-5 py-4"
              />

              <input
                type="text"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                placeholder="Business Type"
                className="w-full rounded-2xl border border-slate-300 px-5 py-4"
              />

              <input
                type="text"
                name="monthlyClients"
                value={formData.monthlyClients}
                onChange={handleChange}
                placeholder="Monthly Active Clients"
                className="w-full rounded-2xl border border-slate-300 px-5 py-4"
              />

              <textarea
                rows={4}
                name="retentionProblem"
                value={formData.retentionProblem}
                onChange={handleChange}
                placeholder="Biggest client retention problem"
                className="w-full rounded-2xl border border-slate-300 px-5 py-4"
              />

              <button
                type="submit"
                className="w-full rounded-2xl bg-slate-950 px-6 py-4 text-white"
              >
                {submitting ? "Submitting..." : "Book Free Demo Call"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}