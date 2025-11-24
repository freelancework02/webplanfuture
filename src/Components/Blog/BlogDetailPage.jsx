import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Contactus/Contactus";

/**
 * BlogDetailPage (API-backed, route param)
 *
 * - Reads id from route param (/:id)
 * - GET {apiBase}/blogs/:id and renders blog data returned by the API
 * - Resolves image via cover_image_id OR first image entry returned in images array
 *
 * Pass apiBase prop to override default host (default = https://weplanfuture.com/api).
 */
export default function BlogDetailPage({ apiBase = "https://weplanfuture.com/api" }) {
  const navigate = useNavigate();
  const { id } = useParams(); // read id from route: /blog/:id
  const [blog, setBlog] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!id) {
      setErr("Missing blog id in route. Use /blog/:id");
      setLoading(false);
      return;
    }

    let mounted = true;
    const fetchBlog = async () => {
      setLoading(true);
      setErr("");
      try {
        const res = await fetch(`${apiBase}/blogs/${encodeURIComponent(id)}`);
        const text = await res.text();
        let json;
        try {
          json = JSON.parse(text);
        } catch {
          json = text;
        }

        if (!res.ok) {
          const msg = (json && (json.error || json.message)) || `Failed to fetch (${res.status})`;
          throw new Error(msg);
        }

        // Normalize response: support { blog, images } or { data, images } or direct object
        const blogObj = (json && (json.blog || json.data)) ? (json.blog || json.data) : json;
        const imgs = Array.isArray(json.images) ? json.images : Array.isArray(blogObj.images) ? blogObj.images : [];

        if (!mounted) return;

        setBlog(blogObj || null);
        setImages(imgs || []);
      } catch (e) {
        console.error("Error fetching blog:", e);
        if (mounted) setErr(e.message || "Failed to load blog");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBlog();
    return () => {
      mounted = false;
    };
  }, [apiBase, id]);

  // build image URL for image id using blob route
  const imageBlobUrl = (imageId) =>
    imageId ? `${apiBase}/blogs/image/${encodeURIComponent(imageId)}/blob` : null;

  // Determine hero image: prefer cover_image_id, otherwise first image from images array (image objects may have id)
  const heroImage = (() => {
    if (!blog && images.length === 0) return null;
    const coverId = blog && (blog.cover_image_id ?? blog.coverImageId ?? null);
    if (coverId) return imageBlobUrl(coverId);
    if (Array.isArray(images) && images.length > 0) {
      const first = images[0];
      const idVal = first && (first.id || first.imageId || first.image_id);
      if (idVal) return imageBlobUrl(idVal);
      if (typeof first === "string" && first.startsWith("http")) return first;
    }
    return null;
  })();

  // sanitize HTML (prefer DOMPurify if available)
  function sanitizeHtml(html) {
    if (!html) return "";
    try {
      if (typeof window !== "undefined" && window.DOMPurify) {
        return window.DOMPurify.sanitize(html);
      }
    } catch (e) {
      // ignore
    }
    // basic fallback: strip script tags and on* attributes
    try {
      let cleaned = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
      cleaned = cleaned.replace(/\son\w+\s*=\s*(['"]).*?\1/gi, "");
      return cleaned;
    } catch (e) {
      return "";
    }
  }

  // small helper to render fallback text if content_html missing
  function contentFallback(b) {
    if (!b) return "";
    return (
      b.excerpt ||
      b.summary ||
      b.description ||
      (b.content_html ? stripHtml(b.content_html).slice(0, 120) + "…" : "")
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 mx-auto mb-4 rounded-full animate-spin border-4 border-t-transparent border-slate-700" />
          <p className="text-slate-700">Loading blog…</p>
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Unable to load blog</h2>
        <p className="text-slate-600 mb-6">{err}</p>
        <div className="flex gap-3">
          <button onClick={() => navigate(-1)} className="px-4 py-2 rounded bg-slate-200 hover:bg-slate-300">
            Go back
          </button>
          <button onClick={() => window.location.reload()} className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-semibold mb-3">Blog not found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 px-6 py-2 rounded-full bg-[#0b3760] text-white hover:bg-[#1a69c7] transition">
          Go Back
        </button>
      </div>
    );
  }

  // choose content_html if available, otherwise fall back to text-like rendering
  const hasHtml = Boolean(blog.content_html || blog.contentHtml || blog.content);
  const htmlToRender = blog.content_html ?? blog.contentHtml ?? blog.content ?? "";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Header */}
      <header className="relative mt-24 md:mt-28 overflow-hidden">
        <div className="absolute inset-0">
          {heroImage ? (
            <>
              <img src={heroImage} alt={blog.title} className="w-full h-[50vh] md:h-[60vh] object-cover brightness-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b3760]/90 via-[#0b3760]/40 to-transparent" />
            </>
          ) : (
            <div className="w-full h-[50vh] md:h-[60vh] bg-gradient-to-r from-slate-100 to-slate-200" />
          )}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-32 flex flex-col items-center text-center text-white">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-lg mb-4">{blog.title}</h1>
          <div className="h-1 w-24 bg-white rounded-full mb-6" />
          <p className="max-w-3xl text-sm md:text-base text-slate-100">{blog.excerpt ?? contentFallback(blog)}</p>

          {/* meta row */}
          <div className="mt-4 text-xs text-slate-200/90">
            <span>{blog.is_published || blog.isPublished ? "Published" : "Draft"}</span>
            {blog.created_at && (
              <>
                <span className="mx-2">•</span>
                <span>
                  {new Date(blog.created_at).toLocaleString(undefined, { day: "2-digit", month: "short", year: "numeric" })}
                </span>
              </>
            )}
            {typeof blog.images_count !== "undefined" && (
              <>
                <span className="mx-2">•</span>
                <span>{blog.images_count} image{blog.images_count !== 1 ? "s" : ""}</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Blog Body */}
      <main className="flex-1 max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-14 md:py-20" style={{ background: "radial-gradient(1100px 540px at 0% -10%, rgba(20,64,107,.08), transparent), radial-gradient(900px 480px at 110% 0%, rgba(10,41,77,.08), transparent)" }}>
        {/* Back button */}
        <div className="flex justify-end mb-8">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2" style={{ background: "linear-gradient(135deg, #0b3760, #1a69c7 70%)", color: "white", boxShadow: "0 8px 22px rgba(26,105,199,.35)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Back to Blogs
          </button>
        </div>

        <article className="prose prose-lg max-w-none text-slate-800 leading-relaxed">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left Side Image */}
            {heroImage && (
              <div className="md:w-2/5 lg:w-1/3 rounded-2xl overflow-hidden shadow-[0_6px_30px_rgba(10,41,77,0.1)]">
                <img src={heroImage} alt={blog.title} className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.04]" />
              </div>
            )}

            {/* Right Side Text */}
            <div className="md:w-3/5 lg:w-2/3 space-y-5 text-gray-700 text-justify">
              {hasHtml ? (
                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(htmlToRender) }} />
              ) : (
                (blog.content || blog.body || "").split("\n").map((line, index) => {
                  const trimmed = line.trim();
                  if (!trimmed) return null;
                  const isList = trimmed.match(/^[-*•]\s/) || trimmed.match(/^\d+\.\s/);
                  return (
                    <p key={index} className={`${isList ? "pl-5 relative before:absolute before:left-0" : ""} ${isList ? "before:content-['•'] before:text-[#f9a14d] before:font-bold before:text-xl" : ""}`} style={{ marginTop: isList ? "0.75rem" : "1rem", lineHeight: "1.7" }}>
                      {line}
                    </p>
                  );
                })
              )}
            </div>
          </div>

          {/* Accent divider */}
          <div className="mt-16 h-px bg-gradient-to-r from-transparent via-[#f9a14d]/70 to-transparent" />

          {/* Footer quote or CTA */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-[#0b3760] mb-3">Ready to explore more insights?</h3>
            <p className="text-slate-600 mb-6">Discover expert-driven perspectives and financial wisdom in our growing blog collection.</p>
            <button onClick={() => navigate("/blog")} className="rounded-full px-6 py-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2" style={{ background: "linear-gradient(135deg, #0b3760, #1a69c7 70%)", color: "white", boxShadow: "0 10px 28px rgba(26,105,199,.40)" }}>
              Browse All Blogs
            </button>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

/* -------------------- small helper -------------------- */
function stripHtml(html) {
  if (!html) return "";
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || div.innerText || "").trim().replace(/\s+/g, " ");
}
