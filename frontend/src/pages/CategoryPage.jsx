import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card"; // assuming you have a reusable Card component
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const didRun =useRef(false);

  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log first", { duration: 800 });
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
  
  // Convert to lowercase for flexible matching
  const filteredEvents = events.filter(
    (event) => event.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="bg-gradient-to-r from-purple-300 via-pink-200 to-orange-100 min-h-screen px-6 py-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-6 text-center capitalize">
        {category} Events
      </h2>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-9">
          {filteredEvents.map((event) => (
            <Card key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">
          No events found for this category.
        </p>
      )}
    </div>
  );
};

export default CategoryPage;
