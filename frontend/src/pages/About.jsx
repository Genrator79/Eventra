import { Link } from "react-router-dom";
import teamImg from "../assets/team.png";
import missionImg from "../assets/mission.png";
import eventsImg from "../assets/events.png";
import visionImg from "../assets/vision.png";
import joinUsImg from "../assets/join.png";

const About = () => {
  return (
    <div className="text-gray-900 bg-gradient-to-br from-[#B19CD9] via-[#D6B8E6] to-[#E9CCED] min-h-screen">
      <div className="text-center py-12">
        <h1 className="text-4xl font-extrabold drop-shadow-md text-purple-700">About Eventra</h1>
        <p className="text-lg mt-4 text-gray-800 px-4 max-w-3xl mx-auto">
          Your all‑in‑one solution to discover, host, and manage meaningful events. Eventra is not just a platform—it’s a canvas for community and connection.
        </p>
      </div>

      {/* Mission */}
      <section className="flex flex-col md:flex-row items-center justify-center px-6 py-16 gap-10 bg-white/60 backdrop-blur-sm rounded-lg mx-4">
        <img src={missionImg} alt="Mission" className="rounded-lg shadow-lg w-full md:w-1/2 h-64 object-cover" />
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold mb-4 text-purple-600">Our Mission</h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            Founded on the belief that experiences matter, Eventra’s mission is to make event creation effortless and impactful. We help bring ideas to life—so organizers can focus on connection, not logistics.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-center px-6 py-16 gap-10 bg-white/60 backdrop-blur-sm rounded-lg mx-4 mt-12">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold mb-4 text-purple-600">What We Do</h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            From ticketing and attendee management to promotion tools and analytics, Eventra empowers creators of all kinds—whether you're running a local meetup, virtual workshop, or large festival.
          </p>
        </div>
        <img src={eventsImg} alt="Events" className="rounded-lg shadow-lg w-full md:w-1/2 h-64 object-cover" />
      </section>

      {/* Team */}
      <section className="flex flex-col md:flex-row items-center justify-center px-6 py-16 gap-10 bg-white/60 backdrop-blur-sm rounded-lg mx-4 mt-12">
        <img src={teamImg} alt="Team" className="rounded-lg shadow-lg w-full md:w-1/2 h-64 object-cover" />
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold mb-4 text-purple-600">The Eventra Team</h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            A passionate blend of developers, designers, and event enthusiasts. We believe in crafting intuitive tools with heart—so your ideas shine through.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-center px-6 py-16 gap-10 bg-white/60 backdrop-blur-sm rounded-lg mx-4 mt-12">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold mb-4 text-purple-600">Our Vision</h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            We envision a world where anyone can craft events that resonate—regardless of background or budget. By blending tech and empathy, Eventra aims to inspire creativity and community across the globe.
          </p>
        </div>
        <img src={visionImg} alt="Vision" className="rounded-lg shadow-lg w-full md:w-1/2 h-64 object-cover" />
      </section>

      {/* Join Us */}
      <section className="text-center px-6 py-20 bg-white/80 backdrop-blur-sm rounded-lg mx-4 mt-12">
        <img src={joinUsImg} alt="Join Us" className="mx-auto rounded-lg shadow-lg w-full md:w-1/2 h-64 object-cover mb-6" />
        <h2 className="text-3xl font-bold mb-4 text-purple-700">Join Us on This Journey 🚀</h2>
        <p className="text-gray-800 mb-6 max-w-2xl mx-auto text-lg">
          Whether you're an organizer, artist, or attendee—Eventra is your stage. Be part of a vibrant community that celebrates passion, creativity, and connection.
        </p>
        <Link to="/register">
          <button className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-purple-700 transition">
            Get Started
          </button>
        </Link>
      </section>
    </div>
  );
};

export default About;
