"use client";

export default function AboutPage() {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7ff] to-[#e1e6ff] overflow-hidden px-4 mt-10">
        {/* Background Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <img
            src="/say.png" // Update this path as needed
            alt="Finova Logo"
            className="w-[70%] max-w-[600px]"
          />
        </div>
  
        {/* Content */}
        <div className="relative z-10 text-center animate-[fadeIn_1s_ease-out]">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 drop-shadow mb-6">
            About Finova
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium max-w-2xl mx-auto">
            We’re building <span className="font-semibold text-indigo-600">Finova</span>, your one-stop platform for smart budgeting, effortless expense tracking, and powerful AI-driven financial insights.
          </p>
        </div>
  
        {/* Inline fade-in animation */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }