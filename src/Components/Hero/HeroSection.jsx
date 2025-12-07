// HeroSection.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Mail,
  Phone,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Calendar,
} from "lucide-react";
import img from '../../assets/image3.png'

/**
 * IMPORTANT: Put the generated image file into your public folder
 * as "/images/hero-weplanfuture-hero.webp" (WebP) and
 * "/images/hero-weplanfuture-hero.jpg" (fallback). You can download the
 * image from ChatGPT and drop it there. The <picture> element below will
 * handle modern/fallback sources automatically.
 */

/* -------------------------------------------------------
   Calendly loader (safe, idempotent)
------------------------------------------------------- */
function useCalendlyLoader() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.Calendly) return; // already available
    const existing = document.getElementById("calendly-script");
    if (existing) return;
    const s = document.createElement("script");
    s.id = "calendly-script";
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);
}

/* -------------------------------------------------------
   Hero Section (image-based)
------------------------------------------------------- */
const HeroSection = ({ topOffset = 88 }) => {
  useCalendlyLoader();

  const openCalendly = (e) => {
    e.preventDefault();
    try {
      if (window.Calendly?.initPopupWidget) {
        window.Calendly.initPopupWidget({
          url: "https://calendly.com/jack-weplanfuture/60min",
        });
      } else {
        window.open(
          "https://calendly.com/jack-weplanfuture/60min",
          "_blank",
          "noopener,noreferrer"
        );
      }
    } catch {
      window.open(
        "https://calendly.com/jack-weplanfuture/60min",
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const benefits = [
    "Personalized retirement & income plans",
    "Asset protection & legacy strategies",
    "Evidence-based investing discipline",
    "Plain-English education & reviews",
  ];

  const stats = [
    { k: "99%", v: "Client Satisfaction" },
    { k: "26+ yrs", v: "Combined Expertise" },
    { k: "1,200+", v: "Plans Reviewed" },
  ];

  return (
    <section
      className="relative text-white pt-24 md:pt-28 pb-16 md:pb-20 px-5 md:px-0 selection:bg-white/10 selection:text-white"
      style={{
        // gradient background behind the image for smooth edges on ultra-wide screens
        background:
          "radial-gradient(1000px 320px at 12% -8%, rgba(30,99,255,.22), transparent 55%), linear-gradient(135deg, #001233, #0f2a4a 55%, #081a33)",
        marginTop: `${topOffset}px`,
      }}
    >
      {/* subtle grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[.10]"
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
        {/* LEFT: copy */}
        <div className="space-y-7">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur"
            aria-label="Trust-first financial guidance"
          >
            <ShieldCheck className="w-4 h-4 text-white/90" aria-hidden="true" />
            <span className="text-sm font-medium tracking-wide">
              Fiduciary-minded guidance
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Build a{" "}
            <span className="align-baseline inline-block bg-gradient-to-r from-[#eef5ff] via-[#d8e2f0] to-[#eef5ff] text-transparent bg-clip-text">
              Stronger Financial Future
            </span>{" "}
            Starting Now.
          </h1>

          <p className="text-lg md:text-2xl leading-relaxed text-[#d8e2f0] max-w-2xl">
            Clear plans. Smart protection. Disciplined growth. We combine education
            and strategy to help you reach—and keep—your goals.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            <button
              onClick={openCalendly}
              className="cursor-pointer text-lg font-semibold py-4 px-7 rounded-xl transition-transform shadow-[0_14px_28px_-14px_rgba(37,99,235,.6)] border border-white/70 bg-gradient-to-br from-[#eef5ff] via-[#d8e2f0] to-[#eef5ff] text-[#0b2741] hover:-translate-y-0.5 inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label="Book a free 60 minute consultation on Calendly"
            >
              <Calendar className="w-5 h-5" aria-hidden="true" />
              Book a Consultation
            </button>

            <Link
  to="/service"
  className="text-lg font-semibold py-4 px-7 rounded-xl border border-white/25 bg-white/10 backdrop-blur hover:bg-white/15 transition inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
  aria-label="Explore our services"
>
  Explore Services
  <ArrowRight className="w-5 h-5" aria-hidden="true" />
</Link>
          </div>

          {/* Benefits */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {benefits.map((t) => (
              <li key={t} className="flex items-center gap-3 text-white/95">
                <CheckCircle2 className="w-5 h-5 text-[#7ec8ff]" aria-hidden="true" />
                <span className="text-base">{t}</span>
              </li>
            ))}
          </ul>

          {/* Contact */}
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 text-white/95">
              <Mail className="w-5 h-5 text-[#7ec8ff]" aria-hidden="true" />
              <a
                href="mailto:Jack@weplanfuture.com"
                className="text-lg underline-offset-2 hover:underline"
              >
                Jack@weplanfuture.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-white/95">
              <Phone className="w-5 h-5 text-[#7ec8ff]" aria-hidden="true" />
              <a href="tel:+17813338353" className="text-lg">
                781-333-8353
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="pt-6 grid grid-cols-3 gap-4 max-w-xl">
            {stats.map((s) => (
              <div
                key={s.k}
                className="rounded-xl bg-white/8 border border-white/15 px-4 py-3 text-center"
                aria-label={`${s.v}: ${s.k}`}
              >
                <div className="text-2xl font-bold">{s.k}</div>
                <div className="text-xs text-white/80">{s.v}</div>
              </div>
            ))}
          </div>

          {/* Light compliance note (optional, edit as needed) */}
          {/* <p className="text-xs text-white/60 max-w-2xl">
            Educational content. Not an offer to buy or sell securities. Decisions should
            consider your unique situation and objectives.
          </p> */}
        </div>

        {/* RIGHT: Image illustration */}
        <div className="relative flex justify-center md:justify-end">
          <figure className="relative w-full max-w-md md:max-w-lg lg:max-w-xl">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 backdrop-blur-sm shadow-[0_24px_60px_-24px_rgba(0,0,0,.65)]">
              <picture>
                <source srcSet={img} type="image/webp" />
                <img
                  src={img}
                  alt="Financial advisors reviewing growth charts and plans at a desk"
                 className="w-full h-[420px] md:h-[420px] lg:h-[565px] object-contain object-center bg-white rounded-2xl"

                  loading="eager"
                  fetchpriority="high"
                />
              </picture>
              {/* soft top gradient for better text contrast if overlapping */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating stat pill */}
            <figcaption className="absolute -bottom-6 left-3 sm:left-0">
              <div className="rounded-2xl bg-white/95 text-[#0b2741] px-4 py-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,.45)] border border-white/80">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#1e63ff]" aria-hidden="true" />
                  <div className="text-sm font-semibold tracking-wide">On-track Projection</div>
                </div>
                <div className="mt-1 text-2xl font-extrabold">+12.4%</div>
                <div className="text-xs text-slate-600">12-mo rolling</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* bottom fade */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-12"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.12), rgba(0,0,0,.2))",
          opacity: 0.28,
        }}
      />
    </section>
  );
};

export default HeroSection;
