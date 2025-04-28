"use client";
import { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqData = [
  {
    question: "What is this app used for?",
    answer:
      "Our app helps you track your expenses, manage your budget, and gain insights into your financial habits — all in one beautiful dashboard.",
  },
  {
    question: "Is the app free to use?",
    answer:
      "Yes! You can use the core features for free. We also offer a premium plan with advanced tools, analytics, and unlimited access.",
  },
  {
    question: "Is there a limit on free usage?",
    answer:
      "Yes — free users can add up to 10 transactions per hour to prevent abuse or bot activity. Upgrade to unlock unlimited access.",
  },
  {
    question: "How secure is my financial data?",
    answer:
      "We use bank-grade encryption, secure cloud storage, and strict privacy standards. Your data is safe and never shared.",
  },
  {
    question: "How can I get support or report an issue?",
    answer:
      "Reach out to us via the 'Contact Us' page or email us directly at support@yourapp.com. We’re here to help!",
  },
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Handle animation after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] py-20 px-4 font-sans mt-10">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>

      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6 drop-shadow-sm">
          Frequently Asked <span className="text-indigo-600">Questions</span>
        </h1>
        <p className="text-gray-500 text-lg mb-12">
          Everything you need to know before getting started.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-5">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`bg-white border border-gray-200 rounded-2xl shadow-lg transition-all ${
              isMounted ? "fade-in" : ""
            }`}
          >
            <button
              className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
              onClick={() => toggle(index)}
            >
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                {item.question}
              </h2>
              <span className="text-indigo-600 text-2xl">
                {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
              </span>
            </button>
            {activeIndex === index && (
              <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed fade-in">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
