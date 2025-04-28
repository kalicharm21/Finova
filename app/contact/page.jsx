"use client";
import { useState } from "react";

export default function ContactPage() {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    fetch("https://formsubmit.co/imishaan296@gmail.com", {
      method: "POST",
      body: new FormData(form),
    }).then((res) => {
      if (res.ok) {
        setShowPopup(true);
        form.reset();
        setTimeout(() => setShowPopup(false), 3000);
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-4 py-20 mt-20">
      <div className="w-full max-w-5xl bg-white text-[#111] shadow-2xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-gray-200">
        {/* Left Form Section */}
        <div className="p-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12">
             <span className=" text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 drop-shadow-lg animate-pulse delay-2000">
             Contact Us
                </span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8 text-sm font-light font-serif">
            <div>
              <label className="block mb-2 text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Your name here..."
                className="w-full border-0 border-b border-gray-400 bg-transparent focus:outline-none focus:border-sky-500 transition duration-300 placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                required
                placeholder="abc@example.com"
                className="w-full border-0 border-b border-gray-400 bg-transparent focus:outline-none focus:border-sky-500 transition duration-300 placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700">Message:</label>
              <textarea
                name="message"
                rows={2}
                required
                placeholder="Type your message here"
                className="w-full border-0 border-b border-gray-400 bg-transparent focus:outline-none focus:border-sky-500 transition duration-300 placeholder-gray-500 resize-none"
              />
            </div>


            <button
              type="submit"
              className="mt-6 text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-700 transition duration-300"
            >
              Send
            </button>
          </form>

          {showPopup && (
            <div className="mt-4 text-green-600 font-medium animate-fade-in">
              ✅ Message sent successfully!
            </div>
          )}
        </div>

        {/* Right Contact Info Section */}
        <div className="bg-gradient-to-br from-[#eaeaea] to-[#d5d5d5] flex flex-col justify-center p-10 gap-6">
          <div className="bg-white px-5 py-3 rounded-md text-sm tracking-wide border border-gray-300 text-gray-800 shadow-sm">
          <span className="font-extrabold">Support Hours:</span>  Mon - Fri, 9:00 AM - 6:00 PM
          </div>
          <div className="bg-white px-5 py-3 rounded-md text-sm tracking-wide border border-gray-300 text-gray-800 shadow-sm">
          Join our community on <a href="https://discord.com/yourapp" target="_blank" className="text-indigo-600">Discord</a> for support and discussions
          </div>
        </div>
      </div>
    </div>
  );
}
