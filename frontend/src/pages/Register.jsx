import { useState } from "react";
import { Link } from "react-router-dom";
import register from "../assets/register.avif";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:9000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message || "Error in Registration", {
          duration: 3000,
        });
      }

      // ✅ Store token in localStorage
      localStorage.setItem("token", data.accessToken);
      toast.success("Registration successful!", { duration: 1000 });
      setTimeout(() => navigate("/"), 500);
      return;
    } catch (err) {
      toast.error("Something went wrong! Please try again", { duration: 3000 });
      // show toast or error message to user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 bg-gradient-to-br from-purple-400 via-pink-300 to-orange-250">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 rounded-2xl shadow-lg border border-pink-300
                     bg-gradient-to-br from-[#2e002e] via-[#6b0f1a] to-[#ff6a00] text-white min-h-[520px]"
        >
          <div className="flex justify-center mb-4">
            <h1 className="text-3xl font-bold text-orange-300">Eventra</h1>
          </div>
          <h2 className="text-xl font-semibold text-center mb-2 text-gray-100">
            Let’s get started 🎉
          </h2>
          <p className="text-sm text-center text-gray-300 mb-6">
            Fill in the details to create your account
          </p>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              value={username}
              id="name"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-black"
              placeholder="Enter your name"
              required
            />
          </div>

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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-black"
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-black"
              placeholder="Create a password"
              required
            />
          </div>

          {/* check box */}
          <div className="form-control mb-3 flex align-baseline">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-xs"
                required
              />
              <span className="text-xs leading-tight p-2 mb-5">
                I agree to the{" "}
                <span className="text-primary hover:text-blue-500 hover:underline">
                  terms of service
                </span>{" "}
                and{" "}
                <span className="text-primary hover:text-blue-500 hover:underline">
                  privacy policy
                </span>
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded-lg font-semibold transition
              ${
                loading
                  ? "bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>

          <p className="mt-6 text-center text-sm text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-300 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Right Section - Image */}
      <div className="hidden md:block w-1/2">
        <img
          src={register}
          alt="Register for Eventra"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
