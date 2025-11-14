// EventsDetail.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FiCalendar,
  FiUser,
  FiExternalLink,
  FiVideo,
  FiImage,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

/**
 * Props (all optional; demo data is shown if omitted)
 * {
 *   event: {
 *     title, date, description, host, meetingLink,
 *     thumbnailUrl, gallery: string[]
 *   },
 *   previousEvents: Array<{
 *     id?: string|number,
 *     title: string,
 *     date: string|Date,
 *     host?: string,
 *     thumbnailUrl?: string,
 *     meetingLink?: string,         // (recording/replay link is fine here too)
 *     recordingLink?: string,       // optional, if you separate from meetingLink
 *     onClick?: () => void          // optional card click handler
 *   }>
 * }
 */

const EventsDetail = ({ event = {}, previousEvents = [] }) => {
  // ---- Demo fallbacks ----
  const demoCurrent = useMemo(
    () => ({
      title: "Design Systems & DX: A Practical Deep Dive",
      date: "2025-11-18T17:30:00+05:30",
      description:
        "A hands-on session covering design tokens, accessibility, and performance budgets. Bring your questions and screens!",
      host: "We Plan Future — Jack Patel.",
      meetingLink: "https://meet.example.com/weplanfuture-demo",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1400&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1529336953121-a9d1b95a0df1?q=80&w=1400&auto=format&fit=crop",
      ],
    }),
    []
  );

  const demoPrevious = useMemo(
    () => [
      {
        id: 101,
        title: "Frontend Roadmap & Services Showcase",
        date: "2025-10-22T18:00:00+05:30",
        host: "We Plan Future",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1200&auto=format&fit=crop",
        recordingLink: "https://example.com/recording/frontend-roadmap",
      },
      {
        id: 102,
        title: "React Accessibility: Patterns That Scale",
        date: "2025-09-10T17:00:00+05:30",
        host: "WPF Community",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
        recordingLink: "https://example.com/recording/react-a11y",
      },
      {
        id: 103,
        title: "Tailwind + Design Tokens in Production",
        date: "2025-08-05T19:00:00+05:30",
        host: "We Plan Future — Tech",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
        recordingLink: "https://example.com/recording/tokens-prod",
      },
      {
        id: 104,
        title: "Performance Budgets: Tooling & Culture",
        date: "2025-07-12T17:30:00+05:30",
        host: "WPF Labs",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=1200&auto=format&fit=crop",
        recordingLink: "https://example.com/recording/perf-budgets",
      },
    ],
    []
  );

  const model = { ...demoCurrent, ...event };
  const prevList = (Array.isArray(previousEvents) && previousEvents.length > 0)
    ? previousEvents
    : demoPrevious;

  // ---- Date formatting ----
  const displayDate = useMemo(() => formatDate(model.date), [model.date]);

  // ---- Lightbox state ----
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const images = model.gallery || [];
  const hasGallery = images && images.length > 0;
  const lbRef = useRef(null);

  const openAt = (i) => {
    setIdx(i);
    setOpen(true);
  };
  const next = () => setIdx((p) => (p + 1) % images.length);
  const prev = () => setIdx((p) => (p - 1 + images.length) % images.length);

  // ESC to close, arrows to navigate
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight" && hasGallery) next();
      if (e.key === "ArrowLeft" && hasGallery) prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hasGallery]);

  const gradient = "linear-gradient(135deg, #0b3760 0%, #1a69c7 70%)";

  const joinMeeting = () => {
    if (!model.meetingLink) return;
    window.open(model.meetingLink, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="w-full mt-[100px] mb-[40px]">
      {/* Header / Hero Thumbnail */}
      <div className="relative">
        <div className="relative h-[42vw] max-h-[420px] w-full overflow-hidden rounded-none sm:rounded-2xl">
          <img
            src={model.thumbnailUrl}
            alt={model.title || "Event"}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 md:left-8 md:right-8">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ background: "rgba(0,0,0,.28)", border: "1px solid rgba(255,255,255,.2)" }}
            >
              <FiCalendar className="text-sm" />
              <span>{displayDate}</span>
            </div>

            <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow">
              {model.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="mx-auto mt-6 max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: details */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200/70 bg-white shadow-sm">
              <div className="p-5 sm:p-7">
                {/* Host + Link */}
                <div className="flex flex-wrap items-center gap-3">
                  {model.host && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
                      <FiUser />
                      {model.host}
                    </span>
                  )}
                  {model.meetingLink && (
                    <a
                      href={model.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold text-white hover:opacity-95 transition"
                      style={{
                        background: gradient,
                        boxShadow: "0 8px 22px rgba(26,105,199,.28)",
                      }}
                    >
                      <FiVideo />
                    RSVP Here
                      <FiExternalLink />
                    </a>
                  )}
                </div>

                {/* Description */}
                <div className="mt-5 leading-relaxed text-slate-700">
                  {looksLikeHtml(model.description) ? (
                    <div
                      className="prose max-w-none prose-p:my-2 prose-headings:mt-4 prose-a:underline"
                      dangerouslySetInnerHTML={{ __html: safeHTML(model.description) }}
                    />
                  ) : (
                    <p className="text-[15px] sm:text-base">{model.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="h-8 w-8 rounded-xl flex items-center justify-center text-white"
                  style={{ background: gradient, boxShadow: "0 8px 22px rgba(26,105,199,.28)" }}
                >
                  <FiImage />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">Event Gallery</h2>
              </div>

              {hasGallery ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => openAt(i)}
                      className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                      aria-label={`Open image ${i + 1}`}
                    >
                      <img
                        src={src}
                        alt={`Event photo ${i + 1}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="pointer-events-none absolute inset-0 ring-0 ring-offset-0 group-hover:ring-2 group-hover:ring-white/70" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
                  Gallery will appear here after the event.
                </div>
              )}
            </div>
          </div>

          {/* Right: sticky meta/CTA */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-slate-900 font-semibold mb-3">Event Details</h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-slate-500"><FiCalendar /></span>
                    <div>
                      <div className="font-medium text-slate-900">Date & Time</div>
                      <div>{displayDate}</div>
                    </div>
                  </li>
                  {model.host && (
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 text-slate-500"><FiUser /></span>
                      <div>
                        <div className="font-medium text-slate-900">Hosted By</div>
                        <div>{model.host}</div>
                      </div>
                    </li>
                  )}
                </ul>

                {model.meetingLink && (
                  <button
                    onClick={joinMeeting}
                    className="mt-5 w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition"
                    style={{
                      background: gradient,
                      boxShadow: "0 8px 22px rgba(26,105,199,.28)",
                    }}
                  >
                  RSVP Here
                  </button>
                )}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h4 className="text-slate-900 font-semibold mb-3">Quick Tips</h4>
                <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                  <li>Add to your calendar to avoid missing it.</li>
                  <li>Join 3–5 minutes early to test audio/video.</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* --- Previous Events --- */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Previous Events</h2>
          </div>

          {prevList.length ? (
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {prevList.map((e) => (
                <PreviousEventCard key={e.id || e.title} data={e} gradient={gradient} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
              No previous events yet. They’ll appear here when available.
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {open && hasGallery && (
        <div
          ref={lbRef}
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <FiX className="text-xl" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Previous image"
          >
            <FiChevronLeft className="text-2xl" />
          </button>

          <div className="max-w-[92vw] max-h-[82vh] px-10" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[idx]}
              alt={`Preview ${idx + 1}`}
              className="mx-auto h-full w-full object-contain"
            />
            <div className="mt-3 text-center text-sm text-white/80">
              {idx + 1} / {images.length}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Next image"
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      )}
    </section>
  );
};

export default EventsDetail;

/* ---------------------- Subcomponents ---------------------- */

function PreviousEventCard({ data, gradient }) {
  const dateStr = formatDate(data.date);
  const isPast = isPastDate(data.date);
  const ctaHref = data.recordingLink || data.meetingLink;
  const ctaLabel = data.recordingLink ? "Watch Recording" : "Open Link";

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img
          src={
            data.thumbnailUrl ||
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop"
          }
          alt={data.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {isPast && (
          <span
            className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white shadow"
            style={{ background: gradient }}
          >
            Past
          </span>
        )}
      </div>

      <div className="p-5 cursor-pointer ">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <FiCalendar />
          <span>{dateStr}</span>
          {data.host && (
            <>
              <span className="mx-1">•</span>
              <span className="inline-flex items-center gap-1">
                <FiUser /> {data.host}
              </span>
            </>
          )}
        </div>

        <h3 className="mt-2 text-base sm:text-lg font-semibold text-slate-900 line-clamp-2">
          {data.title}
        </h3>

        <div className="mt-4 flex items-center gap-2">
          {ctaHref ? (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white hover:opacity-95 transition"
              style={{ background: gradient, boxShadow: "0 8px 22px rgba(26,105,199,.28)" }}
            >
              <FiExternalLink />
              {ctaLabel}
            </a>
          ) : (
            <button
              onClick={data.onClick}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition"
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------- helpers ---------------------- */

function formatDate(input) {
  try {
    const dt = new Date(input);
    if (Number.isNaN(dt.getTime())) return String(input || "");
    return dt.toLocaleString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return String(input || "");
  }
}

function isPastDate(input) {
  try {
    const dt = new Date(input);
    if (Number.isNaN(dt.getTime())) return false;
    return dt.getTime() < Date.now();
  } catch {
    return false;
  }
}

function looksLikeHtml(s) {
  if (!s || typeof s !== "string") return false;
  return /<\/?[a-z][\s\S]*>/i.test(s);
}

// naive sanitizer for simple tags (keeps b, i, strong, em, a, p, br, ul, ol, li)
function safeHTML(html) {
  try {
    const allowed = ["B", "I", "STRONG", "EM", "A", "P", "BR", "UL", "OL", "LI"];
    const div = document.createElement("div");
    div.innerHTML = html;

    const walker = document.createTreeWalker(div, NodeFilter.SHOW_ELEMENT, null);
    const toRemove = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!allowed.includes(node.nodeName)) {
        toRemove.push(node);
      } else if (node.nodeName === "A") {
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "noopener noreferrer");
        const href = node.getAttribute("href") || "";
        if (!/^https?:\/\//i.test(href)) node.setAttribute("href", "#");
      }
    }
    toRemove.forEach((n) => n.replaceWith(...n.childNodes));
    return div.innerHTML;
  } catch {
    return String(html || "");
  }
}
