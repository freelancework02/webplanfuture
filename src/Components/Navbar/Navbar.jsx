import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Logo from "../../assets/Logo/weplanfuturenew-removebg-preview.png";
import "./Navbar.css";

/**
 * Responsive, accessible Navbar
 * - Solid on scroll (shadow + blur), translucent at top
 * - Mobile drawer shows ALL nav links (same as desktop)
 * - Body scroll lock when the drawer is open
 * - Closes on backdrop click / ESC / route change
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const closeBtnRef = useRef(null);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
    { name: "Services", path: "/service" },
    { name: "Products", path: "/product" },
    { name: "Partnership", path: "/partnership" },
    { name: "Gallery", path: "/gallery" },
    { name: "Blog", path: "/blog" },
    { name: "Events", path: "/events" },
  ];

  const isActive = (p) => location.pathname === p;

  // Scroll state (adds background & shadow)
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while drawer is open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = isOpen ? "hidden" : original || "";
    return () => (document.body.style.overflow = original || "");
  }, [isOpen]);

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // ESC to close + focus the close button when opening
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    if (isOpen) setTimeout(() => closeBtnRef.current?.focus(), 10);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <header
      className={[
        "navbar-root--light",
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "navbar--scrolled shadow-lg backdrop-blur" : "navbar--top",
      ].join(" ")}
      role="banner"
    >
      <div className="container mx-auto px-3 lg:px-6">
        <div className="flex items-center justify-between gap-4 py-3 md:py-4">
          {/* Logo + wordmark */}
          <Link
            to="/"
            className="flex items-center gap-3 h-[56px] md:h-[64px]"
            aria-label="We Plan Future - Home"
          >
            <img
              src={Logo}
              alt="We Plan Future"
              className={`logo ${isScrolled ? "logo--sm" : "logo--lg"}`}
            />
            {/* <span className="hidden sm:block brand-wordmark--dark text-base md:text-lg">
              We Plan Future
            </span> */}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                aria-current={isActive(item.path) ? "page" : undefined}
                className={[
                  "nav-link--light",
                  "px-3 py-2 rounded-xl relative",
                  isActive(item.path) ? "nav-link--active" : "",
                ].join(" ")}
              >
                <span className="inline-block">{item.name}</span>
                <span className="nav-underline--light" />
              </Link>
            ))}

            {/* Optional CTA */}
            {/* <button
              onClick={() =>
                window.Calendly?.initPopupWidget?.({
                  url: "https://calendly.com/pramod-kanchan/30min",
                })
              }
              className="ml-2 px-4 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-95 transition"
              style={{
                background: "linear-gradient(135deg, #0b3760 0%, #1a69c7 70%)",
                boxShadow: "0 8px 22px rgba(26,105,199,.28)",
              }}
            >
              Book a Call
            </button> */}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpAccent/70"
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="mobile-drawer"
          >
            <AiOutlineMenu className="text-3xl text-slate-800" />
          </button>
        </div>
      </div>

      {/* Backdrop for mobile drawer */}
      <button
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        onClick={() => setIsOpen(false)}
        className={[
          "fixed inset-0 bg-black/40 transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* Mobile Drawer (ALL links visible) */}
      <aside
        id="mobile-drawer"
        className={[
          "fixed top-0 right-0 h-full w-[88%] sm:w-[60%] max-w-[400px]",
          "drawer-surface--light text-slate-900 border-l border-slate-200 shadow-2xl",
          "transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="relative h-full flex flex-col">
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3"
              aria-label="We Plan Future - Home"
            >
              <img src={Logo} alt="We Plan Future" className="h-9 w-auto object-contain" />
              <span className="text-slate-900 font-semibold">We Plan Future</span>
            </Link>
            <button
              ref={closeBtnRef}
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpAccent/70"
              aria-label="Close menu"
            >
              <AiOutlineClose className="text-3xl text-slate-800" />
            </button>
          </div>

          {/* Drawer Content */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="py-1 divide-y divide-slate-100">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive(item.path) ? "page" : undefined}
                    className={[
                      "flex items-center justify-between",
                      "px-5 py-4 text-base sm:text-[17px]",
                      "nav-link--light mobile",
                      isActive(item.path) ? "nav-link--active" : "",
                    ].join(" ")}
                  >
                    <span>{item.name}</span>
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{
                        background: isActive(item.path)
                          ? "linear-gradient(135deg, #0b3760, #1a69c7)"
                          : "transparent",
                      }}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Quick access row (optional) */}
            <div className="px-5 pt-3 pb-5">
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/service"
                  onClick={() => setIsOpen(false)}
                  className="text-center rounded-xl px-3 py-3 text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition"
                >
                  Services
                </Link>
                <Link
                  to="/product"
                  onClick={() => setIsOpen(false)}
                  className="text-center rounded-xl px-3 py-3 text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition"
                >
                  Products
                </Link>
              </div>
            </div>
          </nav>

          {/* Drawer Footer */}
          <div
            className="px-5 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))] border-t"
            style={{ background: "linear-gradient(180deg, #ffffff, #f8fafc)" }}
          >
            <button
              onClick={() =>
                window.Calendly?.initPopupWidget?.({
                  url: "https://calendly.com/pramod-kanchan/30min",
                })
              }
              className="w-full px-4 py-3 rounded-xl text-sm font-semibold text-white transition"
              style={{
                background: "linear-gradient(135deg, #0b3760 0%, #1a69c7 70%)",
                boxShadow: "0 8px 22px rgba(26,105,199,.28)",
              }}
            >
              Book a 30-min Call
            </button>
          </div>
        </div>
      </aside>
    </header>
  );
};

export default Navbar;
