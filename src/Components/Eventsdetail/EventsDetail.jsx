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
 * EventsDetail (API-backed)
 *
 * Props:
 *  - apiBase (string) default "https://weplanfuture.com/api"
 *  - perPage (number) how many events to fetch for "previous" list (default 6)
 *
 * Behavior:
 *  - loads /events?per={perPage}&page=1 and picks the latest event (by event_date / created_at)
 *  - if selected event lacks images, does GET /events/:id to fetch images
 *  - previous events shown are the remaining items from the initial list (sorted)
 */

const EventsDetail = ({ apiBase = "https://weplanfuture.com/api", perPage = 6 }) => {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [current, setCurrent] = useState(null); // the selected/latest event object
  const [gallery, setGallery] = useState([]); // array of image urls for current event
  const [previous, setPrevious] = useState([]); // previous events list

  // lightbox state
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const lbRef = useRef(null);

  // fetch list and resolve latest + images
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setErr("");

    (async () => {
      try {
        // Try to fetch a page of events (list endpoint)
        const listUrl = `${apiBase}/events?per=${encodeURIComponent(perPage)}&page=1`;
        const r = await fetch(listUrl, { credentials: "include" });
        if (!r.ok) {
          // fallback: try without query params
          const r2 = await fetch(`${apiBase}/events`, { credentials: "include" });
          if (!r2.ok) throw new Error(`Failed to fetch events (${r.status})`);
          const txt2 = await r2.text();
          var listJson = safeParse(txt2);
        } else {
          const txt = await r.text();
          var listJson = safeParse(txt);
        }

        // Normalize items array from list response
        const items =
          Array.isArray(listJson)
            ? listJson
            : listJson && Array.isArray(listJson.data)
            ? listJson.data
            : listJson && Array.isArray(listJson.rows)
            ? listJson.rows
            : [];

        if (!items || items.length === 0) {
          if (mounted) {
            setPrevious([]);
            setCurrent(null);
            setGallery([]);
            setErr("No events available.");
            setLoading(false);
          }
          return;
        }

        // choose latest event by event_date then created_at
        const sorted = [...items].sort((a, b) => {
          const ta = new Date(a.event_date || a.created_at || a.createdAt || 0).getTime();
          const tb = new Date(b.event_date || b.created_at || b.createdAt || 0).getTime();
          return tb - ta; // newest first
        });

        const latest = sorted[0];
        const prevs = sorted.slice(1);

        // Try to extract images from the list item (some APIs include them; some don't)
        const imagesFromList = extractImageUrlsFromEntry(latest, apiBase, "events");

        // If no images in list, fetch detail for the latest event
        let detailImages = imagesFromList;
        if ((!imagesFromList || imagesFromList.length === 0) && (latest.id || latest.ID || latest.event_id)) {
          const id = latest.id ?? latest.ID ?? latest.event_id;
          try {
            const rr = await fetch(`${apiBase}/events/${encodeURIComponent(id)}`, { credentials: "include" });
            if (rr.ok) {
              const txt = await rr.text();
              const json = safeParse(txt);
              const blogObj = json && (json.event || json.data) ? (json.event || json.data) : json;
              const imgsArr = Array.isArray(json.images) ? json.images : Array.isArray(blogObj.images) ? blogObj.images : [];
              detailImages = resolveImageArray(imgsArr, apiBase, "events");
              // also merge any fields returned in blogObj into latest
              if (blogObj && typeof blogObj === "object") {
                // shallow merge to include fields like description, cover_image_id, images_count, etc
                Object.assign(latest, blogObj);
              }
            }
          } catch (e) {
            console.warn("Failed to fetch event detail for images", e);
          }
        }

        // If still empty and cover_image_id present, build from that
        if ((!detailImages || detailImages.length === 0) && (latest.cover_image_id || latest.coverImageId)) {
          const cid = latest.cover_image_id ?? latest.coverImageId;
          detailImages = [buildBlobUrl(apiBase, "events", cid)];
        }

        if (mounted) {
          setCurrent(latest);
          setGallery(detailImages || []);
          setPrevious(prevs);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
        if (mounted) {
          setErr(e.message || "Failed to load events");
          setLoading(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [apiBase, perPage]);

  // Lightbox helpers
  const openAt = (i) => {
    setIdx(i);
    setOpen(true);
  };
  const next = () => setIdx((p) => (p + 1) % (gallery.length || 1));
  const prev = () => setIdx((p) => (p - 1 + (gallery.length || 1)) % (gallery.length || 1));

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, gallery]);

  const gradient = "linear-gradient(135deg, #0b3760 0%, #1a69c7 70%)";

  const joinMeeting = () => {
    if (!current) return;
    const link = current.link || current.meetingLink || current.recordingLink;
    if (!link) return;
    window.open(link, "_blank", "noopener,noreferrer");
  };

  // UI: loading / error
  if (loading) {
    return (
      <section className="w-full mt-[80px] mb-[40px] grid place-items-center p-8">
        <div className="text-center">
          <div className="h-12 w-12 mx-auto mb-4 rounded-full animate-spin border-4 border-t-transparent border-slate-700" />
          <p className="text-slate-700">Loading events…</p>
        </div>
      </section>
    );
  }

  if (err) {
    return (
      <section className="w-full mt-[80px] mb-[40px] grid place-items-center p-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Couldn’t load events</h3>
          <p className="text-slate-600 mb-4">{err}</p>
        </div>
      </section>
    );
  }

  if (!current) {
    return (
      <section className="w-full mt-[80px] mb-[40px] grid place-items-center p-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">No upcoming events</h3>
          <p className="text-slate-600">We’ll show events here when they’re available.</p>
        </div>
      </section>
    );
  }

  const model = mapEventFields(current);
  const prevList = (Array.isArray(previous) && previous.length > 0) ? previous.map(mapEventFields) : [];

  return (
    <section className="w-full mt-[100px] mb-[40px]">
      {/* Header / Hero Thumbnail */}
      <div className="relative">
        <div className="relative h-[42vw] max-h-[420px] w-full overflow-hidden rounded-none sm:rounded-2xl">
          <img
            src={gallery[0] || model.thumbnailUrl}
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
              <span>{formatDate(model.date)}</span>
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

              {gallery && gallery.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {gallery.map((src, i) => (
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
                      <div>{formatDate(model.date)}</div>
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
      {open && gallery && gallery.length > 0 && (
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
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Previous image"
          >
            <FiChevronLeft className="text-2xl" />
          </button>

          <div className="max-w-[92vw] max-h-[82vh] px-10" onClick={(e) => e.stopPropagation()}>
            <img src={gallery[idx]} alt={`Preview ${idx + 1}`} className="mx-auto h-full w-full object-contain" />
            <div className="mt-3 text-center text-sm text-white/80">{idx + 1} / {gallery.length}</div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
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
  const ctaHref = data.recordingLink || data.meetingLink || data.link;
  const ctaLabel = data.recordingLink ? "Watch Recording" : "Open Link";

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img
          src={data.thumbnailUrl || "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop"}
          alt={data.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {isPast && (
          <span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white shadow" style={{ background: gradient }}>
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
            <button className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition">
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

// Naive sanitizer (keeps common formatting tags and sanitizes links)
function safeHTML(html) {
  try {
    const allowed = ["B","I","STRONG","EM","A","P","BR","UL","OL","LI","H1","H2","H3","H4","H5","H6"];
    const div = document.createElement("div");
    div.innerHTML = html;

    const walker = document.createTreeWalker(div, NodeFilter.SHOW_ELEMENT, null);
    const toRemove = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!allowed.includes(node.nodeName)) {
        // if node is harmless wrapper, promote children, else mark for removal
        if (node.nodeName === "SPAN" || node.nodeName === "DIV") {
          // keep structure but still remove event handlers/attributes below
        } else {
          toRemove.push(node);
        }
      } else if (node.nodeName === "A") {
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "noopener noreferrer");
        const href = node.getAttribute("href") || "";
        if (!/^https?:\/\//i.test(href)) node.setAttribute("href", "#");
      }
      // strip potentially dangerous attributes
      Array.from(node.attributes || []).forEach(attr => {
        const name = attr.name.toLowerCase();
        if (name.startsWith("on") || name === "style" || name === "srcdoc") node.removeAttribute(attr.name);
      });
    }
    toRemove.forEach(n => n.replaceWith(...n.childNodes));
    return div.innerHTML;
  } catch {
    return String(html || "");
  }
}

function safeParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function mapEventFields(e) {
  return {
    id: e.id ?? e.ID ?? e.event_id ?? e._id,
    title: e.title ?? e.name ?? "",
    date: e.event_date ?? e.date ?? e.created_at ?? e.createdAt,
    host: e.hosted_by ?? e.host ?? e.hostedBy ?? e.organizer,
    meetingLink: e.link ?? e.meeting_link ?? e.recordingLink ?? null,
    thumbnailUrl: getThumbnailUrl(e),
    description: e.description ?? e.desc ?? e.summary ?? "",
    images_count: e.images_count ?? e.imagesCount ?? 0,
    // keep raw payload for potential debugging
    raw: e,
  };
}

function getThumbnailUrl(e) {
  // prefer direct image URL fields if present, else return null (caller will use gallery[0])
  if (!e) return null;
  if (typeof e.thumbnailUrl === "string" && e.thumbnailUrl) return e.thumbnailUrl;
  if (typeof e.image === "string" && e.image) return e.image;
  return null;
}

function buildBlobUrl(apiBase, type, imageId) {
  if (!imageId) return null;
  // type is likely "events" in your routes, so /api/events/image/:imageId/blob
  return `${apiBase}/${type}/image/${encodeURIComponent(imageId)}/blob`;
}

function extractImageUrlsFromEntry(entry, apiBase, type) {
  // entry may include images array or cover_image_id or direct URLs
  if (!entry) return [];
  // if images array present
  const imgs = entry.images ?? entry.image_list ?? entry.photos ?? entry.photos_list;
  if (Array.isArray(imgs) && imgs.length > 0) {
    return resolveImageArray(imgs, apiBase, type);
  }
  // if cover id present
  const cid = entry.cover_image_id ?? entry.coverImageId ?? null;
  if (cid) return [buildBlobUrl(apiBase, type, cid)];
  // if direct url field
  if (entry.cover_image_url || entry.image_url || entry.thumbnail) {
    return [entry.cover_image_url || entry.image_url || entry.thumbnail];
  }
  return [];
}

function resolveImageArray(arr, apiBase, type) {
  if (!arr || !Array.isArray(arr)) return [];
  return arr
    .map((it) => {
      if (!it) return null;
      // if item is string url
      if (typeof it === "string") return it;
      // if item is object with id
      const id = it.id ?? it.ID ?? it.imageId ?? it.image_id;
      if (id) return buildBlobUrl(apiBase, type, id);
      // if object has direct url property
      if (it.url || it.image_url || it.path) return it.url || it.image_url || it.path;
      return null;
    })
    .filter(Boolean);
}
