import { useState } from "react";
import { Link } from "react-router-dom";
import login from "../assets/login.png";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://eventra-backend-lsy8.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        const decoded = jwtDecode(data.accessToken);
        console.log(decoded);//check
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            username: decoded.username,
            role: decoded.role,
          })
        );
        toast.success("Login Successful!!!", { duration: 800 });
        setTimeout(() => navigate("/"), 500); // Redirect to home page after successful login
      } else {
        toast.error(data?.message || "Invalid email or password");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Login Error");
      // show toast or error message to user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex min-h-[600px]">
          {/* Left Section - Form */}
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12">
            <div className="max-w-md mx-auto w-full">
              {/* Logo */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h1 className="text-3xl font-bold gradient-text">Eventra</h1>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Welcome back! 👋
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Sign in to your account to continue
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500 dark:bg-gray-700" />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "btn-primary hover:shadow-lg hover:shadow-purple-500/25"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>

                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-300">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-purple-600 hover:text-purple-700 font-semibold hover:underline"
                    >
                      Create one now
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="hidden md:block w-1/2 relative">
            <img
              src={login}
              alt="Login to Account"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Join thousands of event enthusiasts!</h3>
              <p className="text-lg opacity-90">
                Discover amazing events, connect with like-minded people, and create unforgettable memories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
