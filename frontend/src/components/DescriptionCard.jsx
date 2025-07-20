import { useNavigate, useParams } from "react-router-dom";
import { CalendarDays, Clock, MapPin, Users, IndianRupee } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const EventDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const didRun = useRef(false);
  const [loading, setLoading] = useState(false);

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
        const res = await fetch("http://localhost:9000/api/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          toast.warning("Session expired. Please login again.", {
            duration: 4000,
          });
          navigate("/login");
          return;
        }
        const data = await res.json();

        if (res.ok) {
          setEvents(data.events);
        } else {
          toast.error("Failed to load events", { duration: 4000 });
        }
      } catch (err) {
        console.error(err);
        toast.warning("Error fetching event detail", { duration: 4000 });
      }
    };
    getEvents();
  }, [navigate]);

  const event = events.find((e) => e._id === id);

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

  const handleRegistration = () =>{
    setLoading(true);
    setTimeout(()=>navigate(`/events/registration/${id}`),500);
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-purple-700">{event.title}</h1>
      </div>

      {/* Event Image */}
      <div className="w-full rounded-xl overflow-hidden shadow-lg">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-96 object-cover"
        />
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm font-medium">
        <div className="flex items-center gap-2 bg-purple-50 p-3 rounded-lg">
          <CalendarDays className="text-purple-600" />
          <span className="text-purple-800">{datePart}</span>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
          <Clock className="text-blue-600" />
          <span className="text-blue-800">{timePart} IST</span>
        </div>
        <div className="flex items-center gap-2 bg-pink-50 p-3 rounded-lg">
          <MapPin className="text-pink-600" />
          <span className="text-pink-800">{event.location}</span>
        </div>
      </div>

      {/* Description */}
      <section>
        <h2 className="text-2xl font-semibold text-pink-600 mb-3">
          Event Overview
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {event.longDescription || event.description}
        </p>
      </section>

      {/* VIPs & Companies side-by-side */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* VIP Guests */}
        {event.vip?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-purple-600 mb-2">
              VIP Guests 🎤
            </h2>
            <ul className="space-y-2 text-gray-800 list-disc list-inside">
              {event.vip.map((guest, index) => (
                <li key={index}>{guest}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Companies */}
        {event.companies?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              Participating Companies 🏢
            </h2>
            <div className="flex flex-wrap gap-3">
              {event.companies.map((company, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm shadow"
                >
                  {company}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Workshops */}
      {event.workshops?.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-green-600 mb-2">Workshops 🛠</h2>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            {event.workshops.map((ws, index) => (
              <li key={index}>{ws}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Price & Register */}
      <div className="mt-10 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold inline-flex items-center gap-1 shadow">
          <IndianRupee className="w-5 h-5" />
          <span className="text-xl">{event.price}</span>
        </div>
        <button 
          onClick={handleRegistration}
          className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition">
          {loading ? "Paying..." : "Register Now"}
        </button>
      </div>
    </div>
  );
};

export default EventDescription;
