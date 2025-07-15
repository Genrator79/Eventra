import { useEffect, useState } from "react";
import profileImg from "../assets/profile.png";
import eventImg from "../assets/event-placeholder.png";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Abhijeet Kumar",
    email: "abhijeet@example.com",
    joined: "March 2024",
    profession: "Full Stack Developer",
    role: "Student at IITBH",
  });

  const [registeredEvents, setRegisteredEvents] = useState([
    {
      id: 1,
      title: "ReactConf 2025",
      date: "August 22, 2025",
      image: eventImg,
    },
    {
      id: 2,
      title: "AI Summit Delhi",
      date: "September 5, 2025",
      image: eventImg,
    },
  ]);

  const navigate = useNavigate();

  const navtodetails = () => {
    navigate("/profile/userDetails");
  };
  const [pastEvents, setPastEvents] = useState([
    {
      id: 3,
      title: "Startup Meetup 2024",
      date: "March 18, 2024",
      image: eventImg,
    },
    {
      id: 4,
      title: "Tech Carnival 2023",
      date: "December 12, 2023",
      image: eventImg,
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECE4F2] via-[#EADCF5] to-[#D7C9E6] py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* User Info */}
        <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 text-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row gap-8 items-center w-full">
          <img
            src={profileImg}
            onClick={navtodetails}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md hover:scale-105 transition-transform duration-300"
          />
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h2
                onClick={navtodetails}
                className="text-4xl font-extrabold tracking-wide hover:text-orange-200 hover:scale-105 transition-transform duration-300"
              >
                {user.name}
              </h2>
              <p className="text-white/90 text-base font-light">
                📧 {user.email}
              </p>
              <p className="text-white/90 text-base font-light">
                💼 {user.profession}
              </p>
            </div>
            <div className="flex flex-col justify-center items-start md:items-end space-y-2">
              <p className="text-white/90 text-base font-light">
                🎓 {user.role}
              </p>
              <p className="text-white/80 text-sm italic">
                🎉 Joined: {user.joined}
              </p>
              <div className="flex gap-4 mt-4">
                <div className="bg-white text-purple-700 text-center rounded-full w-24 h-24 flex flex-col justify-center items-center shadow-md border-4 border-purple-300">
                  <span className="text-2xl font-bold">
                    {registeredEvents.length}
                  </span>
                  <span className="text-xs font-medium">To Attend</span>
                </div>
                <div className="bg-white text-pink-600 text-center rounded-full w-24 h-24 flex flex-col justify-center items-center shadow-md border-4 border-pink-300">
                  <span className="text-2xl font-bold">
                    {pastEvents.length}
                  </span>
                  <span className="text-xs font-medium">Attended</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Registered Events */}
        <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-purple-200 rounded-2xl p-6 shadow-inner">
          <h3 className="text-2xl font-semibold text-purple-800 mb-4">
            Registered Events
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {registeredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-purple-800">
                    {event.title}
                  </h4>
                  <p className="text-gray-700 text-sm">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 rounded-2xl p-6 shadow-inner">
          <h3 className="text-2xl font-semibold text-pink-700 mb-4">
            Past Attended Events
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-pink-700">
                    {event.title}
                  </h4>
                  <p className="text-gray-700 text-sm">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suggestions / Recommendations */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-purple-700 mb-3">
            Recommended for You
          </h3>
          <p className="text-gray-600">
            Based on your interests and past events, we’ll soon show
            personalized event recommendations here.
          </p>
        </div>
        {/* Logout Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              toast.success("Logged out successfully!", { duration: 800 });
              setTimeout(() => navigate("/login"), 500);
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition w-full"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
