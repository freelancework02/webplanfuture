import React from "react";
import {
  Mail,
  Phone,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Calendar,
} from "lucide-react";

/**
 * HeroSection (single-image version)
 * - Professional cobalt/navy gradient
 * - One premium visual on the right with glow ring and glass frame
 * - Clear CTA + benefits + social proof
 * - Fully responsive & accessible
 */
const HeroSection = () => {
  const heroImage =
    "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/card-img4.jpg";

  return (
    <section
      className="relative text-white pt-24 md:pt-28 pb-16 md:pb-20 px-5 md:px-0"
      style={{
        background:
          "radial-gradient(1000px 320px at 12% -8%, rgba(37,99,235,.22), transparent 55%), linear-gradient(135deg, #0f2a4a, #11355e 55%, #0b1f36)",
        marginTop: "90px",
      }}
    >
      {/* soft grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[.12]"
        style={{
          backgroundImage:
            "radial-gradient(#ffffff 1px, transparent 1.5px), radial-gradient(#ffffff 1px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          backgroundPosition: "0 0, 14px 14px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,.6), rgba(0,0,0,.1), transparent)",
        }}
      />

      <div className="max-w-[130rem] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-2 sm:px-6 lg:px-10 relative">
        {/* LEFT (copy) */}
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur">
            <ShieldCheck className="w-4 h-4 text-white/90" />
            <span className="text-sm font-medium tracking-wide">
              Fiduciary-minded guidance
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Build a{" "}
            <span className="align-baseline inline-block bg-gradient-to-r from-[#eef5ff] via-[#d8e2f0] to-[#eef5ff] text-transparent bg-clip-text">
              Stronger Financial Future
            </span>
            Starting Now.
          </h1>

          <p className="text-lg md:text-2xl leading-relaxed text-[#d8e2f0] max-w-2xl">
            Clear plans. Smart protection. Disciplined growth. We combine
            education and strategy to help you reach—and keep—your goals.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            <a
              onClick={(e) => {
                e.preventDefault();
                window.Calendly?.initPopupWidget?.({
                  url: "https://calendly.com/pramod-kanchan/30min",
                });
              }}
              rel="noopener noreferrer"
              className="cursor-pointer text-lg font-semibold py-4 px-7 rounded-xl transition-transform
                         shadow-[0_14px_28px_-14px_rgba(37,99,235,.6)]
                         border border-white/70
                         bg-gradient-to-br from-[#eef5ff] via-[#d8e2f0] to-[#eef5ff]
                         text-[#0b2741] hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Book a 30-min Call
            </a>

            <a
              href="/service"
              className="text-lg font-semibold py-4 px-7 rounded-xl border border-white/25 bg-white/10 backdrop-blur hover:bg-white/15 transition inline-flex items-center gap-2"
            >
              Explore Services
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Benefit bullets */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              "Personalized retirement & income plans",
              "Asset protection & legacy strategies",
              "Evidence-based investing discipline",
              "Plain-English education & reviews",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 text-white/95">
                <CheckCircle2 className="w-5 h-5 text-[#7ec8ff]" />
                <span className="text-base">{t}</span>
              </li>
            ))}
          </ul>

          {/* Contact */}
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 text-white/95">
              <Mail className="w-5 h-5 text-[#7ec8ff]" />
              <a
                href="mailto:contact@ProsperEdgeFinance.com"
                className="text-lg underline-offset-2 hover:underline"
              >
                contact@ProsperEdgeFinance.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-white/95">
              <Phone className="w-5 h-5 text-[#7ec8ff]" />
              <a href="tel:19784301852" className="text-lg">
                978-430-1852
              </a>
            </div>
          </div>

          {/* Social proof / KPIs */}
          <div className="pt-6 grid grid-cols-3 gap-4 max-w-xl">
            {[
              { k: "98%", v: "Client Satisfaction" },
              { k: "15+ yrs", v: "Combined Expertise" },
              { k: "1,200+", v: "Plans Reviewed" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-xl bg-white/8 border border-white/15 px-4 py-3 text-center"
              >
                <div className="text-2xl font-bold">{s.k}</div>
                <div className="text-xs text-white/80">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT (single premium image) */}
        <div className="relative flex justify-center md:justify-end">
          <figure className="relative w-full max-w-md md:max-w-lg lg:max-w-xl">
            {/* Glow ring behind */}
            <span
              aria-hidden="true"
              className="absolute -inset-6 rounded-[28px]"
              style={{
                background:
                  "radial-gradient(260px 180px at 70% 30%, rgba(37,99,235,.30), transparent 60%)",
                filter: "blur(10px)",
                zIndex: 0,
              }}
            />
            {/* Glass frame */}
            <div className="relative rounded-2xl overflow-hidden border border-white/15 backdrop-blur-sm shadow-[0_24px_60px_-24px_rgba(0,0,0,.65)]">
              <img
                src={heroImage}
                alt="Advisors reviewing a financial plan"
                className="w-full h-[320px] md:h-[420px] lg:h-[480px] object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating stat card */}
            <figcaption className="absolute -bottom-6 left-3 sm:left-0">
              <div className="rounded-2xl bg-white/95 text-[#0b2741] px-4 py-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,.45)] border border-white/80">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#1161ff]" />
                  <div className="text-sm font-semibold tracking-wide">
                    On-track Projection
                  </div>
                </div>
                <div className="mt-1 text-2xl font-extrabold">+12.4%</div>
                <div className="text-xs text-slate-600">12-mo rolling</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* bottom fade for clean edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-12"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.12), rgba(0,0,0,.18))",
          opacity: 0.25,
        }}
      />
    </section>
  );
};

export default HeroSection;
