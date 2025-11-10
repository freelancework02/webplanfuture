import React from "react";
import logo1 from "../../assets/partnerlogo/logo1.png";
import logo2 from "../../assets/partnerlogo/logo2.png";
import logo3 from "../../assets/partnerlogo/logo3.png";
import logo4 from "../../assets/partnerlogo/logo4.png";
import logo5 from "../../assets/partnerlogo/logo5.png";
import logo6 from "../../assets/partnerlogo/logo6.png";
import logo7 from "../../assets/partnerlogo/logo7.png";
import logo8 from "../../assets/partnerlogo/logo8.png";
import logo9 from "../../assets/partnerlogo/logo9.png";
import logo10 from "../../assets/partnerlogo/logo10.png";
import logo11 from "../../assets/partnerlogo/logo11.png";
import logo12 from "../../assets/partnerlogo/logo12.png";
import logo13 from "../../assets/partnerlogo/logo13.png";
import logo14 from "../../assets/partnerlogo/logo14.png";
import logo15 from "../../assets/partnerlogo/logo15.png";
import logo16 from "../../assets/partnerlogo/logo16.png";
import logo17 from "../../assets/partnerlogo/logo17.png";
import logo18 from "../../assets/partnerlogo/logo18.png";
import logo19 from "../../assets/partnerlogo/logo19.png";
import logo20 from "../../assets/partnerlogo/logo20.png";
import logo21 from "../../assets/partnerlogo/logo21.png";
import logo22 from "../../assets/partnerlogo/logo22.png";
import logo23 from "../../assets/partnerlogo/logo23.png";
import logo24 from "../../assets/partnerlogo/logo24.png";
import logo25 from "../../assets/partnerlogo/logo25.png";
import logo26 from "../../assets/partnerlogo/logo26.png";
import logo201 from "../../assets/partnerlogo/logo201.png";

const clients = [
  { id: 1, src: logo1, alt: "Prosperity Life Group" },
  { id: 2, src: logo2, alt: "Corebridge Financial" },
  { id: 3, src: logo3, alt: "Athene" },
  { id: 4, src: logo4, alt: "Americo" },
  { id: 5, src: logo5, alt: "Mutual of Omaha" },
  { id: 6, src: logo6, alt: "Fidelity & Guaranty Life" },
  { id: 7, src: logo7, alt: "Annexus" },
  { id: 8, src: logo8, alt: "Nationwide" },
  { id: 9, src: logo9, alt: "North American" },
  { id: 10, src: logo10, alt: "American Amicable" },
  { id: 11, src: logo11, alt: "American Equity Investment" },
  { id: 12, src: logo12, alt: "Netlaw" },
  { id: 13, src: logo13, alt: "ExamFX" },
  { id: 14, src: logo14, alt: "HGI Direct" },
  { id: 15, src: logo15, alt: "Allianz" },
  { id: 16, src: logo16, alt: "F&G Annuities & Life" },
  { id: 17, src: logo17, alt: "Neishloss & Fleming" },
  { id: 18, src: logo18, alt: "Hegemon Group International" },
  { id: 19, src: logo19, alt: "WFS - Wealth Format System" },
  { id: 20, src: logo20, alt: "Agent Pipeline" },
  { id: 21, src: logo21, alt: "Lead Center" },
  { id: 23, src: logo23, alt: "Lincoln Financial Group" },
  { id: 24, src: logo24, alt: "Lincoln Financial Group" },
  { id: 25, src: logo25, alt: "Lincoln Financial Group" },
  { id: 26, src: logo26, alt: "Lincoln Financial Group" },
];

export default function OurClients() {
  return (
    <section className="py-12 bg-white">
      <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-800 mb-10">
        Elite Product Providers and Affiliated Companies
      </h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center">
          {clients.map((client) => (
            <div key={client.id} className="flex items-center justify-center w-30 h-30 md:w-32 md:h-32">
              <img
                src={client.src}
                alt={client.alt}
                className="w-full h-auto "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}