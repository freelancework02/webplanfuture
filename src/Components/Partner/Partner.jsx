import React from "react";

export default function PartnerProgram() {
  return (
    <section className="container mx-auto px-4 py-16 space-y-12">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a365d]">PARTNER PROGRAM</h1>
        <p className="text-gray-600 leading-relaxed">
          Experience a rewarding career with us, where you help people understand the basics of their personal finances
          while building your own career in the finance domain. Whether you are new to the industry or looking to
          enhance your professional skills, we can provide you with the training and support you need to take your
          skills to the next level. As an associate, you will help individuals accumulate wealth and protect their
          hard-earned assets. Take a moment to drop us a line.
        </p>
        <button className="bg-[#e5e7e3] text-gray-700 hover:bg-[#d8dad6] hover:text-gray-800 font-semibold py-2 px-6 rounded-md shadow-md transition">
          LEARN MORE
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Responsibilities Card */}
        <div className="bg-[#f5f5f3] rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-center mb-4">Responsibilities</h2>
          <ul className="space-y-2 text-gray-600">
            <li>Embrace the system, follow it, and align with your leaders</li>
            <li>Allow your leaders to guide you while you earn and learn simultaneously</li>
            <li>Invite anyone and everyone to a multitude of sessions and workshops</li>
            <li>Schedule follow-up sessions with the leader to enhance learning and development</li>
          </ul>
        </div>

        {/* Required Skills Card */}
        <div className="bg-[#f5f5f3] rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-center mb-4">Required Skills</h2>
          <ul className="space-y-2 text-gray-600">
            <li>18+ with valid SSN</li>
            <li>Energetic self-starter</li>
            <li>Coachable</li>
          </ul>
        </div>

        {/* What You Will Gain Card */}
        <div className="bg-[#f5f5f3] rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-center mb-4">What will you gain</h2>
          <p className="text-gray-600 mb-4">
            As a full-service independent financial service professional, you will create customized plans to meet
            client needs in the following areas:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>Retirement planning</li>
            <li>Tax savings</li>
            <li>401K Rollover</li>
            <li>College Savings</li>
            <li>Asset protection</li>
            <li>Risk management</li>
            <li>Estate planning</li>
            <li>And much more</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
