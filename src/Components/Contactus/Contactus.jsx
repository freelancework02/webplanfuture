import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Mail, Phone, Calendar, ShieldCheck, MapPin } from "lucide-react";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    company: "", // honeypot
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your full name (at least 2 characters).";
    }

    const email = String(formData.email || "").trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    if (!emailOk) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message || formData.message.trim().length < 12) {
      newErrors.message = "Tell us a bit more (at least 12 characters).";
    }

    // Honeypot protection
    if (formData.company && formData.company.trim().length > 0) {
      newErrors.company = "Spam detected.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // These match your EmailJS template fields
    const templateParams = {
      from_name: formData.name,
      email: formData.email,
      message: formData.message,
      time: new Date().toLocaleString(), // optional: fill {{time}}
    };

    emailjs
      .send(
        "service_o49f57q",      // ✅ updated service ID
        "template_9g6np59",     // ✅ updated template ID
        templateParams,
        "_NCXgVXdplNNFVAvR"     // your public key
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
          toast.success("🎉 Thanks! Your message has been sent.");
          setFormData({ name: "", email: "", message: "", company: "" });
          setErrors({});
        },
        (error) => {
          console.error("Email sending failed:", error);
          toast.error("❌ Could not send your message. Please try again.");
        }
      )
      .finally(() => setIsSubmitting(false));
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        // Professional cobalt-to-navy gradient with subtle bloom
        background:
          "radial-gradient(1200px 380px at 15% -10%, rgba(37,99,235,.22), transparent 55%), linear-gradient(135deg, #0f2a4a, #11355e 55%, #0b1f36)",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Top angle + grid texture (decorative) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[.10]"
        style={{
          backgroundImage:
            "radial-gradient(#ffffff 1px, transparent 1.5px), radial-gradient(#ffffff 1px, transparent 1.5px)",
          backgroundSize: "26px 26px",
          backgroundPosition: "0 0, 13px 13px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,.7), rgba(0,0,0,.15), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-16">
        {/* Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur">
            <ShieldCheck size={16} className="text-white/90" />
            <span className="text-sm font-medium tracking-wide text-white/90">
              We reply within 24 hours
            </span>
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Let’s talk about your goals
          </h2>
          <p className="mt-2 text-white/80 max-w-2xl mx-auto">
            Send a message, chat on WhatsApp, or book a quick call—whatever is
            easiest for you.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-[0_18px_40px_-18px_rgba(0,0,0,.45)] border border-white/80 p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 text-center mb-1">
              Contact Us
            </h3>
            <p className="text-center text-slate-600 mb-6">
              We’ll get back to you quickly with clear next steps.
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              noValidate
              aria-describedby="form-errors"
            >
              {/* Honeypot (hidden) */}
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-slate-800 mb-1.5"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Jane Doe"
                  className={`w-full p-3 rounded-lg border outline-none focus:ring-2 ${
                    errors.name
                      ? "border-red-300 focus:ring-red-400"
                      : "border-slate-300 focus:ring-blue-500"
                  }`}
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="text-red-600 text-sm mt-1"
                    role="alert"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-800 mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className={`w-full p-3 rounded-lg border outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-300 focus:ring-red-400"
                      : "border-slate-300 focus:ring-blue-500"
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-red-600 text-sm mt-1"
                    role="alert"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-slate-800 mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="How can we help?"
                  className={`w-full p-3 rounded-lg min-h-[140px] border outline-none focus:ring-2 resize-y ${
                    errors.message
                      ? "border-red-300 focus:ring-red-400"
                      : "border-slate-300 focus:ring-blue-500"
                  }`}
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p
                    id="message-error"
                    className="text-red-600 text-sm mt-1"
                    role="alert"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-gradient-to-br from-[#2563eb] to-[#1e40af] hover:translate-y-[-1px]"
                }`}
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                    Sending…
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

              <p
                id="form-errors"
                className="text-xs text-slate-500 text-center"
                aria-live="polite"
              >
                We respect your privacy. We’ll never share your details.
              </p>
            </form>
          </div>

          {/* Contact Options / Business Info */}
          <div className="space-y-6 text-center md:text-left">
            <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur p-6 text-white">
              <p className="text-lg font-medium mb-3">
                Prefer a quick conversation?
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <a
                  href="mailto:Jack@weplanfuture.com"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3 hover:bg-white/15 transition"
                >
                  <Mail size={18} />
                  Email Us
                </a>
                <a
                  href="tel:1781-333-8353"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3 hover:bg-white/15 transition"
                >
                  <Phone size={18} />
                  Call Us
                </a>
              </div>

              <a
                href="https://api.whatsapp.com/send?phone=1781-333-8353&text=Hello!"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full inline-flex items-center justify-center gap-3 rounded-xl bg-[#25D366] text-white px-4 py-3 hover:brightness-95 transition"
              >
                <FaWhatsapp className="w-5 h-5" />
                Message us on WhatsApp
              </a>

              <button
                onClick={() =>
                  window.Calendly?.initPopupWidget?.({
                    url: "https://calendly.com/jack-weplanfuture/60min",
                  })
                }
                className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#eef5ff] via-[#d8e2f0] to-[#eef5ff] text-[#0b2741] px-4 py-3 font-semibold border border-white/70 hover:translate-y-[-1px] transition"
              >
                <Calendar size={18} />
                Book a Call
              </button>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur p-6 text-white">
              <h4 className="text-xl font-semibold mb-1">
                We Plan future
              </h4>
              <p className="text-white/90">📞 781-333-8353</p>
              <p className="text-white/90">📧 Jack@weplanfuture.com</p>
              <div className="flex items-center gap-2 mt-2 text-white/80">
                <MapPin size={18} />
                <span>Virtual consultations & by-appointment sessions</span>
              </div>
              {/* <div className="mt-4">
                <h5 className="font-semibold text-white">Business Hours</h5>
                <p className="text-white/90">Mon–Fri: 6 PM – 9 PM</p>
                <p className="text-white/90">Sat–Sun: By Appointment (1 PM – 4 PM)</p>
              </div> */}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-14 text-center text-white/80 text-sm border-t border-white/20 pt-6">
          © {new Date().getFullYear()} We plan future. All Rights Reserved.
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
