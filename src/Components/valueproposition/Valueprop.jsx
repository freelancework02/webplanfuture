import React from "react";

/**
 * Value proposition cards styled to echo the We Plan Future brand:
 * - Hex/arrow accent, deep navy gradient touches
 * - Polished cards with equal heights and smooth hover
 * - Works with string or JSX descriptions (first item uses JSX)
 */
export default function Valueprop() {
  const brand = {
    navy: "#0b3760",
    navyDark: "#062745",
    accent: "#1a69c7",
  };

  const services = [
    {
      title: "Planning for the Future",
      description: (
        <>
          <p className="text-slate-700 leading-relaxed">
            We’ve helped clients prepare for the unknown while staying aligned
            with their financial goals. Ask us about:
          </p>
          <ul className="list-disc list-outside mt-2 text-slate-600 pl-5 space-y-1">
            <li>Financial planning</li>
            <li>Tax optimization</li>
            <li>Education funding</li>
            <li>Estate planning</li>
          </ul>
          <p className="mt-2 text-slate-700 leading-relaxed">
            As an independent firm, we source across providers to tailor
            solutions that fit your exact needs.
          </p>
        </>
      ),
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img7.jpg",
    },
    {
      title: "Comprehensive End-to-End Approach",
      description:
        "We start with a deep needs analysis, clarify goals, and review your full portfolio. Then we tailor strategies to your risk tolerance and market realities—drawing from a broad product universe. Expect unbiased recommendations, built around you.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img8.jpg",
    },
    {
      title: "Committed to Service",
      description:
        "Great strategies begin with great relationships. Our mission is to exceed expectations—on day one and year ten. Let’s map long-term and short-term moves that bring your goals within reach.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img9.jpg",
    },
  ];

  return (
    <section
      className="relative py-16 md:py-24"
      style={{
        background:
          "radial-gradient(1000px 520px at 0% -10%, rgba(20,64,107,.12), transparent), radial-gradient(800px 420px at 110% 0%, rgba(10,41,77,.18), transparent)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3">
            <span
              className="inline-grid place-items-center w-12 h-12 rounded-xl shadow-lg"
              style={{
                background:
                  "linear-gradient(145deg, rgba(8,38,69,1), rgba(14,62,110,1))",
                clipPath:
                  "polygon(25% 6%, 75% 6%, 94% 50%, 75% 94%, 25% 94%, 6% 50%)",
              }}
            >
              <ArrowUpRight />
            </span>
            <h2
              className="text-2xl md:text-3xl font-extrabold tracking-tight"
              style={{ color: brand.navy }}
            >
              Our Value Proposition
            </h2>
          </div>
          <p className="mt-3 text-base md:text-lg text-slate-600">
            Clear guidance. Disciplined strategy. Better future ahead.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <article
              key={index}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white/85 backdrop-blur shadow-[0_6px_30px_rgba(10,41,77,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(10,41,77,0.18)]"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/0 via-transparent to-[#0b3760]/[.05]" />
                <span
                  className="absolute -top-4 -right-4 grid place-items-center w-20 h-20 opacity-90 transition-transform duration-500 group-hover:rotate-6"
                  aria-hidden="true"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(8,38,69,1), rgba(14,62,110,1))",
                    clipPath:
                      "polygon(25% 6%, 75% 6%, 94% 50%, 75% 94%, 25% 94%, 6% 50%)",
                    boxShadow: "0 10px 30px rgba(10,41,77,.28)",
                  }}
                >
                  <ArrowUpRight size={30} />
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 md:p-7 lg:p-8">
                <h3 className="text-xl font-bold tracking-tight text-slate-900">
                  {service.title}
                </h3>
                <div className="mt-3 text-slate-600 leading-relaxed">
                  {service.description}
                </div>

                {/* CTA */}
                <div className="mt-6 flex items-center">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{
                      background:
                        "linear-gradient(135deg, #0b3760, #1a69c7 70%)",
                      color: "white",
                      boxShadow: "0 8px 22px rgba(26,105,199,.35)",
                    }}
                  >
                    Talk to an Advisor
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      <path
                        d="M5 12h12m0 0-5-5m5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Hover ring */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 transition-opacity group-hover:opacity-100"
                style={{
                  ringColor: brand.accent,
                  boxShadow: "inset 0 0 0 1px rgba(26,105,199,.45)",
                }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Inline SVG icon that mirrors the logo’s “upward progress” cue */
function ArrowUpRight({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="text-white drop-shadow-sm"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 17L17 7M17 7H8M17 7v9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
