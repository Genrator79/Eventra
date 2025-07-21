import Hero from "../components/Hero";
import Card from "../components/Card";
import SerEventCat from "../components/SerEventCat";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const Home = () => {
  const [allEvents, setAllEvents] = useState([]);
  const didRun = useRef(false);

  useEffect(() => {
    if(didRun.current) return; 
    didRun.current=true;
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://eventra-backend-lsy8.onrender.com/api/events/featured");

        const data = await res.json();

        if (res.ok) {
          setAllEvents(data.events);
        } else {
          toast.error("Failed to load Featured events, Try Again", {
            duration: 4000,
          });
        }
      } catch (err) {
        console.error(err);
        toast.warning("Error fetching events", { duration: 4000 });
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = allEvents.filter((event) => event.isFeatured === true);

  return (
    <div className="bg-gradient-to-r from-purple-300 via-pink-200 to-orange-100">
      <Hero />
      
      {/* Section for event cards */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
          Featured Events
        </h2>

        {/* Scrollable Card Container */}
        <div className="overflow-x-auto overflow-y-hidden py-9 px-4">
          <div className="flex space-x-6 scroll-smooth">
            {filteredEvents.map((event, index) => (
              <div
                key={index}
                className="w-[320px] h-full pb-1 flex-shrink-0 bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <Card event={event} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of events happening */}
      <SerEventCat />
    </div>
  );
};

export default Home;
