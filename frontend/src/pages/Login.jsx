import { useState } from "react";
import { Link } from "react-router-dom";
import login from "../assets/login.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://your-backend-api.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Store the token
      localStorage.setItem("token", data.token);

      navigate("/");
    }

    catch (err) {
      alert("Login Error:", err.message);
      // show toast or error message to user
    }
    
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 bg-gradient-to-br from-purple-400 via-pink-300 to-orange-250">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-9 rounded-2xl shadow-lg border border-purple-300 
             bg-gradient-to-br from-gray-800 via-purple-900 to-black text-white min-h-[500px]"
        >
          <div className="flex justify-center mb-4">
            <h1 className="text-3xl font-bold text-pink-300">Eventra</h1>
          </div>
          <h2 className="text-xl font-semibold text-center mb-2 text-gray-100">
            Welcome back 👋🏼
          </h2>
          <p className="text-sm text-center text-gray-300 mb-6">
            Enter your credentials to access your account
          </p>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded-lg font-semibold transition
              ${loading 
                  ? "bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 cursor-not-allowed" 
                  : " bg-purple-600 hover:bg-purple-700"}`}
          >
            
            {loading ? "Loading ..." : "Sign in"}
          </button>

          <p className="mt-6 text-center text-sm text-gray-300">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-pink-400 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </form>
      </div>

      {/* Right Section - Image */}
      <div className="hidden md:block w-1/2">
        <img
          src={login}
          alt="Login to Account"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
