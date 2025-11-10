import React, { useEffect, useState, useCallback } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

/* ───────────────────────── Firebase ───────────────────────── */
const firebaseConfig = {
  apiKey: "AIzaSyBg2p1nPZQ39AU91CDzRWeYtQjBs5HHf-Y",
  authDomain: "ajazgraphic-da740.firebaseapp.com",
  projectId: "ajazgraphic-da740",
  storageBucket: "ajazgraphic-da740.appspot.com",
  messagingSenderId: "600209988666",
  appId: "1:600209988666:web:d806f6d7dfd10fa394a903",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * EventsGallery
 * - Brand-aligned navy gradient background + hex accent
 * - Polished event sections with subtle motion
 * - Image grid with consistent aspect ratio, hover zoom, and lightbox viewer
 * - Lazy-loaded images, skeletons, error/empty states
 */
export default function EventsGallery() {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // lightbox state
  const [lightbox, setLightbox] = useState({
    open: false,
    images: [],
    index: 0,
    title: "",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "properedgefinance"));
        let events = querySnapshot.docs.map((doc) => ({
          id: Number.isNaN(parseInt(doc.id, 10)) ? doc.id : parseInt(doc.id, 10),
          ...doc.data(),
        }));

        // Sort ASC by numeric id when possible, otherwise by string id
        events.sort((a, b) => {
          const an = typeof a.id === "number";
          const bn = typeof b.id === "number";
          if (an && bn) return a.id - b.id;
          return String(a.id).localeCompare(String(b.id));
        });

        setEventsData(events);
      } catch (error) {
        console.error("Error fetching events: ", error);
        setErr("Couldn’t load the gallery. Please try again in a bit.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Lightbox controls
  const openLightbox = useCallback((images, index, title) => {
    if (!Array.isArray(images) || !images.length) return;
    setLightbox({ open: true, images, index, title: title || "Gallery" });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox((s) => ({ ...s, open: false }));
  }, []);

  const prevImage = useCallback(() => {
    setLightbox((s) => ({
      ...s,
      index: (s.index - 1 + s.images.length) % s.images.length,
    }));
  }, []);

  const nextImage = useCallback(() => {
    setLightbox((s) => ({
      ...s,
      index: (s.index + 1) % s.images.length,
    }));
  }, []);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (!lightbox.open) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox.open, closeLightbox, prevImage, nextImage]);

  return (
    <section
      className="relative mt-28 md:mt-32"
      style={{
        background:
          "radial-gradient(1100px 540px at 0% -10%, rgba(20,64,107,.10), transparent), radial-gradient(900px 480px at 110% 0%, rgba(10,41,77,.14), transparent)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14 md:py-20">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0b3760]">
              Gallery
            </h2>
          </div>
          <p className="mt-3 text-slate-600">
            Highlights from our sessions, workshops, and community moments.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-slate-100 animate-pulse"
              >
                <div className="aspect-[4/3] bg-slate-200" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && err && (
          <div className="grid place-items-center py-16">
            <div className="text-center">
              <div
                className="mx-auto mb-3 w-12 h-12"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(8,38,69,1), rgba(14,62,110,1))",
                  clipPath:
                    "polygon(25% 6%, 75% 6%, 94% 50%, 75% 94%, 25% 94%, 6% 50%)",
                }}
              />
              <p className="text-slate-700 font-medium">{err}</p>
            </div>
          </div>
        )}

        {/* Empty */}
        {!loading && !err && (!eventsData || eventsData.length === 0) && (
          <div className="grid place-items-center py-16">
            <p className="text-slate-700">
              No events found yet. Check back soon.
            </p>
          </div>
        )}

        {/* Events */}
        {!loading &&
          !err &&
          Array.isArray(eventsData) &&
          eventsData.map((event) => {
            const images = Array.isArray(event.images) ? event.images : [];
            if (images.length === 0) return null;

            return (
              <section
                key={event.id}
                className="mb-12 md:mb-16 rounded-2xl border border-slate-200/70 bg-white/85 backdrop-blur shadow-[0_6px_30px_rgba(10,41,77,0.08)]"
              >
                {/* Event header */}
                <div className="px-5 md:px-7 lg:px-8 py-6 md:py-7 border-b">
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-block w-8 h-8"
                      style={{
                        background:
                          "linear-gradient(145deg, rgba(8,38,69,1), rgba(14,62,110,1))",
                        clipPath:
                          "polygon(25% 6%, 75% 6%, 94% 50%, 75% 94%, 25% 94%, 6% 50%)",
                      }}
                    />
                    <h3 className="text-xl md:text-2xl font-bold text-[#0a192f]">
                      {event.title || `Event ${event.id}`}
                    </h3>
                  </div>
                  {event.subtitle && (
                    <p className="mt-2 text-slate-600">{event.subtitle}</p>
                  )}
                </div>

                {/* Image grid */}
                <div className="p-4 md:p-6 lg:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image, imgIndex) => (
                      <button
                        key={imgIndex}
                        onClick={() => openLightbox(images, imgIndex, event.title)}
                        className="group relative block rounded-2xl overflow-hidden border border-slate-200/70 bg-white transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_60px_rgba(10,41,77,0.18)] focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{
                          boxShadow:
                            "0 6px 30px rgba(10,41,77,0.08), inset 0 0 0 1px rgba(226,232,240,0.6)",
                        }}
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={image}
                            alt={`Event image ${imgIndex + 1}`}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                          />
                        </div>

                        {/* Overlay + CTA */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b3760]/[.10] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span
                          className="pointer-events-none absolute bottom-3 right-3 rounded-xl px-3 py-1 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition"
                          style={{
                            background:
                              "linear-gradient(135deg, #0b3760, #1a69c7 70%)",
                            boxShadow: "0 8px 22px rgba(26,105,199,.35)",
                          }}
                        >
                          View
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-6xl rounded-2xl overflow-hidden bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* header */}
            <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b">
              <h4 className="text-slate-900 font-semibold truncate pr-4">
                {lightbox.title}
              </h4>
              <button
                onClick={closeLightbox}
                className="rounded-md p-2 hover:bg-slate-100 transition"
                aria-label="Close"
              >
                <XIcon />
              </button>
            </div>

            {/* image area */}
            <div className="relative bg-black">
              <img
                src={lightbox.images[lightbox.index]}
                alt={`Image ${lightbox.index + 1}`}
                className="mx-auto max-h-[75vh] w-auto object-contain"
              />

              {/* nav buttons */}
              <button
                onClick={prevImage}
                aria-label="Previous"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/90 shadow hover:shadow-lg border border-slate-200 transition"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={nextImage}
                aria-label="Next"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/90 shadow hover:shadow-lg border border-slate-200 transition"
              >
                <ChevronRight />
              </button>

              {/* index badge */}
              <div className="absolute bottom-3 right-4 rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, #0b3760, #1a69c7 70%)",
                  boxShadow: "0 8px 22px rgba(26,105,199,.35)",
                }}>
                {lightbox.index + 1} / {lightbox.images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ────────────────────────── Inline Icons ────────────────────────── */
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
function XIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6l12 12M6 18L18 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function ChevronLeft({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ChevronRight({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
