import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiHome } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

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
  }, [location]); // Re-run on route change

  const handleLogin = () => {
    navigate("/login");
    toast.info("Please Login Here", { duration: 1000 });
  };

  const handleRegister = () => {
    navigate("/register");
    toast.info("Please Register Here", { duration: 1000 });
  };

  const handleClick = () =>{
    if (!userInfo || !userInfo.role){
      console.log("no user role") 
      return;
    }
    userInfo.role ==="admin" ? navigate("/admin") : navigate("/profile");
  }

  return (
    <div className="flex justify-between items-center px-6 py-2 shadow-md relative bg-gradient-to-r from-orange-100 via-pink-200 to-purple-300">
      {/* Left - Nav Links */}
      <div className="flex space-x-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold text-indigo-900 hover:text-purple-900 tracking-wider"
        >
          <FiHome />
          Home
        </Link>
        <Link
          to="/events"
          className="flex items-center gap-2 text-lg font-semibold text-indigo-900 hover:text-purple-900 tracking-wider"
        >
          <LuCalendarDays />
          All Events
        </Link>
        <Link
          to="/about"
          className="flex items-center gap-2 text-lg font-semibold text-indigo-900 hover:text-purple-900 tracking-wider"
        >
          <AiOutlineInfoCircle />
          About
        </Link>
      </div>

      {/* Center - Site Title */}
      <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-3xl font-extrabold text-pink-600 tracking-widest hidden md:block">
          Eventra
        </h1>
      </Link>

      {/* Right - Auth Section */}
      <div className="flex items-center space-x-3">
        {auth && userInfo ? (
          <>
            <span className="text-pink-800 text-lg font-semibold italic flex items-center gap-1 drop-shadow-sm">
              👋 Welcome! {userInfo.username}
            </span>
            <div 
              onClick={handleClick}
              className="w-8 h-8 rounded-full bg-pink-950 text-white flex items-center justify-center font-bold"
            >
              {userInfo.username[0].toUpperCase()}
            </div>
          </>
        ) : (
          <>
            {location.pathname === "/login" && (
              <p className="text-indigo-800 text-2xl">🔐 Login Page</p>
            )}
            {location.pathname === "/register" && (
              <p className="text-purple-800 text-2xl flex items-center gap-1">
                <FiEdit />
                Register Page
              </p>
            )}
            {location.pathname !== "/login" &&
              location.pathname !== "/register" && (
                <>
                  <button
                    onClick={handleLogin}
                    className="px-4 py-1 rounded-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleRegister}
                    className="px-4 py-1 rounded-md text-sm font-semibold text-white bg-purple-500 hover:bg-purple-600 transition"
                  >
                    Register
                  </button>
                </>
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
