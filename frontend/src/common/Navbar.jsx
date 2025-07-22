import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiHome, FiMenu, FiX } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("userInfo");

    if (token && user) {
      setAuth(true);
      setUserInfo(JSON.parse(user));
    } else {
      setAuth(false);
      setUserInfo(null);
    }
  }, [location]);

  const handleLogin = () => {
    navigate("/login");
    toast.info("Please Login Here", { duration: 1000 });
  };

  const handleRegister = () => {
    navigate("/register");
    toast.info("Please Register Here", { duration: 1000 });
  };

  const handleClick = () => {
    if (!userInfo || !userInfo.role) {
      console.log("no user role");
      return;
    }
    userInfo.role === "admin" ? navigate("/admin") : navigate("/profile");
  };

  return (
    <nav className="shadow-md bg-gradient-to-r from-orange-100 via-pink-200 to-purple-300 relative">
      <div className="flex justify-between items-center px-4 py-3 md:px-6">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-indigo-900 text-2xl"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Left - Nav Links (Desktop) */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold text-indigo-900 hover:text-purple-900"
          >
            <FiHome />
            Home
          </Link>
          <Link
            to="/events"
            className="flex items-center gap-2 text-lg font-semibold text-indigo-900 hover:text-purple-900"
          >
            <LuCalendarDays />
            All Events
          </Link>
          <Link
            to="/about"
            className="flex items-center gap-2 text-lg font-semibold text-indigo-900 hover:text-purple-900"
          >
            <AiOutlineInfoCircle />
            About
          </Link>
        </div>

        {/* Center - Title */}
        <Link
          to="/"
          className="absolute left-1/2 transform-translate-x-1/2 hidden md:block"
        >
          <h1 className="text-3xl font-extrabold text-pink-600 tracking-widest">
            Eventra
          </h1>
        </Link>

        {/* Right - Auth */}
        <div className="flex items-center space-x-3">
          {auth && userInfo ? (
            <>
              <span className="text-pink-800 text-sm md:text-lg font-semibold italic flex items-center gap-1">
                👋 {userInfo.username}
              </span>
              <div
                onClick={handleClick}
                className="w-8 h-8 rounded-full bg-pink-950 text-white flex items-center justify-center font-bold cursor-pointer"
              >
                {userInfo.username[0].toUpperCase()}
              </div>
            </>
          ) : (
            <>
              {location.pathname === "/login" && (
                <p className="text-indigo-800 text-lg">🔐 Login Page</p>
              )}
              {location.pathname === "/register" && (
                <p className="text-purple-800 text-lg flex items-center gap-1">
                  <FiEdit />
                  Register Page
                </p>
              )}
              {location.pathname !== "/login" &&
                location.pathname !== "/register" && (
                  <>
                    <button
                      onClick={handleLogin}
                      className="px-3 py-1 rounded-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Login
                    </button>
                    <button
                      onClick={handleRegister}
                      className="px-3 py-1 rounded-md text-sm font-semibold text-white bg-purple-500 hover:bg-purple-600"
                    >
                      Register
                    </button>
                  </>
                )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-pink-100 shadow-md z-10">
          <h1 className="text-3xl font-extrabold text-pink-600 tracking-widest pb-2">
            Eventra
          </h1>
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 text-lg font-semibold text-indigo-900 hover:text-purple-900"
          >
            <FiHome/> Home
          </Link>
          <Link
            to="/events"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 text-lg font-semibold text-indigo-900 hover:text-purple-900"
          >
            <FiMenu/> All Events
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 text-lg font-semibold text-indigo-900 hover:text-purple-900"
          >
            <LuCalendarDays/> About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
