import React, { useEffect, useRef, useState } from "react";
import {
  Handshake,
  Notebook,
  BookOpenText,
  ChartNoAxesCombined,
  X,
} from "lucide-react";
import TestimonialsSection from "../Testimonial/Testimonial";

const cardData = [
  {
    title: "Responsibilities",
    description: [
      "Embrace the system, follow it, and align with your leaders.",
      "Allow your leaders to guide you while you earn and learn simultaneously.",
      "Invite anyone and everyone to a multitude of sessions and workshops.",
      "Schedule follow-up sessions with the leader to enhance learning and development.",
    ],
    Icon: Handshake,
  },
  {
    title: "Educate People On Securing Their Future",
    description: [
      "“An investment in knowledge pays the best interest.” We empower individuals and families to secure future needs, leave a legacy, and enjoy life without compromising their lifestyle.",
    ],
    Icon: Notebook,
  },
  {
    title: "Required Skills",
    description: ["Energetic self-starter", "Coachable", "18+ with valid SSN."],
    Icon: BookOpenText,
  },
  {
    title: "What Will You Gain",
    description: [
      "As a full-service independent financial professional, you’ll craft tailored plans covering:",
      "Retirement planning",
      "Tax savings",
      "401(k) rollover",
      "College savings",
      "Asset protection",
      "Risk management",
      "Estate planning",
      "…and more.",
    ],
    Icon: ChartNoAxesCombined,
  },
];

export default function PartnerProgram() {
  const [selectedCard, setSelectedCard] = useState(null);

  // Calendly script loader
  const calendlyReadyRef = useRef(false);
  const openCalendly = () => {
    const openPopup = () =>
      window.Calendly?.initPopupWidget({
        url: "https://calendly.com/jack-weplanfuture/60min",
      });

    if (calendlyReadyRef.current && window.Calendly) {
      openPopup();
      return;
    }

    let script = document.getElementById("calendly-script");
    if (!script) {
      script = document.createElement("script");
      script.id = "calendly-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        calendlyReadyRef.current = true;
        openPopup();
      };
      document.body.appendChild(script);
    } else {
      const wait = setInterval(() => {
        if (window.Calendly) {
          clearInterval(wait);
          calendlyReadyRef.current = true;
          openPopup();
        }
      }, 50);
      setTimeout(() => clearInterval(wait), 5000);
    }
  };

  useEffect(() => {
    // Preload Calendly
    if (!document.getElementById("calendly-script")) {
      const s = document.createElement("script");
      s.id = "calendly-script";
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      s.onload = () => (calendlyReadyRef.current = true);
      document.body.appendChild(s);
    } else {
      calendlyReadyRef.current = !!window.Calendly;
    }
  }, []);

  // ESC to close modal
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSelectedCard(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const brand = {
    navy: "#0b3760",
    accent: "#1a69c7",
  };

  return (
    <section
      className="relative max-w-7xl mx-auto px-4 mt-20 py-16 sm:px-6 lg:px-8"
      style={{
        background:
          "radial-gradient(1100px 540px at -10% -10%, rgba(20,64,107,.10), transparent), radial-gradient(900px 520px at 110% 0%, rgba(10,41,77,.14), transparent)",
      }}
    >
      {/* Header */}
      <div className="text-center mb-12">
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
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
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
          </span>
          <h2
            className="text-3xl font-extrabold tracking-tight"
            style={{ color: brand.navy }}
          >
            Partner Program
          </h2>
        </div>

        <p className="mt-6 max-w-4xl mx-auto text-justify text-lg text-slate-700">
          Build a meaningful career helping families master personal finance
          while you grow as a professional. Whether you’re new or leveling up,
          we’ll equip you with training, mentorship, and a clear path forward.
        </p>

        <div className="mt-8">
          <button
            onClick={(e) => {
              e.preventDefault();
              openCalendly();
            }}
            className="inline-block rounded-full px-7 py-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              background: "linear-gradient(135deg, #0b3760, #1a69c7 70%)",
              color: "white",
              boxShadow: "0 10px 28px rgba(26,105,199,.40)",
            }}
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card, idx) => (
          <article
            key={idx}
            onClick={() => setSelectedCard(card)}
            className="group relative flex flex-col h-full justify-between rounded-2xl p-7 cursor-pointer overflow-hidden border border-slate-200/70 bg-white/85 backdrop-blur shadow-[0_6px_30px_rgba(10,41,77,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(10,41,77,0.18)]"
          >
            {/* Decorative hex */}
            <span
              className="absolute -top-5 -right-5 w-24 h-24 opacity-90 transition-transform duration-500 group-hover:rotate-6"
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(145deg, rgba(8,38,69,1), rgba(14,62,110,1))",
                clipPath:
                  "polygon(25% 6%, 75% 6%, 94% 50%, 75% 94%, 25% 94%, 6% 50%)",
                boxShadow: "0 10px 30px rgba(10,41,77,.28)",
              }}
            />

            {/* Content */}
            <div className="flex flex-col flex-1">
              {/* Icon */}
              <div className="mb-5">
                <div
                  className="w-14 h-14 rounded-2xl grid place-items-center transition-all duration-300 shadow-md group-hover:shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(8,38,69,1), rgba(14,62,110,1))",
                  }}
                >
                  <card.Icon className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-slate-900">
                {card.title}
              </h3>

              {/* Description preview */}
              <ul className="mt-3 text-sm text-slate-600 leading-relaxed list-disc pl-5 space-y-1 flex-1">
                {card.description.slice(0, 3).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
                {card.description.length > 3 && (
                  <li className="italic text-slate-500">Tap to read more…</li>
                )}
              </ul>
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

      {/* Modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 px-4"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[82vh] overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-xl font-bold text-slate-900">
                {selectedCard.title}
              </h3>
              <button
                aria-label="Close"
                onClick={() => setSelectedCard(null)}
                className="rounded-md p-1.5 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5 text-slate-700" />
              </button>
            </header>

            <div className="px-6 py-5 overflow-y-auto max-h-[70vh]">
              <ul className="text-base text-slate-700 leading-relaxed list-disc pl-6 space-y-2">
                {selectedCard.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <div className="mt-6">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    openCalendly();
                  }}
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #0b3760, #1a69c7 70%)",
                    color: "white",
                    boxShadow: "0 8px 22px rgba(26,105,199,.35)",
                  }}
                >
                  Book a Call
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-16">
        <TestimonialsSection />
      </div>
    </section>
  );
}
