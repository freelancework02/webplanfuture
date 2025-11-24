import React, { useEffect, useState, useCallback } from "react";

/**
 * EventsGallery (API-backed)
 *
 * Props:
 *   - apiBase (string) : base URL for API endpoints. Defaults to '/api'
 *
 * Expectations:
 *   - GET {apiBase}/galleries           => list of galleries (each should have `id`, `title`, optional `subtitle`)
 *   - GET {apiBase}/galleries/:id       => returns gallery metadata + images array (each image has `id`, `image_name`, etc.)
 *   - Image blob URL: {apiBase}/galleries/image/:imageId/blob
 *
 * If your API returns a different shape, provide one example response and I will adapt the mapping.
 */

export default function EventsGallery({ apiBase = "https://weplanfuture.com/api" }) {
  const [galleries, setGalleries] = useState([]); // final array: [{ id, title, subtitle, images: [url,...] }, ...]
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // lightbox state
  const [lightbox, setLightbox] = useState({
    open: false,
    images: [],
    index: 0,
    title: "",
  });

  // Helper: build image blob URL from image object or id
  const imageBlobUrl = (image) => {
    const id = typeof image === "number" ? image : image && (image.id || image.imageId || image.image_id);
    if (!id) return null;
    return `${apiBase}/galleries/image/${encodeURIComponent(id)}/blob`;
  };

  // Fetch galleries list, then fetch each gallery's images (in parallel)
  useEffect(() => {
    let mounted = true;
    const fetchAll = async () => {
      setLoading(true);
      setErr("");
      try {
        const listRes = await fetch(`${apiBase}/galleries`);
        if (!listRes.ok) {
          const body = await safeParseResponse(listRes);
          throw new Error((body && (body.error || body.message)) || `Failed to fetch galleries (${listRes.status})`);
        }
        const listJson = await safeParseResponse(listRes);

        // Normalize list items (attempt common shapes)
        const items =
          Array.isArray(listJson)
            ? listJson
            : listJson && Array.isArray(listJson.data)
            ? listJson.data
            : listJson && listJson.galleries
            ? listJson.galleries
            : listJson && listJson.rows
            ? listJson.rows
            : [];

        // For each gallery, fetch its images via GET /galleries/:id
        const galleryPromises = items.map(async (g) => {
          const gid = g.id ?? g.gallery_id ?? g._id ?? g.id;
          if (gid === undefined || gid === null) {
            // fallback: if no id, just map as-is with no images
            return {
              id: g.id ?? Math.random().toString(36).slice(2, 9),
              title: g.title ?? g.name ?? "Untitled",
              subtitle: g.subtitle ?? g.excerpt ?? "",
              images: [],
            };
          }

          // fetch gallery detail
          try {
            const r = await fetch(`${apiBase}/galleries/${encodeURIComponent(gid)}`);
            if (!r.ok) {
              // if gallery detail fails, return basic metadata (no images)
              return {
                id: gid,
                title: g.title ?? g.name ?? `Gallery ${gid}`,
                subtitle: g.subtitle ?? g.excerpt ?? "",
                images: [],
              };
            }
            const json = await safeParseResponse(r);

            // normalize response for gallery detail
            // common shapes:
            // { gallery: {...}, images: [...] }
            // { data: {...}, images: [...] }
            // { id:..., title:..., images: [...] }
            const galleryObj =
              json && json.gallery
                ? json.gallery
                : json && json.data && (json.data.title || json.data.content_html)
                ? json.data
                : json && (json.id || json.title)
                ? json
                : {};

            let imagesArr = [];
            if (Array.isArray(json.images)) imagesArr = json.images;
            else if (Array.isArray(galleryObj.images)) imagesArr = galleryObj.images;
            // normalize images to blob URLs
            const urls = imagesArr
              .map((img) => imageBlobUrl(img))
              .filter(Boolean);

            return {
              id: gid,
              title: galleryObj.title ?? g.title ?? g.name ?? `Gallery ${gid}`,
              subtitle: galleryObj.subtitle ?? g.subtitle ?? g.excerpt ?? g.excerpt ?? "",
              images: urls,
            };
          } catch (e) {
            // on error, return basic metadata with no images
            console.warn("gallery detail fetch failed for id", gid, e);
            return {
              id: gid,
              title: g.title ?? g.name ?? `Gallery ${gid}`,
              subtitle: g.subtitle ?? g.excerpt ?? "",
              images: [],
            };
          }
        });

        const results = await Promise.all(galleryPromises);

        // filter out galleries with no images (to match your original component behavior)
        const filtered = results.filter((g) => Array.isArray(g.images) && g.images.length > 0);

        // sort by id (attempt numeric sort when possible)
        filtered.sort((a, b) => {
          const an = Number(a.id);
          const bn = Number(b.id);
          if (!Number.isNaN(an) && !Number.isNaN(bn)) return an - bn;
          return String(a.id).localeCompare(String(b.id));
        });

        if (mounted) setGalleries(filtered);
      } catch (error) {
        console.error("Error loading galleries:", error);
        if (mounted) setErr(error.message || "Failed to load galleries");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAll();
    return () => {
      mounted = false;
    };
  }, [apiBase]);

  // small helper: safely parse json or text
  async function safeParseResponse(res) {
    try {
      const t = await res.text();
      try {
        return JSON.parse(t);
      } catch {
        return t;
      }
    } catch (e) {
      return null;
    }
  }

  // Lightbox controls
  const openLightbox = useCallback((images, index, title) => {
    if (!Array.isArray(images) || !images.length) return;
    setLightbox({ open: true, images, index, title: title || "Gallery" });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox((s) => ({ ...s, open: false }));
  }, []);

  const prevImage = useCallback(() => {
    setLightbox((s) => (s.images.length ? { ...s, index: (s.index - 1 + s.images.length) % s.images.length } : s));
  }, []);

  const nextImage = useCallback(() => {
    setLightbox((s) => (s.images.length ? { ...s, index: (s.index + 1) % s.images.length } : s));
  }, []);

  // Close on ESC and arrow keys
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
                background: "linear-gradient(145deg, rgba(8,38,69,1), rgba(14,62,110,1))",
                clipPath: "polygon(25% 6%, 75% 6%, 94% 50%, 75% 94%, 25% 94%, 6% 50%)",
              }}
            >
              <ArrowUpRight />
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0b3760]">Gallery</h2>
          </div>
          <p className="mt-3 text-slate-600">Highlights from our sessions, workshops, and community moments.</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-slate-100 animate-pulse">
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
                  background: "linear-gradient(145deg, rgba(8,38,69,1), rgba(14,62,110,1))",
                  clipPath: "polygon(25% 6%, 75% 6%, 94% 50%, 75% 94%, 25% 94%, 6% 50%)",
                }}
              />
              <p className="text-slate-700 font-medium">{err}</p>
            </div>
          </div>
        )}

        {/* Empty */}
        {!loading && !err && (!galleries || galleries.length === 0) && (
          <div className="grid place-items-center py-16">
            <p className="text-slate-700">No events found yet. Check back soon.</p>
          </div>
        )}

        {/* Galleries */}
        {!loading &&
          !err &&
          Array.isArray(galleries) &&
          galleries.map((gallery) => (
            <section
              key={gallery.id}
              className="mb-12 md:mb-16 rounded-2xl border border-slate-200/70 bg-white/85 backdrop-blur shadow-[0_6px_30px_rgba(10,41,77,0.08)]"
            >
              {/* header */}
              <div className="px-5 md:px-7 lg:px-8 py-6 md:py-7 border-b">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-block w-8 h-8"
                    style={{
                      background: "linear-gradient(145deg, rgba(8,38,69,1), rgba(14,62,110,1))",
                      clipPath: "polygon(25% 6%, 75% 6%, 94% 50%, 75% 94%, 25% 94%, 6% 50%)",
                    }}
                  />
                  <h3 className="text-xl md:text-2xl font-bold text-[#0a192f]">{gallery.title || `Gallery ${gallery.id}`}</h3>
                </div>
                {gallery.subtitle && <p className="mt-2 text-slate-600">{gallery.subtitle}</p>}
              </div>

              {/* Image grid */}
              <div className="p-4 md:p-6 lg:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {gallery.images.map((imageUrl, i) => (
                    <button
                      key={i}
                      onClick={() => openLightbox(gallery.images, i, gallery.title)}
                      className="group relative block rounded-2xl overflow-hidden border border-slate-200/70 bg-white transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_60px_rgba(10,41,77,0.18)] focus:outline-none focus:ring-2 focus:ring-offset-2"
                      style={{
                        boxShadow: "0 6px 30px rgba(10,41,77,0.08), inset 0 0 0 1px rgba(226,232,240,0.6)",
                      }}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img src={imageUrl} alt={`Gallery image ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
                      </div>

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b3760]/[.10] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span
                        className="pointer-events-none absolute bottom-3 right-3 rounded-xl px-3 py-1 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition"
                        style={{
                          background: "linear-gradient(135deg, #0b3760, #1a69c7 70%)",
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
          ))}
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4" onClick={closeLightbox}>
          <div className="relative w-full max-w-6xl rounded-2xl overflow-hidden bg-white" onClick={(e) => e.stopPropagation()}>
            {/* header */}
            <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b">
              <h4 className="text-slate-900 font-semibold truncate pr-4">{lightbox.title}</h4>
              <button onClick={closeLightbox} className="rounded-md p-2 hover:bg-slate-100 transition" aria-label="Close">
                <XIcon />
              </button>
            </div>

            {/* image area */}
            <div className="relative bg-black">
              <img src={lightbox.images[lightbox.index]} alt={`Image ${lightbox.index + 1}`} className="mx-auto max-h-[75vh] w-auto object-contain" />

              {/* nav buttons */}
              <button onClick={prevImage} aria-label="Previous" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/90 shadow hover:shadow-lg border border-slate-200 transition">
                <ChevronLeft />
              </button>
              <button onClick={nextImage} aria-label="Next" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/90 shadow hover:shadow-lg border border-slate-200 transition">
                <ChevronRight />
              </button>

              <div
                className="absolute bottom-3 right-4 rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, #0b3760, #1a69c7 70%)",
                  boxShadow: "0 8px 22px rgba(26,105,199,.35)",
                }}
              >
                {lightbox.index + 1} / {lightbox.images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* -------------------- Inline icons -------------------- */
function ArrowUpRight({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="text-white drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function XIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function ChevronLeft({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronRight({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
