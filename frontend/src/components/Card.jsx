import { Calendar, MapPin, Users, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-white shadow-xl rounded-xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] cursor-pointer transition-transform duration-300 border border-pink-100"
    >
      {/* Event Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Event Info */}
      <div className="p-5">
        {/* Title */}
        <h2 className="text-2xl font-bold text-purple-700 mb-2 line-clamp-2">
          {event.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">
          {event.description}
        </p>

        {/* Info Tags */}
        <div className="space-y-2 text-sm text-gray-700">
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

        {/* CTA Button */}
        <div className="mt-6 flex justify-end">
          <button className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-5 py-2 rounded-md font-semibold hover:scale-105 transition">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
