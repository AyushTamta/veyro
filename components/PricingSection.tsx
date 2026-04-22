export default function PricingSection() {
    return (
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
  
          <p className="mt-4 max-w-2xl mx-auto text-base text-slate-700">
            We help fitness coaches reduce churn, protect recurring revenue, and
            automate client retention without manual follow-up chaos.
          </p>
        </div>
  
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Starter",
              price: "$99/mo",
              subtitle: "Perfect for solo coaches",
              features: [
                "Up to 30 active clients",
                "Daily workout check-ins",
                "Weekly progress reviews",
                "Basic churn alerts",
                "Client retention dashboard",
              ],
              cta: "Start Free",
              link: "/signup",
            },
            {
              title: "Growth",
              price: "$199/mo",
              subtitle: "Best for premium fitness coaches",
              features: [
                "Up to 100 active clients",
                "AI recovery message generation",
                "Priority risk alerts",
                "WhatsApp recovery automation",
                "Revenue protection insights",
              ],
              cta: "Book Demo",
              link: "#demo-form",
              highlight: true,
            },
            {
              title: "Elite",
              price: "$499/mo",
              subtitle: "For teams & high-ticket businesses",
              features: [
                "Unlimited clients",
                "Team access",
                "Advanced analytics",
                "White-glove onboarding",
                "Dedicated support",
              ],
              cta: "Book Strategy Call",
              link: "#demo-form",
            },
          ].map((plan) => (
            <div
              key={plan.title}
              className={`rounded-[32px] border p-8 shadow-sm bg-white ${
                plan.highlight
                  ? "border-slate-950 ring-1 ring-slate-950"
                  : "border-slate-300"
              }`}
            >
              {plan.highlight && (
                <p className="mb-4 inline-flex rounded-full bg-slate-950 px-4 py-1 text-xs font-medium text-white">
                  MOST POPULAR
                </p>
              )}
  
              <h3 className="text-2xl font-semibold text-slate-950">
                {plan.title}
              </h3>
  
              <p className="mt-3 text-4xl font-semibold text-slate-950">
                {plan.price}
              </p>
  
              <p className="mt-3 text-sm text-slate-700">
                {plan.subtitle}
              </p>
  
              <div className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <span className="mt-1 text-sm">✓</span>
                    <p className="text-sm text-slate-700">{feature}</p>
                  </div>
                ))}
              </div>
  
              <a
                href={plan.link}
                className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-6 py-4 text-sm font-medium text-white shadow-sm transition hover:shadow-md"
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
  
        {/* FOUNDER LIFETIME DEAL */}
        <div className="mt-12 rounded-[32px] border border-amber-200 bg-amber-50 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
            Founder Lifetime Deal
          </p>
  
          <h3 className="mt-3 text-3xl font-semibold text-slate-950">
            $999 One-Time
          </h3>
  
          <p className="mt-4 max-w-2xl mx-auto text-base text-slate-700">
            Limited for the first 25 founding coaches only. Includes Growth Plan
            access with up to 50 clients and priority onboarding.
          </p>
  
          <a
            href="#demo-form"
            className="mt-8 inline-flex rounded-2xl bg-slate-950 px-8 py-4 text-sm font-medium text-white"
          >
            Claim Founder Offer
          </a>
        </div>
      </section>
    );
  }