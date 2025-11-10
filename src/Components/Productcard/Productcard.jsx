import React, { useEffect, useRef } from "react";

/**
 * Product cards styled to match the We Plan Future brand:
 * - Hex/arrow accents, deep navy gradient, soft glass cards
 * - Equal-height cards (flex), smooth hover, crisp typography
 * - Calendly popup loader (auto-loads script if missing)
 */
export default function Productcard() {
  const brand = {
    navy: "#0b3760",
    accent: "#1a69c7",
  };

  // Load Calendly script once; expose an opener that works even if the script
  // isn't ready yet (queues until onload).
  const calendlyReadyRef = useRef(false);
  const openCalendly = () => {
    const openPopup = () =>
      window.Calendly?.initPopupWidget({
        url: "https://calendly.com/pramod-kanchan/30min",
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
      // If an old script exists, wait for Calendly to appear
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
    // Preload Calendly script on mount to avoid delay on click
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

  const services = [
    {
      title: "Fixed & Indexed Annuities",
      description:
        "A contract with an insurer that can guarantee principal and interest while offering potential lifelong income withdrawals.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/product-img4.jpg",
    },
    {
      title: "Indexed Universal Life",
      description:
        "Death benefit protection plus portfolio diversification with the potential for tax-free withdrawals.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/product-img3.jpg",
    },
    {
      title: "Term Life",
      description:
        "Straightforward coverage for the years you need it most—protect temporary responsibilities with confidence.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/product-img2.jpg",
    },
    {
      title: "Traditional IRA / Roth IRA",
      description:
        "Tax-deferred growth with Traditional IRAs or tax-free qualified withdrawals with Roth IRAs—plan a efficient retirement.",
      image:
        "https://wesecurefuture.com/wp-content/uploads/2024/12/2148793763.jpg",
    },
    {
      title: "Whole Life Insurance",
      description:
        "Lifetime coverage with guaranteed benefits and cash value that can grow over time.",
      image: "https://wesecurefuture.com/wp-content/uploads/2024/12/2163.jpg",
    },
    {
      title: "Will & Trust",
      description:
        "Establish your Will & Trust plus four other core estate documents to protect wishes and heirs.",
      image:
        "https://s3.us-east-1.amazonaws.com/cdn.s3.webcontentor.com/OFFICE/VMF01/site_design/images/product-img1.jpg",
    },
  ];

  return (
    <section
      className="relative py-16 md:py-24 mt-24"
      style={{
        background:
          "radial-gradient(1100px 540px at 0% -10%, rgba(20,64,107,.12), transparent), radial-gradient(900px 480px at 110% 0%, rgba(10,41,77,.18), transparent)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* header */}
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
              Products
            </h2>
          </div>
          <p className="mt-3 text-base md:text-lg text-slate-600">
            Solutions built for stability, growth, and peace of mind.
          </p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((s, i) => (
            <article
              key={i}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white/85 backdrop-blur shadow-[0_6px_30px_rgba(10,41,77,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(10,41,77,0.18)]"
            >
              {/* image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
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

              {/* body */}
              <div className="flex flex-1 flex-col p-6 md:p-7 lg:p-8">
                <h3 className="text-xl font-bold tracking-tight text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  {s.description}
                </p>

                {/* mini CTA per card */}
                <div className="mt-6 flex">
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
                    Get details
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

              {/* hover ring */}
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

        {/* global CTA */}
        <div className="text-center mt-12">
          <p className="text-lg font-medium text-slate-800 mb-4">
            Take Action Now
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              openCalendly();
            }}
            className="w-[240px] rounded-full px-5 py-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              background: "linear-gradient(135deg, #0b3760, #1a69c7 70%)",
              color: "white",
              boxShadow: "0 10px 28px rgba(26,105,199,.40)",
            }}
          >
            Book an Appointment
          </button>
        </div>
      </div>
    </section>
  );
}

/* inline brand arrow icon */
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
