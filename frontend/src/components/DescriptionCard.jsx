import { useNavigate, useParams } from "react-router-dom";
import { CalendarDays, Clock, MapPin, Users, IndianRupee } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { eventsAPI } from "../config/api";
import LoadingSpinner from "./LoadingSpinner";

const EventDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const didRun = useRef(false);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  const [events, setEvents] = useState([]);

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
        setDataLoading(true);
        const response = await eventsAPI.getAllEvents();
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
        toast.error(err.response?.data?.message || "Failed to load events", { duration: 4000 });
      } finally {
        setDataLoading(false);
      }
    };
    getEvents();
  }, [navigate]);

  const event = events.find((e) => e._id === id);

  if (dataLoading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col items-center justify-center space-y-6">
          <LoadingSpinner size="large" text="Loading event details..." />
        </div>
      </div>
    );
  }

  if (!event)
    return <p className="text-center text-red-600 mt-10">Event not found</p>;

  const eventDate = new Date(event.date);
  const datePart = eventDate.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timePart = eventDate.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleRegistration = async () => {
    try {
      setLoading(true);
      await eventsAPI.registerEvent(id);
      setTimeout(() => navigate(`/events/registration/${id}`), 500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover blur-sm scale-105"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 px-6 max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl max-w-3xl animate-in slide-in-from-bottom-5 duration-700">
            <span className="inline-block px-3 py-1 bg-purple-600 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              {event.category || "Event"}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90 font-medium">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-purple-300" />
                {datePart}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-pink-300" />
                {event.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left Column: Description & Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About Section */}
            <section className="bg-white">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-purple-600 rounded-full"></span>
                About the Event
              </h2>
              <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none whitespace-pre-line">
                <p>{event.longDescription ? event.longDescription : event.description}</p>
              </div>
            </section>

            {/* Gallery Section */}
            {event.gallery?.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Gallery 📸</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.gallery.map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden shadow-md aspect-video">
                      <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-110 transition duration-500" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Default Main Image if no gallery, just to keep visual interest if desired, or skip */}
            {(!event.gallery || event.gallery.length === 0) && (
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img src={event.imageUrl} alt="Event Highlights" className="w-full h-auto object-cover hover:scale-105 transition duration-700" />
              </div>
            )}

            {/* Workshops Section */}
            {event.workshops?.length > 0 && (
              <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-2xl">🛠</span> Workshops & Activities
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {event.workshops.map((ws, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm shrink-0">
                        {i + 1}
                      </div>
                      <span className="text-gray-700 font-medium">{ws}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Participating Companies */}
            {event.companies?.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-2xl">🏢</span> Partners & Sponsors
                </h2>
                <div className="flex flex-wrap gap-4">
                  {event.companies.map((company, i) => (
                    <div key={i} className="px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-700 font-semibold shadow-sm hover:shadow-md transition">
                      {company}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">

              {/* Booking Card */}
              <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Total Price</p>
                    <div className="flex items-center text-4xl font-bold text-gray-900 mt-1">
                      <IndianRupee className="w-8 h-8" />
                      {event.price}
                    </div>
                  </div>
                  {event.price === 0 && <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">Free</span>}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <CalendarDays className="w-5 h-5 text-purple-500" />
                    <span>{datePart}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span>{timePart} IST</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-pink-500" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <button
                  onClick={handleRegistration}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all transform hover:-translate-y-1 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-purple-500/30"
                    }`}
                >
                  {loading ? "Processing..." : "Register Now"}
                </button>
                <p className="text-center text-xs text-gray-400 mt-4">
                  Secure payment & verified registration
                </p>
              </div>

              {/* VIP Guests Sidebar */}
              {event.vip?.length > 0 && (
                <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100">
                  <h3 className="font-bold text-purple-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" /> VIP Guests
                  </h3>
                  <div className="flex flex-col gap-3">
                    {event.vip.map((guest, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                          {guest[0]}
                        </div>
                        <span className="font-medium text-gray-800">{guest}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDescription;
