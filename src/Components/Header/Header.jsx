import { useState } from "react";
import { Mail, Phone } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#001233] text-white">
      <div className="container mx-auto px-4 py-3 flex flex-col lg:flex-row lg:items-center justify-between">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="mr-3">
                <FinancialLogo />
              </div>
              <div>
                <h1 className="text-[#E5B80B] font-bold text-xl md:text-2xl">VM FINANCIAL SOLUTIONS</h1>
                <p className="text-[#E5B80B] text-xs md:text-sm tracking-wider">
                  MINIMIZE RISK <span className="mx-2">|</span> OPTIMIZE <span className="mx-2">|</span> MAXIMIZE GROWTH
                </p>
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-[#E5B80B] focus:outline-none"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-end space-y-1">
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            <a href="tel:312-863-9331" className="text-white hover:text-[#E5B80B]">
              312-863-9331
            </a>
          </div>
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            <a href="mailto:info@vmfinancialsolutions.com" className="text-white hover:text-[#E5B80B]">
              info@vmfinancialsolutions.com
            </a>
          </div>
        </div>

        <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} mt-4 pb-4 border-t border-gray-700`}>
          <div className="flex flex-col space-y-3 mt-3">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              <a href="tel:312-863-9331" className="text-white hover:text-[#E5B80B]">
                312-863-9331
              </a>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              <a href="mailto:info@vmfinancialsolutions.com" className="text-white hover:text-[#E5B80B]">
                info@vmfinancialsolutions.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function FinancialLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 36H4V44H8V36Z" fill="#E5B80B" />
      <path d="M16 28H12V44H16V28Z" fill="#E5B80B" />
      <path d="M24 20H20V44H24V20Z" fill="#E5B80B" />
      <path d="M32 12H28V44H32V12Z" fill="#E5B80B" />
      <path d="M40 4H36V44H40V4Z" fill="#E5B80B" />
      <path d="M44 8L36 16L28 8L20 16L12 8L4 16" stroke="#E5B80B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
