import { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const Events = () => {
  const [events, setEvents] =useState([]);
  const navigate = useNavigate();
  const didRun = useRef(false);
  
  useEffect(()=>{
    if (didRun.current) return;
    didRun.current = true;

    const fetchEvents = async()=>{
      const token = localStorage.getItem("token");
      console.log(token);
      if(!token){
        navigate("/login");
        return toast.error("Unauthorized user. Please login first.",{ duration: 3000 });
      }

      try{
        const res = await fetch("http://localhost:9000/api/events",{
          headers : {
            Authorization : `Bearer ${token}`,
          },
        });
        
        if(res.status ===401){
          localStorage.removeItem("token");
          toast.warning("Session expired. Please login again.",{ duration: 4000 });
          navigate("/login");
          return;
        }

        const data = await res.json();

        if(res.ok){
          setEvents(data.events);
          toast.success("Events loaded successfully!",{ duration: 400 });
        }
        else{
          toast.error("Failed to load events",{ duration: 4000 });
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
    <div className="bg-gradient-to-r from-purple-300 via-pink-200 to-orange-100 min-h-screen">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-[#4b2e2e] pt-10 pb-4 italic drop-shadow-sm">
        Discover All Events
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-9 p-7">
        {events.map((event, index) => (
          <Card key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events