import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import { eventsAPI } from "../config/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "sonner";

const Registration = () => {
  const { eventId } = useParams();
  //   console.log(eventId);

  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to see Event Details", { duration: 800 });
      setTimeout(() => navigate("/login"), 500);
      return;
    }
    const getEvents = async () => {
      try {
        setLoading(true);
        const response = await eventsAPI.getAllEvents();
        console.log("Fetched events:", response.data.events);
        setEvents(response.data.events);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          toast.warning("Session expired. Please login again.", {
            duration: 4000,
          });
          navigate("/login");
          return;
        }
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to fetch event", { duration: 4000 });
      } finally {
        setLoading(false);
      }
    };
    getEvents();
  }, [navigate]);

  const event = events.find((e) => e._id === eventId);
  console.log(event);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#fbe4ff] via-[#e0f7ff] to-[#fff5e4]">
        <LoadingSpinner size="large" text="Loading event details..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#fbe4ff] via-[#e0f7ff] to-[#fff5e4] text-center px-6 py-20 relative overflow-hidden">
      {/* Decorative confetti background */}
      <div className="absolute inset-0 bg-[url('/confetti.svg')] opacity-10 z-0" />

      <div className="bg-white/90 backdrop-blur-lg p-10 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-w-2xl z-10 border border-pink-100 space-y-6">
        <FaCheckCircle className="text-5xl text-green-500 mx-auto" />
        <h2 className="text-4xl font-extrabold text-purple-700">
          🎉 Registration Successful!
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          You’ve successfully registered for{" "}
          <span className="font-bold text-pink-600">
            {event ? event.title : "this event"}
          </span>
          . Check your inbox for a confirmation email.
        </p>

        {/* Event Details Card */}
        {event && (
          <div className="bg-gradient-to-r from-[#fdf6ff] via-[#fff2f2] to-[#edf9fa] border border-purple-200 shadow-inner rounded-2xl p-6 text-left text-base text-gray-700 space-y-3">
            <div className="flex items-start space-x-3">
              <FaCalendarAlt className="text-purple-600 mt-1" />
              <div>
                <p className="font-semibold text-gray-800">Date</p>
                <p>{new Date(event.date).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <FaMapMarkerAlt className="text-pink-500 mt-1" />
              <div>
                <p className="font-semibold text-gray-800">Location</p>
                <p>{event.location}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <FaMoneyBillWave className="text-green-600 mt-1" />
              <div>
                <p className="font-semibold text-gray-800">Price</p>
                <p>{event.price === 0 ? "Free" : `₹${event.price}`}</p>
              </div>
            </div>
          </div>
        )}

        <Link
          to="/"
          className="inline-block mt-2 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
        >
          🔙 Go to Homepage
        </Link>
      </div>
    </div>
  );

};

export default Registration;
