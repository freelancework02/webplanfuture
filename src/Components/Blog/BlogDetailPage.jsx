import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Contactus/Contactus";

/**
 * Blog Detail Page
 * - Elegant, brand-consistent layout with hero image, gradient title bar, and clean typography
 * - Responsive reading layout, smooth back button, and subtle animations
 */
export default function BlogDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state?.blog;

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center text-gray-600">
        <h2 className="text-2xl font-semibold mb-2">Blog not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 rounded-full bg-[#0b3760] text-white hover:bg-[#1a69c7] transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Format text (adds spacing for bullet and numbered lists)
  const formattedContent = blog.content
    .split("\n")
    .map((line, index, arr) => {
      const isBullet = line.trim().match(/^[-*•]\s/);
      const isNumbered = line.trim().match(/^\d+\.\s/);
      if ((isBullet || isNumbered) && index > 0 && arr[index - 1].trim() !== "")
        return `\n${line}`;
      return line;
    })
    .join("\n");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Header */}
      <header className="relative mt-24 md:mt-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[50vh] md:h-[60vh] object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b3760]/90 via-[#0b3760]/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-32 flex flex-col items-center text-center text-white">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-lg mb-4">
            {blog.title}
          </h1>
          <div className="h-1 w-24 bg-white rounded-full mb-6"></div>
          <p className="max-w-3xl text-sm md:text-base text-slate-100">
            {blog.summary ||
              "An in-depth article curated by our experts to help you understand financial insights and smart strategies."}
          </p>
        </div>
      </header>

      {/* Blog Body */}
      <main
        className="flex-1 max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-14 md:py-20"
        style={{
          background:
            "radial-gradient(1100px 540px at 0% -10%, rgba(20,64,107,.08), transparent), radial-gradient(900px 480px at 110% 0%, rgba(10,41,77,.08), transparent)",
        }}
      >
        {/* Back button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              background: "linear-gradient(135deg, #0b3760, #1a69c7 70%)",
              color: "white",
              boxShadow: "0 8px 22px rgba(26,105,199,.35)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Blogs
          </button>
        </div>

        {/* Main Content */}
        <article className="prose prose-lg max-w-none text-slate-800 leading-relaxed">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left Side Image */}
            <div className="md:w-2/5 lg:w-1/3 rounded-2xl overflow-hidden shadow-[0_6px_30px_rgba(10,41,77,0.1)]">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.04]"
              />
            </div>

            {/* Right Side Text */}
            <div className="md:w-3/5 lg:w-2/3 space-y-5 text-gray-700 text-justify">
              {formattedContent.split("\n").map((line, index) => {
                const trimmed = line.trim();
                if (!trimmed) return null;
                const isList = trimmed.match(/^[-*•]\s/) || trimmed.match(/^\d+\.\s/);

                return (
                  <p
                    key={index}
                    className={`${
                      isList ? "pl-5 relative before:absolute before:left-0" : ""
                    } ${
                      isList
                        ? "before:content-['•'] before:text-[#f9a14d] before:font-bold before:text-xl"
                        : ""
                    }`}
                    style={{
                      marginTop: isList ? "0.75rem" : "1rem",
                      lineHeight: "1.7",
                    }}
                  >
                    {line}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Accent divider */}
          <div className="mt-16 h-px bg-gradient-to-r from-transparent via-[#f9a14d]/70 to-transparent"></div>

          {/* Footer quote or CTA */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-[#0b3760] mb-3">
              Ready to explore more insights?
            </h3>
            <p className="text-slate-600 mb-6">
              Discover expert-driven perspectives and financial wisdom in our
              growing blog collection.
            </p>
            <button
              onClick={() => navigate("/blog")}
              className="rounded-full px-6 py-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                background: "linear-gradient(135deg, #0b3760, #1a69c7 70%)",
                color: "white",
                boxShadow: "0 10px 28px rgba(26,105,199,.40)",
              }}
            >
              Browse All Blogs
            </button>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
