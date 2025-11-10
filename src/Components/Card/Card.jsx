import React from "react";

/**
 * Professional Services – clean finance palette, subtle depth, crisp type
 * - Primary: cobalt (#2563eb / #1e40af)
 * - Neutrals: slate backgrounds/borders
 * - Accents: soft teal for micro-highlights
 * Tailwind CSS required.
 */
export default function ProfessionalServices() {
  const services = [
    {
      title: "Expertise",
      description:
        "Over ten years of collective experience. Clear insights, practical roadmaps, and ongoing reviews to keep you on track.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img1.jpg",
    },
    {
      title: "Discretion",
      description:
        "Your privacy comes first. We protect sensitive information with strict policies and secure processes.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img2.jpg",
    },
    {
      title: "Dependability",
      description:
        "Experienced representatives who prioritize consistency, transparency, and measurable outcomes.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img3.jpg",
    },
    {
      title: "Consulting",
      description:
        "Save time with focused sessions—clarify goals, define strategy, and close financial gaps with confidence.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img4.jpg",
    },
    {
      title: "Sales",
      description:
        "A curated set of solutions that fit your plan—selected for suitability, cost, and long-term value.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img5.jpg",
    },
    {
      title: "Partnership",
      description:
        "If our philosophy resonates, let’s collaborate and grow together with shared standards and goals.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img6.jpg",
    },
  ];

  return (
    <section
      className="py-16 px-4 md:px-6 lg:px-10"
      style={{
        background:
          "linear-gradient(180deg, #f8fafc 0%, #ffffff 40%, #f8fafc 100%)",
      }}
    >
      {/* Section tag */}
      <div className="flex justify-center mb-6">
        <div className="px-5 py-2 rounded-full text-sm font-medium border border-slate-200 bg-white">
          <span className="text-slate-600 tracking-wide">
            WHAT CAN YOU EXPECT FROM US
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Heading + subtext */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Skills & Offers
          </h2>
          <p className="mt-3 text-slate-600 max-w-3xl mx-auto">
            Expertise you can trust, delivered with clarity and care—designed to
            help you move forward with confidence.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((s, i) => (
            <article
              key={i}
              className="group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-[0_10px_18px_-12px_rgba(15,23,42,.2)] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image with gradient overlay */}
              <div className="relative h-48 w-full">
                <img
                  src={s.image || "/placeholder.svg"}
                  alt={s.title}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-slate-900/5 to-transparent" />
                {/* corner accent */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-70 blur-md"
                  style={{
                    background:
                      "radial-gradient(40px 40px at 50% 50%, rgba(37,99,235,.35), transparent 60%)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {s.description}
                </p>

                {/* micro-highlights / chips */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Clarity", "Consistency", "Accountability"]
                    .slice(0, Math.min(3, 1 + ((i % 3) + 1))) // vary a bit per card
                    .map((chip, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-600"
                      >
                        {chip}
                      </span>
                    ))}
                </div>

                {/* subtle hover line */}
                <div className="mt-6 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </article>
          ))}
        </div>

        {/* CTA strip */}
        {/* <div className="mt-14 rounded-2xl border border-slate-200 bg-white px-6 py-6 md:px-8 md:py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Want a quick overview of how we can help?
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Get a no-pressure introduction tailored to your goals.
            </p>
          </div>
          <a
            href="#book"
            onClick={(e) => {
              e.preventDefault();
              window.Calendly?.initPopupWidget?.({
                url: "https://calendly.com/pramod-kanchan/30min",
              });
            }}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white transition-transform"
            style={{
              background:
                "linear-gradient(145deg, #2563eb 0%, #1e40af 100%)",
              boxShadow: "0 14px 28px -14px rgba(37,99,235,.55)",
            }}
          >
            Book a 30-min Call
          </a>
        </div> */}
      </div>
    </section>
  );
}
