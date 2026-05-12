"use client";

import { useMemo } from "react";

const liveRetentionCards = [
  {
    title: "🔴 High Risk Client Detected",
    description: "Sarah missed 3 workouts this week. Recovery sequence triggered.",
  },
  {
    title: "🟡 Motivation Drop Identified",
    description: "Late replies and skipped meal check-ins detected for Michael.",
  },
  {
    title: "💰 Revenue Protected",
    description: "$1,540 protected this month using recovery automation.",
  },
  {
    title: "⚡ AI Recovery Triggered",
    description: "4 personalized reset messages sent automatically today.",
  },
  {
    title: "📈 Retention Score Improved",
    description: "Coach retention performance improved by 18% this week.",
  },
];

const howItWorksSteps = [
  {
    step: "STEP 01",
    title: "Add Your Clients",
    description:
      "Add client name, goals, phone number, and check-in schedule inside your dashboard.",
  },
  {
    step: "STEP 02",
    title: "AI Sends Follow-Ups",
    description:
      "Automated WhatsApp check-ins track workouts, meals, missed sessions, and motivation.",
  },
  {
    step: "STEP 03",
    title: "Recover At-Risk Clients",
    description:
      "Veyro shows exactly who needs attention before they leave and what action to take.",
  },
];

export default function HomePage() {
  const duplicatedCards = useMemo(
    () => [...liveRetentionCards, ...liveRetentionCards, ...liveRetentionCards],
    []
  );

  return (
    <main className="min-h-screen bg-[#f8f9fb] text-slate-900">
      {/* NAVBAR */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <a
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-900"
          >
            VEYRO
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#pricing" className="text-sm font-medium text-slate-700 hover:text-black">
              Pricing
            </a>

            <a href="#features" className="text-sm font-medium text-slate-700 hover:text-black">
              Demo
            </a>

            <a href="/login" className="text-sm font-medium text-slate-700 hover:text-black">
              Login
            </a>

            <a
              href="/pricing"
              className="rounded-2xl bg-[#050b2c] px-7 py-4 text-sm font-medium text-white shadow-sm"
            >
              Sign Up For Free
            </a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-20 px-6 pt-32 pb-20 md:px-10 lg:grid-cols-2">
        {/* LEFT */}
        <div>
          <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-[#050b2c] md:text-6xl">
            AI Client
<br></br>
            Retention OS
           <br></br>
            for Fitness
           <br></br>
            Coaches
          </h1>

          <p className="mt-8 max-w-xl text-l leading-5 text-slate-600">
            Predict churn before clients leave. Automate WhatsApp + SMS
            accountability, recovery flows, and retention actions that protect
            recurring coaching revenue.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <a
              href="/pricing"
              className="rounded-2xl bg-[#050b2c] px-9 py-5 text-base font-medium text-white"
            >
              Sign Up For Free
            </a>

            <a
              href="/demo-dashboard"
              className="rounded-2xl border border-slate-300 bg-white px-9 py-5 text-base font-medium text-slate-900"
            >
              Watch Product Demo
            </a>
          </div>

          {/* STATS */}
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-4xl font-semibold text-[#050b2c]">4x</h3>
              <p className="mt-4 text-lg text-slate-600">
                Higher recovery rate
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-4xl font-semibold text-[#050b2c]">91%</h3>
              <p className="mt-4 text-lg text-slate-600">
                Check-in completion
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-4xl font-semibold text-[#050b2c]">₹1.5L+</h3>
              <p className="mt-4 text-lg text-slate-600">
                Revenue protected / month
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[36px] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
            Live AI Retention Intelligence
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Real-time retention tracking with smart recovery actions.
          </p>

          <div className="relative mt-8 h-[430px] overflow-hidden rounded-3xl border border-slate-200 bg-white p-5">
            <div
              className="flex flex-col gap-4"
              style={{ animation: "veyroScroll 22s linear infinite" }}
            >
              {duplicatedCards.map((card, index) => {
                return (
                  <div
                    key={`${card.title}-${index}`}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <h3 className="text-sm font-semibold text-slate-950">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <style jsx>{`
              @keyframes veyroScroll {
                0% {
                  transform: translateY(0);
                }
                100% {
                  transform: translateY(-66%);
                }
              }
            `}</style>
          </div>
        </div>
      </section>


 {/* HOW IT WORKS */}
 <section
        id="features"
        className="mx-auto max-w-7xl px-6 py-28 md:px-10"
      >
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-600">
            How It Works
          </p>

          <h2 className="mt-4 text-5xl font-semibold tracking-tight text-[#050b2c] md:text-6xl">
      Simple System. Powerful Retention.
    </h2>

    <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
      Built for online fitness coaches to reduce churn, automate follow-ups,
      and protect predictable recurring revenue.
    </p>
  </div>

  {/* STEP CARDS */}
  <div className="mt-16 grid gap-6 md:grid-cols-3">
    <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200">
      <p className="text-sm font-semibold text-violet-600">
        STEP 01
      </p>

      <h3 className="mt-4 text-2xl font-semibold text-slate-950">
        Add Your Clients
      </h3>

      <p className="mt-4 text-sm leading-7 text-slate-600">
        Add client name, goals, phone number, and check-in schedule
        inside your dashboard.
      </p>
    </div>

    <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200">
      <p className="text-sm font-semibold text-violet-600">
        STEP 02
      </p>

      <h3 className="mt-4 text-2xl font-semibold text-slate-950">
        AI Sends Follow-Ups
      </h3>

      <p className="mt-4 text-sm leading-7 text-slate-600">
        Automated WhatsApp check-ins track workouts, meals,
        missed sessions, and motivation.
      </p>
    </div>

    <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200">
      <p className="text-sm font-semibold text-violet-600">
        STEP 03
      </p>

      <h3 className="mt-4 text-2xl font-semibold text-slate-950">
        Recover At-Risk Clients
      </h3>

      <p className="mt-4 text-sm leading-7 text-slate-600">
        Veyro shows exactly who needs attention before they leave
        and what action to take.
      </p>
    </div>
  





        </div>

        {/* IMAGE */}
        <div className="mt-16">
          <img
            src="/images/veyro-demo.png"
            alt="Veyro Product Demo"
            className="w-full rounded-[32px] border border-slate-200 shadow-sm"
          />
        </div>

        {/* VIDEO */}
        <div className="mt-14">
          <video
            controls
            className="w-full rounded-[32px] border border-slate-200 shadow-sm bg-black"
          >
            <source src="/video/Veyro_demo_v.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>


      <section id="lead-generation" className="mx-auto max-w-7xl px-6 py-28 md:px-10">
        <div className="rounded-[40px] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-sm md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-600">
              AI Revenue Growth Engine
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              Turn Retention Into Revenue Growth
            </h2>

            <p className="mt-5 text-base text-slate-700 md:text-lg">
              Built for online fitness coaches to reduce churn, automate follow-ups,
              and protect predictable recurring revenue.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <div className="grid gap-6 md:grid-cols-1">
              <div className="group rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_20px_60px_rgba(124,58,237,0.08)]">
                <h3 className="text-xl font-semibold text-slate-950">Free Retention Audit</h3>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  Find which clients are about to leave and where revenue is at risk.
                </p>
                <a
                  href="/signup"
                  className="mt-8 block w-full rounded-2xl bg-slate-950 px-5 py-4 text-center text-sm font-medium text-white"
                >
                  Get Free Audit
                </a>
              </div>

              <div className="group rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_20px_60px_rgba(124,58,237,0.08)]">
                <h3 className="text-xl font-semibold text-slate-950">Instant WhatsApp Demo</h3>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  Get a product walkthrough directly on WhatsApp and see how Veyro works.
                </p>
                <a
                  href="https://wa.me/919999999999?text=Hi%20Ayush%2C%20I%20want%20a%20Veyro%20demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 block w-full rounded-2xl border border-slate-300 px-5 py-4 text-center text-sm font-medium text-slate-900"
                >
                  Get Demo On WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
                Book Free Strategy Call
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-slate-950">
                Let’s Improve Your Client Retention
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Leave your details and we’ll reach out for a quick founder call.
              </p>

              <form className="mt-8 space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-4 text-sm outline-none focus:border-slate-500"
                />

                <input
                  type="tel"
                  placeholder="WhatsApp Number"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-4 text-sm outline-none focus:border-slate-500"
                />

                <input
                  type="text"
                  placeholder="How many clients do you handle?"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-4 text-sm outline-none focus:border-slate-500"
                />

                <textarea
                  placeholder="Biggest retention problem"
                  rows={4}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-4 text-sm outline-none focus:border-slate-500"
                />

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-slate-950 px-5 py-4 text-sm font-medium text-white"
                >
                  Book Free Call
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-600">
            Pricing
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
            Pricing Built For Predictable Growth
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-950">Starter</h3>
            <p className="mt-4 text-4xl font-semibold text-slate-950">$29/mo</p>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <p>• Up to 25 clients</p>
              <p>• Daily check-ins</p>
              <p>• WhatsApp reminders</p>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-950">Growth</h3>
            <p className="mt-4 text-4xl font-semibold text-slate-950">$79/mo</p>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <p>• Up to 100 clients</p>
              <p>• AI priority alerts</p>
              <p>• Recovery automation</p>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-950">Scale</h3>
            <p className="mt-4 text-4xl font-semibold text-slate-950">$149/mo</p>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <p>• Unlimited clients</p>
              <p>• Advanced AI engine</p>
              <p>• Priority support</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-950">
              VEYRO
            </p>
            <p className="mt-3 text-sm text-slate-600">
              AI-powered retention system for online fitness coaches.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-900">Contact</p>
            <p className="mt-2 text-sm text-slate-600">ayush.tamta111@gmail.com</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
