// FoundationalCommitments.fixed.jsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Mail, HelpCircle } from "lucide-react";
import faqimg from "../../assets/faqimg.jpg";

const commitmentsData = [
  {
    title:
      "Is it possible to engage a financial advisor if I don't have a substantial amount of disposable income?",
    content:
      "Yes, everyone can benefit from financial advising. We are here to assist you in making the best financial decisions, regardless of your income level.",
  },
  {
    title: "Can you help make my investments more secure?",
    content:
      "We will work with you to establish the right balance of risk and reward for your investments.",
  },
  {
    title: "Could you please review my portfolio?",
    content:
      "A financial health check is just as important as your annual physical. A review of your financial portfolio is known as a Financial Needs Analysis, and we conduct this analysis for your entire portfolio.",
  },
  {
    title: "What kind of kids' education plans do you offer?",
    content:
      "Kids' education plans start with estimating the future costs of tuition and boarding. We’ll help you evaluate the right product options based on your goals and customize them for your family’s needs.",
  },
  {
    title: "Do you provide assistance with life insurance?",
    content:
      "Life insurance is an essential part of building a strong estate plan and protecting your family’s financial legacy.",
  },
];

const FoundationalCommitments = () => {
  const [openItem, setOpenItem] = useState(null);

  // refs to measure heights for smooth collapse/expand
  const contentRefs = useRef([]);
  useEffect(() => {
    // ensure array length matches data length
    contentRefs.current = contentRefs.current.slice(0, commitmentsData.length);
  }, [commitmentsData.length]);

  const toggleItem = (index) => setOpenItem((prev) => (prev === index ? null : index));

  return (
    <section
      className="py-16 px-6 md:px-10 bg-gradient-to-b from-[#f8fafc] via-white to-[#f1f5f9]"
      id="faq"
    >
      <div className="text-center mb-14">
        <h2 className="text-sm uppercase tracking-[0.2em] font-semibold text-blue-600 mb-3">
          Frequently Asked Questions
        </h2>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
          Everything You Want to Know
        </h1>
        <p className="text-slate-600 mt-3 text-lg max-w-2xl mx-auto">
          Here’s what people usually ask us before getting started.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="w-full">
          {commitmentsData.map((item, index) => {
            const isOpen = openItem === index;
            return (
              <div
                key={index}
                className={`mb-3 rounded-2xl border transition-all shadow-sm overflow-hidden ${
                  isOpen
                    ? "border-blue-400 shadow-[0_8px_24px_-10px_rgba(37,99,235,0.3)] bg-white"
                    : "border-slate-200 bg-white/80 hover:bg-white"
                }`}
              >
                <button
                  id={`faq-btn-${index}`}
                  aria-controls={`faq-panel-${index}`}
                  aria-expanded={isOpen}
                  onClick={() => toggleItem(index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-base md:text-lg font-semibold text-slate-900 pr-4">
                    {item.title}
                  </span>

                  {/* Chevron wrapper: apply rotation on wrapper to ensure consistent icon rendering */}
                  <span
                    className="flex-shrink-0"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "transform 300ms ease",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                    aria-hidden="true"
                  >
                    <ChevronDown className="h-6 w-6 text-blue-600" />
                  </span>
                </button>

                {/* Animated collapse using measured maxHeight for smooth transition */}
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-btn-${index}`}
                  className="px-6 pb-5 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out"
                  ref={(el) => (contentRefs.current[index] = el)}
                  style={{
                    maxHeight: isOpen
                      ? contentRefs.current[index]
                        ? `${contentRefs.current[index].scrollHeight}px`
                        : "500px"
                      : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="text-slate-600 leading-relaxed text-[16px]">
                    {item.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative flex justify-center items-center">
          <div className="relative w-full h-[380px] md:h-[480px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src={faqimg}
              alt="Client consulting financial expert"
              className="w-full h-full object-cover rounded-2xl transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent rounded-2xl" />
            <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md px-5 py-4 rounded-xl shadow-lg border border-slate-200">
              <p className="text-slate-900 font-semibold text-base flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                Trusted by 1,200+ families
              </p>
              <p className="text-sm text-slate-600">Real people. Real results. Real confidence.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-14">
        <div className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 px-6 py-4 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <Mail className="w-5 h-5 text-blue-600" />
          <span className="text-slate-700 text-lg">
            Still have questions? Reach us at{' '}
            <a href="mailto:contact@ProsperEdgeFinance.com" className="text-blue-600 font-semibold hover:underline">
              Jack@weplanfuture.com
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};

export default FoundationalCommitments;
