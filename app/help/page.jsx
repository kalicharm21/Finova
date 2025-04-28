"use client";
import { FaQuestionCircle, FaEnvelope, FaBug, FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";

const helpSections = [
  {
    icon: <FaQuestionCircle className="text-indigo-600 text-2xl" />,
    title: "FAQs",
    description: "Browse through common questions and quick answers.",
    link: "/faq",
  },
  {
    icon: <FaEnvelope className="text-green-600 text-2xl" />,
    title: "Contact Support",
    description: "Need help? Reach out to our team for assistance.",
    link: "/contact",
  },
  {
    icon: <FaBug className="text-red-500 text-2xl" />,
    title: "Report a Bug",
    description: "Found something wrong? Let us know and we’ll fix it.",
    link: "/report-bug",
  },
  {
    icon: <FaLock className="text-yellow-500 text-2xl" />,
    title: "Privacy & Security",
    description: "Learn how we protect your data and keep it secure.",
    link: "/privacy",
  },
];

export default function HelpCenterPage() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] to-[#dbeafe] py-20 px-4 font-sans mt-10">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>

      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 drop-shadow-sm">
          Help Center
        </h1>
        <p className="text-gray-600 text-lg">
          We're here to help you navigate and get the most out of your experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {helpSections.map((section, index) => (
          <a
            href={section.link}
            key={index}
            className={`bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:scale-[1.02] flex gap-5 items-start cursor-pointer ${
              isMounted ? "fade-in" : ""
            }`}
          >
            <div className="mt-1">{section.icon}</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {section.title}
              </h3>
              <p className="text-sm text-gray-500">{section.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
