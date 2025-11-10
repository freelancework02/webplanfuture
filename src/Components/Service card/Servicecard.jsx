import React from "react";

/**
 * Service cards inspired by the brand’s hexagon + upward-arrow mark.
 * - Clean navy gradient, glassy cards, hex accents, subtle motion
 * - Equal heights (flex), consistent media ratio, smooth hover
 * - No external icon libs; inline SVG only
 */
export default function Servicecard() {
  const services = [
    {
      title: "Retirement Planning",
      description:
        "Plan your retirement so your lifestyle is shaped by choice, not just assets at retirement.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img1.jpg",
    },
    {
      title: "Estate Planning",
      description:
        "Protect what you’ve built from probate, litigation, and unfavorable taxation.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img2.jpg",
    },
    {
      title: "Kids Education Planning",
      description:
        "Choose a smart, disciplined path to fund your children’s education.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img3.jpg",
    },
    {
      title: "Lifetime Income Planning",
      description:
        "No pension? Create one—and secure predictable, lifetime income streams.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img4.jpg",
    },
    {
      title: "Life Insurance Planning",
      description:
        "Right-sized coverage with living benefits and quotes that fit your budget.",
      image:
        "https://s3.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/files/images/240314022303_Life%20Insurance%20at%20Various%20Life%20Stages.jpeg",
    },
    {
      title: "Investments Planning",
      description:
        "Grow capital the smart way. Know the difference between nominal and real returns.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/service-img6.jpg",
    },
  ];

  // brand colors from the logo
  const brand = {
    navy: "#0b3760",
    navyDark: "#062745",
    slate: "#0f2f52",
    accent: "#1a69c7",
  };

  return (
    <section
      className="relative py-16 md:py-24 mt-24"
      style={{
        background:
          "radial-gradient(1200px 600px at 10% -10%, rgba(20,64,107,.18), transparent), radial-gradient(900px 500px at 110% 10%, rgba(10,41,77,.25), transparent)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3">
            {/* Hex badge echoing the logo */}
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
              Professional Services
            </h2>
          </div>
          <p className="mt-3 text-base md:text-lg text-slate-600">
            We Plan Future — Better Future Ahead
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((s, i) => (
            <article
              key={i}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur shadow-[0_6px_30px_rgba(10,41,77,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(10,41,77,0.18)]"
            >
              {/* Media */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={s.image || "/placeholder.svg"}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                />
                {/* top gradient and hex badge */}
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

              {/* Body */}
              <div className="flex flex-col p-6 md:p-7 lg:p-8">
                <h3
                  className="text-xl font-bold tracking-tight text-slate-900"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {s.title}
                </h3>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  {s.description}
                </p>

                {/* CTA */}
                <div className="mt-6 md:mt-7 flex items-center justify-center md:justify-start">
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
                    Learn more
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

              {/* subtle brand border on hover */}
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

/* ───────────────────────────────── Arrow icon (brand accent) ──────────────────────────────── */
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
      <defs />
    </svg>
  );
}
