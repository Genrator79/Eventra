import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  FaUser,
  FaEnvelope,
  FaUniversity,
  FaBriefcase,
  FaPenNib,
} from "react-icons/fa";

const UserDetails = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    college: "",
    company: "",
    profession: "",
    description: "",
  });

  const didRun = useRef(false);

  useEffect(() => {
    if(didRun.current) return;
    didRun.current = true;
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required. Please log in.");
        return navigate("/login");
      }
      console.log("TOKEN:", token);
      try {
        const res = await fetch("http://localhost:9000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUserData(data.user);
        } else {
          toast.error(data?.message || "Failed to load user info");
        }
      } catch (err) {
        toast.error("Error fetching profile");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication required. Please log in.");
      setLoading(false);
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:9000/api/user/me/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Failed to update user details", {duration : 1000});
      }
      toast.success("Profile updated successfully!", { duration: 2500 });
      console.log("Server response:", result);
    } 
    catch (error) {
      toast.error(error.message || "Failed to update user details");
      console.error("Error updating user:", error);
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100">
      <div className="w-full mx-auto">
        {/* === Current Details Card === */}
        <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white p-8 rounded-2xl shadow-lg mb-10">
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
            <FaUser className="text-white" />
            {userData.username}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-xl" />
                <span className="text-lg">{userData.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaBriefcase className="text-xl" />
                <span className="text-lg">
                  {userData?.company || "Not Provided"}
                </span>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaUniversity className="text-xl" />
                <span className="text-lg">
                  {userData?.college || "Not Provided"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaPenNib className="text-xl" />
                <span className="text-lg">
                  {userData?.profession || "Not Provided"}
                </span>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">About</h3>
            <p className="text-lg leading-relaxed">
              {userData?.description || "Not Provided"}
            </p>
          </div>
        </div>

        {/* === Editable Form === */}
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-white via-purple-100 to-pink-50 rounded-2xl shadow-2xl p-8 space-y-6 border border-purple-200 w-full max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-purple-900 mb-4">
            Edit Your Info
          </h3>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-purple-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="username"
              value={userData.username}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-purple-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* College */}
          <div>
            <label
              htmlFor="college"
              className="block text-sm font-medium text-purple-700 mb-1"
            >
              College
            </label>
            <input
              id="college"
              name="college"
              value={userData.college}
              onChange={handleChange}
              placeholder="College"
              className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Company */}
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-purple-700 mb-1"
            >
              Company
            </label>
            <input
              id="company"
              name="company"
              value={userData.company}
              onChange={handleChange}
              placeholder="Company"
              className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Profession */}
          <div>
            <label
              htmlFor="profession"
              className="block text-sm font-medium text-purple-700 mb-1"
            >
              Profession
            </label>
            <input
              id="profession"
              name="profession"
              value={userData.profession}
              onChange={handleChange}
              placeholder="Profession"
              className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-purple-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={userData.description}
              onChange={handleChange}
              placeholder="Write about yourself"
              className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:brightness-110 text-white py-2 px-6 rounded-lg font-semibold transition"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
