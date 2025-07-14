import { useState } from "react";
import { Link } from "react-router-dom";
import register from "../assets/register.avif";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Registered", { name, email, password });
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
              value={name}
              id="name"
              onChange={(e) => setName(e.target.value)}
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

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Sign Up
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
