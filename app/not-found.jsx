import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-gradient-to-br from-[#f0f4ff] via-[#e5e9ff] to-[#dee4ff]">
      <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 drop-shadow-lg animate-pulse">
        404
      </h1>
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mt-4 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 text-lg mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link href="/">
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300 ease-in-out">
          Return Home
        </Button>
      </Link>
    </div>
  );
}