import React from "react";
import image from "../../assets/image.jpeg";

/**
 * AboutUs
 * - Premium, conversion-focused layout
 * - Clean white surface with soft shadows and cobalt accents
 * - Responsive two-column, framed founder portrait, subtle background texture
 * - Text content unchanged (styling only)
 */
export default function AboutUs() {
  return (
    <section
      className="relative"
      style={{
        background:
          "linear-gradient(180deg, #f8fafc 0%, #ffffff 40%, #f8fafc 100%)",
      }}
    >
      {/* Decorative subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[.06]"
        style={{
          backgroundImage:
            "radial-gradient(#0b1f36 1px, transparent 1.5px), radial-gradient(#0b1f36 1px, transparent 1.5px)",
          backgroundSize: "26px 26px",
          backgroundPosition: "0 0, 13px 13px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,.35), rgba(0,0,0,.1), transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto mt-16 px-6 py-16 md:py-20 lg:py-24 text-gray-900">
        {/* Section heading */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
            <span className="text-[13px] font-semibold tracking-widest text-blue-700">
              ABOUT US
            </span>
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            ABOUT US
          </h1>
        </div>

        {/* Content card */}
        <div className="rounded-3xl bg-white/90 backdrop-blur shadow-[0_18px_40px_-18px_rgba(15,23,42,.35)] border border-slate-200 p-6 md:p-10">
          <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-10 md:gap-14">
            {/* Text Content (unchanged text) */}
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-2xl font-semibold text-slate-900">Our Mission</h2>

              <p className="text-slate-700 leading-relaxed">
                At We Plan future, we understand that personal finances can be overwhelming and confusing, especially when there's little formal education on the topic. Our mission is to bridge this gap by empowering you with the knowledge and tools you need to take control of your financial future. We recognize that every family is unique, with distinct goals, time horizons, and challenges, and we are here to support you every step of the way.{" "}
              </p>

              <p className="text-slate-700 leading-relaxed">
                We start by educating you on budgeting, saving, investing, and debt management, helping you build a solid financial foundation. Then, we work with you to develop tailored financial strategies that align with your specific goals, whether it's saving for education, planning consistent tax-deferred wealth stream, plan rollover,  planning for retirement, or managing daily expenses.          
              </p>

              <p className="text-slate-700 leading-relaxed">
                Our ongoing support includes financial tools, workshops, and one-on-one consultations, fostering confidence and resilience. Ultimately, we aim to demystify personal finance and help you build a secure and prosperous financial life through education and personalized guidance. We're here for you, every step of the way.          
              </p>

              {/* Subtle divider + badges for visual rhythm (no new copy) */}
              <div className="pt-2">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mb-4" />
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-medium px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-700">
                    Education First
                  </span>
                  <span className="text-xs font-medium px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-700">
                    Personalized Planning
                  </span>
                  <span className="text-xs font-medium px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-700">
                    Ongoing Support
                  </span>
                </div>
              </div>
            </div>

            {/* Founder Section */}
            <div className="md:w-1/2 flex flex-col items-center text-center">
              {/* Framed portrait with gradient ring */}
              <div className="relative mb-5 md:mb-6">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-y-1 left-1/2 -translate-x-1/2 w-[15.5rem] h-[15.5rem] md:w-[19rem] md:h-[19rem] rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 120deg, rgba(37,99,235,.6), rgba(16,185,129,.25), rgba(37,99,235,.6))",
                    filter: "blur(18px)",
                    opacity: 0.55,
                  }}
                />
                <div className="relative w-60 h-60 md:w-72 md:h-72 rounded-full p-[6px] bg-gradient-to-br from-blue-600 to-blue-400 shadow-[0_20px_50px_-22px_rgba(30,64,175,.55)]">
                  <div className="w-full h-full rounded-full overflow-hidden border border-white shadow-lg">
                    <img
                      src={image}
                      alt="Founder Jack Patel"
                      className="w-full h-full object-cover "
                    />
                  </div>
                </div>
              </div>

              <h2 className="text-sm md:text-base font-bold text-blue-700 tracking-widest uppercase">
                Founder
              </h2>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                Jack Patel
              </h3>
              <p className="text-slate-600 text-sm md:text-base">
                (License Number - 21322826)
              </p>

              {/* Accent line */}
              <div className="mt-4 h-[2px] w-32 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
