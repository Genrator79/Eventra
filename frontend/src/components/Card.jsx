import { Calendar, MapPin, Users, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <div
      className="group bg-white shadow-xl rounded-xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] cursor-pointer transition-transform duration-300 border border-pink-100 flex flex-col justify-between"
    >
      {/* Image & Badge */}
      <div className="relative overflow-hidden">
        {event.isFeatured && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-xl shadow-md z-10">
            Featured
          </div>
        )}

        <img
          onClick={handleClick}
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-grow">
        
        <h2 
          onClick={handleClick}
          className="text-xl font-bold text-purple-700 mb-1 line-clamp-2 hover:text-pink-600"
        >
          {event.title}
        </h2>
        <p className="text-gray-600 mb-3 text-sm line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-1 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-pink-500" />
            <span>{new Date(event.date).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-500" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-500" />
            <span>{event.capacity} seats</span>
          </div>
          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-green-600" />
            <span className="font-semibold">₹{event.price}</span>
          </div>
        </div>
      </div>

      {/* Register CTA Footer */}
      <button 
        onClick={handleClick}
        className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white text-center py-2 text-sm font-semibold tracking-wide hover:brightness-110 transition shadow-inner"
      >
        Register Now
      </button>
    </div>
  );
};

export default EventCard;
