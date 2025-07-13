import { Search } from "lucide-react";
import { useState } from "react";
import herobackground from "../assets/herobackground.mp4";

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section className="relative bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={herobackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-white">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-md">
            Discover Amazing Events Near You
          </h1>
          <p className="text-lg md:text-xl text-pink-100 mb-10 max-w-2xl mx-auto">
            From concerts and conferences to meetups and workshops - explore and register with ease.
          </p>

          {/* Search Input + Button */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-200 h-5 w-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-pink-200/10 text-white placeholder:text-pink-100 pl-12 py-3 rounded-xl border border-white/20 focus:ring-2 focus:ring-white outline-none transition backdrop-blur-md"
              />
            </div>

            <button className="bg-pink-100 text-purple-800 font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-pink-200 hover:text-purple-900 hover:scale-105 transition duration-200">
                Explore Events
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
