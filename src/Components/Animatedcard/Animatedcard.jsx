import React from "react";
import {
  Presentation,
  FileText,
  ShieldCheck,
  Briefcase,
  Calculator,
  CheckCircle,
  TrendingUp,
  Users,
} from "lucide-react";

/**
 * Updated Home Section (Modern + Responsive + Professional)
 * - Clean typography, balanced spacing, subtle glass-like cards
 * - Animated hover effects, brand-consistent blue palette
 * - Icons upgraded, alignment refined for all breakpoints
 */
export default function Home() {
  const colors = {
    primary: "#0b3760",
    accent: "#1a69c7",
    secondary: "#0ea5a4",
    text: "#0f172a",
    subtext: "#475569",
    border: "#e2e8f0",
    bg: "#f8fafc",
  };

  const cards = [
    {
      title: "We Help You Plan For Future Needs",
      description:
        "Enjoy today while preparing for tomorrow. Gain a clear picture of your current finances and a strategy that supports a secure retirement.",
      Icon: Presentation,
    },
    {
      title: "Educate People On Securing Their Future",
      description:
        "We simplify complex financial concepts—so you can make confident choices on wealth management, risk protection, and legacy planning.",
      Icon: FileText,
    },
    {
      title: "Protect Your Assets & Loved Ones",
      description:
        "Reduce exposure to probate, litigation, and taxation with customized strategies that preserve what you’ve built for future generations.",
      Icon: ShieldCheck,
    },
    {
      title: "Build & Diversify Your Income",
      description:
        "Explore business opportunities and smart side ventures. We help you build reliable income streams that align with your life goals.",
      Icon: Briefcase,
    },
  ];

  return (
    <main
      className="min-h-screen flex flex-col justify-center py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      style={{
        background: `linear-gradient(180deg, ${colors.bg} 0%, #ffffff 40%)`,
        color: colors.text,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-5 py-2 mb-5 rounded-full text-sm font-medium border border-slate-200 bg-white shadow-sm">
            <CheckCircle className="w-4 h-4 text-[#1a69c7] mr-2" />
            What We Do
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-snug tracking-tight text-[#0b3760] mb-4">
            Empowering You With <span className="text-[#1a69c7]">Clarity, Confidence,</span>
            <br className="hidden sm:block" /> and a Clear Financial Path Forward.
          </h1>

          <p className="max-w-3xl mx-auto text-slate-600 text-base md:text-lg">
            From wealth creation to retirement planning — we simplify your journey toward financial security and freedom.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <article
              key={i}
              className="relative flex flex-col rounded-2xl p-8 bg-white/90 backdrop-blur border border-slate-200/70 shadow-[0_6px_30px_rgba(10,41,77,0.08)] hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(10,41,77,0.18)] transition-all"
            >
              {/* Icon */}
              <div className="w-16 h-16 mb-5 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#0b3760] to-[#1a69c7] shadow-md">
                <card.Icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-[#0b3760] leading-snug">
                {card.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {card.description}
              </p>

              {/* Hover Accent Line */}
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[3px] transition-all duration-500 bg-gradient-to-r from-[#1a69c7] to-[#0ea5a4]" />
            </article>
          ))}
        </div>

        {/* Feature Strip Section */}
        <section
          className="mt-20 md:mt-28 rounded-2xl px-6 md:px-10 py-10 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-[0_6px_30px_rgba(10,41,77,0.08)] bg-white/90 backdrop-blur border border-slate-200/70"
          style={{
            background:
              "radial-gradient(800px 400px at 10% -10%, rgba(20,64,107,.08), transparent), radial-gradient(900px 420px at 110% 0%, rgba(10,41,77,.1), transparent)",
          }}
        >
          <div className="flex items-start md:items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-[#0b3760] to-[#1a69c7] shadow-md">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#0b3760] mb-2">
                Let’s Analyze Your Financial Game Plan
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Get a personalized review of your current strategy — with insights that could save you years of uncertainty.
              </p>
            </div>
          </div>

          <a
            href="#book"
            onClick={(e) => {
              e.preventDefault();
              window.Calendly?.initPopupWidget?.({
                url: "https://calendly.com/jack-weplanfuture/60min",
              });
            }}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-transform text-white bg-gradient-to-br from-[#0b3760] to-[#1a69c7]"
          >
            <Calculator className="w-5 h-5 mr-2 text-white" />
            Book a 60-min Consultation
          </a>
        </section>

        {/* Mini Feature Row */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            {
              title: "Trusted Advisors",
              desc: "Experienced professionals dedicated to your long-term success.",
              icon: <Users className="w-8 h-8 text-[#1a69c7] mx-auto mb-3" />,
            },
            {
              title: "Tailored Solutions",
              desc: "We align every plan with your unique goals and challenges.",
              icon: <CheckCircle className="w-8 h-8 text-[#0ea5a4] mx-auto mb-3" />,
            },
            {
              title: "Data-Driven Approach",
              desc: "Actionable insights backed by real financial modeling.",
              icon: <Presentation className="w-8 h-8 text-[#0b3760] mx-auto mb-3" />,
            },
            {
              title: "Transparent Guidance",
              desc: "Clarity, honesty, and communication you can always trust.",
              icon: <FileText className="w-8 h-8 text-[#1a69c7] mx-auto mb-3" />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-white/80 backdrop-blur border border-slate-200/70 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              {item.icon}
              <h3 className="font-bold text-[#0b3760] mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
