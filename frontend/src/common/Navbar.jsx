import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiHome, FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { Sparkles, Bell, Settings, Sun, Moon } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setAuth(false);
    setUserInfo(null);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>

          {/* Left - Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text hidden sm:block">
              Eventra
            </h1>
          </Link>

          {/* Center - Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                location.pathname === "/"
                  ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <FiHome className="w-4 h-4" />
              Home
            </Link>
            <Link
              to="/events"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                location.pathname === "/events"
                  ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <LuCalendarDays className="w-4 h-4" />
              Events
            </Link>
            <Link
              to="/about"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                location.pathname === "/about"
                  ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <AiOutlineInfoCircle className="w-4 h-4" />
              About
            </Link>
          </div>

          {/* Right - Auth & User Actions */}
          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {auth && userInfo ? (
              <>
                {/* Notifications */}
                <button className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>

                {/* User Profile Dropdown */}
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">
                      Welcome back, <span className="text-purple-600 font-semibold">{userInfo.username}</span>
                    </span>
                  </div>
                  
                  <div className="relative group">
                    <button
                      onClick={handleClick}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white flex items-center justify-center font-bold text-sm">
                        {userInfo.username[0].toUpperCase()}
                      </div>
                      <FiUser className="w-4 h-4 text-gray-600" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <button
                        onClick={handleClick}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <FiUser className="w-4 h-4" />
                        {userInfo.role === "admin" ? "Admin Panel" : "My Profile"}
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <FiLogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {location.pathname === "/login" && (
                  <div className="flex items-center gap-2 text-purple-600 font-medium">
                    <FiUser className="w-4 h-4" />
                    <span className="hidden sm:inline">Login Page</span>
                  </div>
                )}
                {location.pathname === "/register" && (
                  <div className="flex items-center gap-2 text-purple-600 font-medium">
                    <FiEdit className="w-4 h-4" />
                    <span className="hidden sm:inline">Register Page</span>
                  </div>
                )}
                {location.pathname !== "/login" && location.pathname !== "/register" && (
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleLogin}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={handleRegister}
                      className="btn-primary text-sm px-6 py-2"
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  location.pathname === "/"
                    ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FiHome className="w-5 h-5" />
                Home
              </Link>
              <Link
                to="/events"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  location.pathname === "/events"
                    ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <LuCalendarDays className="w-5 h-5" />
                Events
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  location.pathname === "/about"
                    ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <AiOutlineInfoCircle className="w-5 h-5" />
                About
              </Link>
            </div>

            {/* Mobile Auth Section */}
            {!auth ? (
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <button
                  onClick={() => {
                    handleLogin();
                    setMobileOpen(false);
                  }}
                  className="w-full px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    handleRegister();
                    setMobileOpen(false);
                  }}
                  className="w-full btn-primary"
                >
                  Get Started
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white flex items-center justify-center font-bold">
                    {userInfo.username[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{userInfo.username}</div>
                    <div className="text-sm text-gray-500 capitalize">{userInfo.role}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleClick();
                    setMobileOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
                >
                  <FiUser className="w-5 h-5" />
                  {userInfo.role === "admin" ? "Admin Panel" : "My Profile"}
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors flex items-center gap-3"
                >
                  <FiLogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
