import { Link } from "react-router-dom";
import { useState } from "react";
import { FiHome, FiUser } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Navbar = () => {
  const [auth, setAuth] = useState(true);

  return (
    <div className="flex justify-between items-center px-6 py-2 bg-white shadow-md relative">
      {/* Left - Nav Links */}
      <div className="flex space-x-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold text-purple-700 hover:text-purple-900 tracking-wider"
        >
          <FiHome />
          Home
        </Link>
        <Link
          to="/events"
          className="flex items-center gap-2 text-lg font-semibold text-purple-700 hover:text-purple-900 tracking-wider"
        >
          <LuCalendarDays />
          Events
        </Link>
        <Link
          to="/about"
          className="flex items-center gap-2 text-lg font-semibold text-purple-700 hover:text-purple-900 tracking-wider"
        >
          <AiOutlineInfoCircle />
          About
        </Link>
      </div>

      {/* Center - Site Title */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-xl font-extrabold text-pink-600 tracking-widest hidden md:block">
          Eventra
        </h1>
      </div>

      {/* Right - Auth Buttons or Profile */}
      <div className="flex items-center space-x-4">
        {!auth ? (
          <>
            <Link to="/login">
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <>
            <span className="text-purple-600 font-bold italic text-base flex items-center gap-1">
              👋 Welcome back! "userInfo.name"{" "}
            </span>
            <Link to="/profile">
              <FiUser className="text-2xl text-purple-600 hover:text-purple-800 transition cursor-pointer" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
