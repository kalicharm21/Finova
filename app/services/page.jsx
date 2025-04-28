"use client";

export default function ServicesPage() {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-[#e0f2fe] to-[#f0fdfa] px-6 py-12 flex flex-col items-center justify-center mt-8">
    <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <img
            src="/say.png" // Update this path as needed
            alt="Finova Logo"
            className="w-[70%] max-w-[600px]"
          />
        </div>
        <div className="relative z-10 max-w-5xl text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent mb-6 mt-10">
            Our Intelligent Services
          </h1>
          <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
            Finova blends AI, finance, and user-friendly design to offer a smart, secure, and deeply personalized financial assistant. Here's what we bring to your fingertips:
          </p>
  
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "AI-Powered Expense Tracking",
                desc: "Automatically categorize transactions and scan receipts using Gemini AI for a holistic financial view.",
              },
              {
                title: "Smart Budgeting",
                desc: "Dynamic, behavior-aware budgeting tools with real-time adjustments and visual feedback.",
              },
              {
                title: "Investment Guidance",
                desc: "AI-generated suggestions based on your risk profile, goals, and market analysis.",
              },
              {
                title: "Proactive Notifications",
                desc: "Never miss a bill or go over budget. Get alerts for spending patterns and financial threats.",
              },
              {
                title: "Recurring Transaction Automation",
                desc: "Set it and forget it — we track recurring income and expenses for accurate planning.",
              },
              {
                title: "AI Financial Insights",
                desc: "Monthly reports with intelligent insights to uncover savings opportunities and improve decision-making.",
              },
              {
                title: "Top-tier Security",
                desc: "Bank-level encryption, Clerk-based authentication, and Arcjet protection to keep your data safe.",
              },
              {
                title: "Beautiful, Accessible UI",
                desc: "Built using Next.js, Tailwind CSS, and Shadcn UI — fast, accessible, and pleasing to the eye.",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="p-6 bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-700">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
  
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }
        `}</style>
      </div>
    );
  }
  