import { Search, Sparkles, Calendar, Users, MapPin } from "lucide-react";
import { useState } from "react";
import herobackground from "../assets/herobackground.mp4";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/events");
  }

  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-pink-800 to-red-700 overflow-hidden min-h-screen flex items-center">
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

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-400/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-400/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-red-400/20 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-pink-400/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-purple-900/30 to-black/50 backdrop-blur-[1px]"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white z-10">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8 animate-pulse-slow">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium">Discover Amazing Events</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            <span className="gradient-text">Discover Amazing</span>
            <br />
            <span className="text-white">Events Near You</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            From concerts and conferences to meetups and workshops - explore and register with ease.
            <br />
            <span className="text-pink-300 font-semibold">Join thousands of event enthusiasts!</span>
          </p>

          {/* Search Input + Button */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
            <div className="relative w-full max-w-lg group">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6 group-focus-within:text-pink-400 transition-colors" />
              <input
                type="text"
                placeholder="Search events, categories, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 pl-16 pr-6 py-4 rounded-2xl border border-white/20 focus:ring-4 focus:ring-pink-400/50 focus:border-pink-400 outline-none transition-all duration-300 text-lg"
              />
            </div>

            <button 
              onClick={handleClick}
              className="btn-primary text-lg px-8 py-4 flex items-center gap-3 group"
            >
              <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Explore Events
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-effect rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300">
              <Users className="w-12 h-12 text-pink-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300">
              <Calendar className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-300">Events Monthly</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300">
              <MapPin className="w-12 h-12 text-red-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-300">Cities Covered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
