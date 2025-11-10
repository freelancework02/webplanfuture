import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Components/Firebase/firebase";
import { useNavigate } from "react-router-dom";

/**
 * Blog Listing Page
 * - Modern and elegant design with gradient header and responsive cards
 * - Hover lift, gradient accent, and “Read more” call-to-action
 * - Graceful loading skeletons, and empty state messaging
 */
export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogList);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

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
            Insights, stories, and financial wisdom from our experts and
            partners — curated for your growth and security.
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

        {/* Empty State */}
        {!loading && blogs.length === 0 && (
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
            <p className="text-slate-700 font-medium">
              No blogs available yet. Please check back soon.
            </p>
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
                  <h3 className="text-xl md:text-2xl font-bold text-[#0a2b4e] mb-3 group-hover:text-[#1a69c7] transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-5 line-clamp-3">
                    {blog.summary || blog.content?.slice(0, 180) + "..."}
                  </p>
                  <div>
                    <button
                      onClick={() =>
                        navigate(`/blog/${blog.id}`, { state: { blog } })
                      }
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

/* ────────────────────────── Inline Icon ────────────────────────── */
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
