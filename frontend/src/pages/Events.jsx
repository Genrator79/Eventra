import { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { eventsAPI } from "../config/api";


const Events = () => {
  const [events, setEvents] =useState([]);
  const navigate = useNavigate();
  const didRun = useRef(false);
  
  useEffect(()=>{
    if (didRun.current) return;
    didRun.current = true;

    const fetchEvents = async()=>{
      const token = localStorage.getItem("token");
      if(!token){
        navigate("/login");
        return toast.error("Unauthorized user. Please login first.",{ duration: 3000 });
      }

      try{
        const response = await eventsAPI.getAllEvents(token);
        
        if(response.status === 401){
          localStorage.removeItem("token");
          toast.warning("Session expired. Please login again.",{ duration: 4000 });
          navigate("/login");
          return;
        }

        if(response.ok){
          // Using original backend response format
          setEvents(response.data.events || []);
          toast.success("Events loaded successfully!",{ duration: 400 });
        }
        else{
          toast.error(response.data.message || "Failed to load events",{ duration: 4000 });
        }
      }
      catch(err){
        console.error(err);
        toast.warning("Error fetching events",{ duration: 4000 });
      }
    }
    fetchEvents();
  },[]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            All Events
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Explore our complete collection of events and find something amazing to attend
          </p>
        </div>
      </div>

      {/* Events Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {events.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {events.length} Events Found
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Discover amazing events happening around you
                </p>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Filter
                </button>
                <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Sort
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="transform transition-all duration-500 hover:scale-105"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Card event={event} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-6xl">📅</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-4">No Events Available</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
              There are no events available at the moment. Check back later for new events!
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="btn-primary"
            >
              Go to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events