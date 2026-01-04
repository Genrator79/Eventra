import Hero from "../components/Hero";
import Card from "../components/Card";
import SerEventCat from "../components/SerEventCat";
import LoadingSpinner, { CardSkeleton } from "../components/LoadingSpinner";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { eventsAPI } from "../config/api";

const Home = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await eventsAPI.getFeaturedEvents();

        // Using original backend response format
        setAllEvents(response.data.events || []);
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to load Featured events, Try Again", {
          duration: 4000,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = allEvents.filter((event) => event.isFeatured === true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <Hero />

      {/* Featured Events Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            Featured Events
          </div>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Discover Amazing Events
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Handpicked events that are trending and worth your time
          </p>
        </div>

        {/* Events Grid */}
        {loading ? (
          <CardSkeleton count={4} />
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredEvents.map((event, index) => (
              <div
                key={index}
                className="transform transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎉</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">No Featured Events Yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Check back soon for amazing events!</p>
            <button
              onClick={() => window.location.href = '/events'}
              className="btn-primary"
            >
              Browse All Events
            </button>
          </div>
        )}
      </section>

      {/* Types of events happening */}
      <SerEventCat />
    </div>
  );
};

export default Home;
