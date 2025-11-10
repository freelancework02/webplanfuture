import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";

/**
 * Testimonials
 * - Brand-aligned hex accent + deep navy gradients
 * - Auto-rotates every 4s, pauses on hover/focus
 * - Click/keyboard arrows to navigate
 * - Cards lift on hover; active card is emphasized
 */
export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const hoverRef = useRef(false);

  const testimonials = [
    {
      id: 1,
      name: "Aaroniko",
      role: "Software Engineer",
      image: "https://wesecurefuture.com/wp-content/uploads/2025/01/img-1.jpg",
      rating: 5,
      testimonial:
        "I never realized how important a will and trust could be until Prosperedge Finance walked me through it. What felt daunting became simple and clear—and now I have peace of mind for my family.",
    },
    {
      id: 2,
      name: "Michaleon",
      role: "Application Developer",
      image: "https://wesecurefuture.com/wp-content/uploads/2025/01/img-2.jpg",
      rating: 5,
      testimonial:
        "Their IUL and Fixed Indexed Annuities guidance gave me both growth and stability. The team is professional, patient, and deeply knowledgeable. I trust them with my long-term goals.",
    },
    {
      id: 3,
      name: "Michawel Aaron",
      role: "Customer",
      image: "https://wesecurefuture.com/wp-content/uploads/2024/12/clientimg.jpg",
      rating: 5,
      testimonial:
        "Prosperedge helped us map smart education funding and retirement moves. The plan is practical, the coaching is empathetic, and we feel genuinely secure about our future.",
    },
  ];

  // auto-advance; pause when user hovers or focuses inside
  useEffect(() => {
    const id = setInterval(() => {
      if (!hoverRef.current) {
        setActiveIndex((i) => (i + 1) % testimonials.length);
      }
    }, 4000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  // keyboard navigation (left/right)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        setActiveIndex((i) => (i + 1) % testimonials.length);
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [testimonials.length]);

  const goTo = (i) => setActiveIndex(i);
  const prev = () =>
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActiveIndex((i) => (i + 1) % testimonials.length);

  return (
    <section
      className="w-full py-16 md:py-24 px-4 md:px-8 lg:px-16"
      style={{
        background:
          "radial-gradient(1100px 540px at 0% -10%, rgba(20,64,107,.10), transparent), radial-gradient(900px 480px at 110% 0%, rgba(10,41,77,.14), transparent)",
      }}
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
         
            <span className="px-4 py-1 rounded-full text-white text-sm font-medium"  style={{
                background:
                  "linear-gradient(145deg, rgba(8,38,69,1), rgba(14,62,110,1))",
               
              }}>
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-center text-[#0b3760] max-w-3xl">
            What Our Customers Say About Us
          </h2>
        </div>

        {/* Cards */}
        <div className="relative max-w-6xl mx-auto">
          {/* Nav buttons */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/90 shadow hover:shadow-lg border border-slate-200 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/90 shadow hover:shadow-lg border border-slate-200 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => {
              const isActive = activeIndex === i;
              return (
                <article
                  key={t.id}
                  onClick={() => goTo(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === "Enter" ? goTo(i) : null)}
                  className={`relative flex flex-col h-full rounded-2xl p-6 md:p-7 lg:p-8 bg-white/90 backdrop-blur border border-slate-200/70 transition-all 
                  ${isActive ? "shadow-[0_18px_60px_rgba(10,41,77,0.18)] -translate-y-1 z-10" : "shadow-[0_6px_30px_rgba(10,41,77,0.08)] opacity-90"}
                  hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(10,41,77,0.18)]`}
                >
                  {/* Decorative hex in corner */}
                  <span
                    className="absolute -top-4 -right-4 w-20 h-20 opacity-90 transition-transform duration-500"
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(8,38,69,1), rgba(14,62,110,1))",
                      clipPath:
                        "polygon(25% 6%, 75% 6%, 94% 50%, 75% 94%, 25% 94%, 6% 50%)",
                      boxShadow: "0 10px 30px rgba(10,41,77,.28)",
                      transform: isActive ? "rotate(6deg)" : "rotate(0deg)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Avatar + name */}
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-white shadow-md">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-20 h-20 object-cover"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-slate-900">
                      {t.name}
                    </h3>
                    <p className="text-slate-600 text-sm">{t.role}</p>
                    <div className={`flex mt-2 transition-all ${isActive ? "opacity-100" : "opacity-70"}`}>
                      {Array.from({ length: t.rating }).map((_, s) => (
                        <Star
                          key={s}
                          className={`w-5 h-5 ${
                            isActive ? "fill-amber-400 text-amber-400" : "fill-amber-300 text-amber-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="relative text-slate-700 text-center leading-relaxed flex-1">
                    <span
                      className="pointer-events-none absolute -left-1 -top-2 text-5xl select-none"
                      style={{ color: "rgba(26,105,199,.15)" }}
                      aria-hidden="true"
                    >
                      “
                    </span>
                    {t.testimonial}
                    <span
                      className="pointer-events-none absolute -right-1 -bottom-6 text-5xl select-none"
                      style={{ color: "rgba(26,105,199,.15)" }}
                      aria-hidden="true"
                    >
                      ”
                    </span>
                  </blockquote>

                  {/* subtle brand ring on hover/active */}
                  <div
                    className={`pointer-events-none absolute inset-0 rounded-2xl ring-1 transition-all ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                    style={{
                      boxShadow: "inset 0 0 0 1px rgba(26,105,199,.45)",
                    }}
                    aria-hidden="true"
                  />
                </article>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                 background:
                  "linear-gradient(145deg, rgba(8,38,69,1), rgba(14,62,110,1))",
               
           
              }}
              className={`mx-1 h-2.5 rounded-full transition-all ${
                activeIndex === i ? "w-6 " : "w-2.5 bg-slate-300"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
