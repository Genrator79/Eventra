import { Calendar, MapPin, Users, IndianRupee, Star, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${event._id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 border border-gray-100 dark:border-gray-700 flex flex-col justify-between hover:scale-[1.03] hover:-translate-y-2"
    >
      {/* Image & Badge */}
      <div className="relative overflow-hidden h-56">
        {event.isFeatured && (
          <div className="absolute top-4 left-4 z-20">
            <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </div>
          </div>
        )}

        <img
          onClick={handleClick}
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow">
        <div className="mb-4">
          <h2 
            onClick={handleClick}
            className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300"
          >
            {event.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span className="font-medium">{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-pink-500" />
              <span className="font-medium">{formatTime(event.date)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="truncate">{event.location}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Users className="w-4 h-4 text-blue-500" />
              <span>{event.capacity} seats</span>
            </div>
            <div className="flex items-center gap-1 text-green-600 font-bold">
              <IndianRupee className="w-4 h-4" />
              <span>₹{event.price}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Register CTA Footer */}
      <div className="p-6 pt-0">
        <button 
          onClick={handleClick}
          className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white text-center py-3 rounded-xl font-semibold tracking-wide hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group flex items-center justify-center gap-2"
        >
          <span>Register Now</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default EventCard;
