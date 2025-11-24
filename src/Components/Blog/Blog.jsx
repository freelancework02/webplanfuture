import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Blog Listing (API-backed) — with description under title
 *
 * API expectations:
 *  - GET {apiBase}/blogs          -> list (controller: listBlogs) returns { page, per, data } or an array
 *  - GET {apiBase}/blogs/:id      -> single blog + images (controller: getBlog) if needed to resolve images
 *  - Image blob URL: {apiBase}/blogs/image/:imageId/blob
 *
 * Keep UI intact; only adds `description` shown under title.
 */

export default function Blog({ apiBase = "https://weplanfuture.com/api" }) {
  const [blogs, setBlogs] = useState([]); // normalized entries: { id, title, summary, description, image, raw }
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const imageBlobUrl = (imageId) =>
    imageId ? `${apiBase}/blogs/image/${encodeURIComponent(imageId)}/blob` : null;

  useEffect(() => {
    let mounted = true;

    async function fetchListAndResolveImages() {
      setLoading(true);
      setErr("");
      try {
        const listResp = await fetch(`${apiBase}/blogs`);
        if (!listResp.ok) {
          const txt = await safeParseResponse(listResp);
          throw new Error((txt && (txt.error || txt.message)) || `Failed to fetch blogs (${listResp.status})`);
        }
        const listJson = await safeParseResponse(listResp);

        // Normalize list items: controller may return { page, per, data }
        const items =
          Array.isArray(listJson)
            ? listJson
            : listJson && Array.isArray(listJson.data)
            ? listJson.data
            : listJson && Array.isArray(listJson.rows)
            ? listJson.rows
            : [];

        // Map metadata; collect ids that need details to fetch first image
        const needDetails = [];
        const mapped = items.map((it) => {
          const id = it.id ?? it.ID ?? it.blog_id ?? it._id;
          const title = it.title ?? it.name ?? "";
          const excerpt = it.excerpt ?? it.summary ?? it.description ?? null;
          const cover_image_id = it.cover_image_id ?? it.coverImageId ?? it.coverImage?.id ?? null;

          // Build description (priority: excerpt -> summary -> raw.excerpt -> stripped content)
          const descriptionCandidate = excerpt ?? null;

          const imageUrl = cover_image_id ? imageBlobUrl(cover_image_id) : null;
          if (!imageUrl) needDetails.push(id);

          return {
            raw: it,
            id,
            title,
            summary: excerpt,
            description: descriptionCandidate, // may be enhanced later from raw.content_html if null
            image: imageUrl,
            cover_image_id,
            is_published: it.is_published ?? it.isPublished,
            created_at: it.created_at ?? it.createdAt,
          };
        });

        // Fetch details for entries that lack image or missing description fallback
        const detailPromises = needDetails.length
          ? Promise.all(
              needDetails.map(async (gid) => {
                if (!gid) return null;
                try {
                  const r = await fetch(`${apiBase}/blogs/${encodeURIComponent(gid)}`);
                  if (!r.ok) return { id: gid, images: [], blog: null };
                  const json = await safeParseResponse(r);
                  const blogObj = json && (json.blog || json.data || json);
                  const images =
                    Array.isArray(json.images) ? json.images : Array.isArray(blogObj.images) ? blogObj.images : [];
                  const firstImage = images.length ? images[0] : null;
                  const imgId = firstImage && (firstImage.id || firstImage.imageId || firstImage.image_id);
                  return { id: gid, firstImageId: imgId, blog: blogObj || null };
                } catch (e) {
                  console.warn("Failed fetching blog detail for", gid, e);
                  return { id: gid, firstImageId: null, blog: null };
                }
              })
            )
          : Promise.resolve([]);

        const details = await detailPromises;

        // Build map from details
        const detailMap = (details || []).reduce((acc, d) => {
          if (!d) return acc;
          acc[d.id] = d;
          return acc;
        }, {});

        // Attach resolved images and fill description fallback from blog.content_html if needed
        const final = mapped.map((m) => {
          let updated = { ...m };
          const det = detailMap[m.id];
          if (!updated.image && det && det.firstImageId) {
            updated.image = imageBlobUrl(det.firstImageId);
            updated.cover_image_id = det.firstImageId;
          }
          // If description is missing, try to pull from detailed blog content (if available)
          if ((!updated.description || updated.description === null || updated.description === "") && det && det.blog) {
            const b = det.blog;
            const candidate =
              b.excerpt ??
              b.summary ??
              b.description ??
              (b.content_html ? truncate(stripHtml(b.content_html), 160) : null) ??
              null;
            updated.description = candidate;
          }
          // As last resort, try raw.content_html from list item
          if ((!updated.description || updated.description === null || updated.description === "") && m.raw && m.raw.content_html) {
            updated.description = truncate(stripHtml(m.raw.content_html), 160);
          }
          return updated;
        });

        // Filter out items without image (preserves behavior from your original)
        const filtered = final.filter((f) => !!f.image);

        // sort by numeric id when possible
        filtered.sort((a, b) => {
          const an = Number(a.id);
          const bn = Number(b.id);
          if (!Number.isNaN(an) && !Number.isNaN(bn)) return an - bn;
          return String(a.id).localeCompare(String(b.id));
        });

        if (mounted) setBlogs(filtered);
      } catch (error) {
        console.error("Error loading blogs:", error);
        if (mounted) setErr(error.message || "Failed to load blogs");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchListAndResolveImages();
    return () => {
      mounted = false;
    };
  }, [apiBase]);

  // safe response parse helper
  async function safeParseResponse(res) {
    try {
      const text = await res.text();
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    } catch (e) {
      return null;
    }
  }

  return (
    <section
      className="relative mt-28 md:mt-32"
      style={{
        background:
          "radial-gradient(1100px 540px at 0% -10%, rgba(20,64,107,.10), transparent), radial-gradient(900px 480px at 110% 0%, rgba(10,41,77,.14), transparent)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-14 md:py-20">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-3">
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
              Our Blog
            </h2>
          </div>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Insights, stories, and financial wisdom from our experts and partners — curated for your growth and security.
          </p>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row gap-6 rounded-2xl bg-slate-100 animate-pulse"
              >
                <div className="md:w-2/5 h-56 bg-slate-200 rounded-l-2xl" />
                <div className="md:w-3/5 p-4 space-y-4">
                  <div className="h-6 bg-slate-200 rounded w-3/5"></div>
                  <div className="h-4 bg-slate-200 rounded w-4/5"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/5"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty / Error */}
        {!loading && !err && blogs.length === 0 && (
          <div className="text-center py-16">
            <div
              className="mx-auto mb-4 w-12 h-12"
              style={{
                background:
                  "linear-gradient(145deg, rgba(8,38,69,1), rgba(14,62,110,1))",
                clipPath:
                  "polygon(25% 6%, 75% 6%, 94% 50%, 75% 94%, 25% 94%, 6% 50%)",
              }}
            />
            <p className="text-slate-700 font-medium">No blogs available yet. Please check back soon.</p>
          </div>
        )}

        {err && (
          <div className="text-center py-8">
            <p className="text-red-600 font-medium">{err}</p>
          </div>
        )}

        {/* Blog Cards */}
        {!loading && blogs.length > 0 && (
          <div className="space-y-12">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="group relative flex flex-col md:flex-row gap-6 rounded-2xl border border-slate-200/70 bg-white/85 backdrop-blur shadow-[0_6px_30px_rgba(10,41,77,0.08)] hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(10,41,77,0.18)] transition-all"
              >
                {/* Image Section */}
                <div className="md:w-2/5 overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="object-cover w-full h-60 md:h-full transition-transform duration-500 group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                </div>

                {/* Content Section */}
                <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#0a2b4e] mb-2 group-hover:text-[#1a69c7] transition-colors">
                    {blog.title}
                  </h3>

                  {/* NEW: description line under title */}
                  {blog.description ? (
                    <p className="text-sm text-slate-600 mb-4">{blog.description}</p>
                  ) : null}

                  <p className="text-slate-600 leading-relaxed mb-5 line-clamp-3">
                    {blog.summary || (blog.raw && (blog.raw.excerpt || blog.raw.content_html ? truncate(stripHtml(blog.raw.content_html || ""), 180) : "")) || "..."}
                  </p>

                  <div>
                    <button
                      onClick={() => navigate(`/blog/${blog.id}`, { state: { blog: blog.raw || blog } })}
                      className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
                      style={{
                        background:
                          "linear-gradient(135deg, #0b3760, #1a69c7 70%)",
                        color: "white",
                        boxShadow: "0 8px 22px rgba(26,105,199,.35)",
                      }}
                    >
                      Read More
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
                    </button>
                  </div>
                </div>

                {/* Hex Accent */}
                <span
                  className="absolute -top-4 -right-4 w-20 h-20 opacity-90 transition-transform duration-500 group-hover:rotate-6"
                  aria-hidden="true"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(8,38,69,1), rgba(14,62,110,1))",
                    clipPath:
                      "polygon(25% 6%, 75% 6%, 94% 50%, 75% 94%, 25% 94%, 6% 50%)",
                    boxShadow: "0 10px 30px rgba(10,41,77,.28)",
                  }}
                />
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------- helpers & icons -------------------- */

function stripHtml(html) {
  if (!html) return "";
  // create a temporary element to strip tags
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || div.innerText || "").trim().replace(/\s+/g, " ");
}

function truncate(str, n = 160) {
  if (!str) return "";
  return str.length > n ? str.slice(0, n).trim() + "…" : str;
}

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
