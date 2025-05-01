import { Inter } from "next/font/google";
import "./globals.css";
import { sub } from "date-fns";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { FaEnvelope, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";  // <-- Import Link here
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Finova",
  description: "One stop finance platform",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          {/* header */}
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Toaster richColors />
          
          {/* footer */}
          <footer className="bg-gradient-to-r from-blue-500 to-purple-600 bg-opacity-80 py-16 mt-12 dark:bg-gray-900 dark:bg-opacity-100 dark:text-white transition-all shadow-lg bg-opacity-100">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-gray-200 dark:text-gray-300">

                {/* Brand Description */}
                <div className="space-y-4">
                  <h3 className="text-3xl font-semibold text-white mb-2 tracking-wide">Finova</h3>
                  <p className="text-sm text-gray-200">
                    A one-stop finance platform to manage, track, and grow your money efficiently with insights.
                  </p>
                </div>

                {/* Navigation */}
                <div className="space-y-5">
                  <h4 className="font-semibold text-xl text-white mb-3">Quick Links</h4>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/" className="hover:text-gray-300 transition-all">Home</Link></li>
                    <li><Link href="/about" className="hover:text-gray-300 transition-all">About</Link></li>
                    <li><Link href="/services" className="hover:text-gray-300 transition-all">Services</Link></li>
                    <li><Link href="/contact" className="hover:text-gray-300 transition-all">Contact</Link></li>
                  </ul>
                </div>

                {/* Support Links */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-xl text-white mb-3">Support</h4>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="/faq" className="hover:text-gray-300 transition-all">FAQs</Link></li>
                    <li><Link href="/help" className="hover:text-gray-300 transition-all">Help Center</Link></li>
                  </ul>
                </div>

                {/* Contact and Social */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-xl text-white mb-3">Contact Us</h4>
                  <p className="text-sm">imishaan296@gmail.com</p>
                  <p className="text-sm mb-3">--</p>
                  <div className="flex space-x-6 mt-4">
                    {/* Twitter */}
                    <a
                      href="https://twitter.com/yourusername"
                      className="text-white hover:text-gray-300 transition-transform transform hover:scale-125"
                      aria-label="Twitter"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter size={28} />
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/in/ishaan-mittal29"
                      className="text-white hover:text-gray-300 transition-transform transform hover:scale-125"
                      aria-label="LinkedIn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin size={28} />
                    </a>

                    {/* E */}
                    <a
      href="mailto:imishaan296@gmail.com"
      className="text-white hover:text-gray-300 transition-transform transform hover:scale-125"
      aria-label="Email"
    >
      <FaEnvelope size={28} />
    </a>

                  </div>
                </div>

              </div>

              {/* Bottom Bar */}
              <div className="border-t border-gray-400 mt-10 pt-6 text-center text-lg text-white dark:text-gray-500">
                © {new Date().getFullYear()} Finova. All rights reserved.
              </div>
            </div>
          </footer>
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
