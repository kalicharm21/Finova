"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    const handleScroll = () => {
      const imageElement = imageRef.current;
      if (!imageElement) return; // ADD THIS SAFETY CHECK
    
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
    
      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Dynamically load the spline-viewer script
    const script = document.createElement("script");
    script.type = "module";
    // script.src = "https://unpkg.com/@splinetool/viewer@1.9.89/build/spline-viewer.js";
    document.body.appendChild(script);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-6xl md:text-8xl bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent font-extrabold tracking-tighter pr-2 pb-2">
          Manage Your Finances <br /> with Intelligence
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          An AI Powered financial assistant that helps you make informed decisions about your money
          and helps track and optimize spending.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8"> Get Started </Button>
          </Link>
          <Link href="https://www.linkedin.com/in/ishaan-mittal29">
            <Button size="lg" variant="outline" className="px-8"> My Github </Button>
          </Link>
        </div>

        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/ban.jpg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
