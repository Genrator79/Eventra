import { useParams } from "react-router-dom";
import { CalendarDays, Clock, MapPin, Users, IndianRupee } from "lucide-react";

const EventDescription = () => {
  const { id } = useParams();
  const sampleEvents = [
    {
      id: 1,
      title: "React Conference 2024",
      description:
        "An immersive experience for React developers covering core concepts, future roadmap, and real-world applications through keynotes and interactive sessions. This event offers unparalleled access to experts and deep learning opportunities through workshops and networking with leading companies.",
      date: "2024-12-20 09:00:00",
      location: "San Francisco, CA",
      price: 299.99,
      capacity: 500,
      imageUrl:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
      featured: true,
      categoryId: 1,
      category: "Technology",
      vip: ["Dan Abramov", "Sophie Alpert", "Kent C. Dodds"],
      workshops: ["Performance Optimization Lab", "Live Case Study Challenge"],
      companies: ["Amazon", "Salesforce", "OpenAI"],
    },
    {
      id: 2,
      title: "AI & Machine Learning Summit",
      description:
        "Dive deep into the world of AI with hands-on workshops and industry insights from leaders in machine learning. Discover the latest trends, models, and frameworks powering the future of intelligent applications.",
      date: "2024-12-25 10:00:00",
      location: "Seattle, WA",
      price: 449.99,
      capacity: 300,
      imageUrl:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
      featured: true,
      categoryId: 1,
      category: "Technology",
      vip: ["Andrew Ng", "Fei-Fei Li", "Yann LeCun"],
      workshops: ["Build a Chatbot", "Deploying ML Models at Scale"],
      companies: ["Google AI", "Meta", "Hugging Face"],
    },
    {
      id: 3,
      title: "Startup Pitch Night",
      description:
        "Join a thrilling evening where ambitious founders present their groundbreaking startups to a panel of investors. Expect high energy pitches, startup stories, and potential unicorns in the making.",
      date: "2024-12-15 18:00:00",
      location: "Austin, TX",
      price: 25.0,
      capacity: 200,
      imageUrl:
        "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=400&fit=crop",
      featured: false,
      categoryId: 3,
      category: "Business",
      vip: ["Paul Graham", "Naval Ravikant", "Elizabeth Yin"],
      workshops: ["Crafting a Killer Pitch", "Startup Fundraising 101"],
      companies: ["Y Combinator", "Sequoia Capital", "AngelList"],
    },
    {
      id: 4,
      title: "Jazz Festival Downtown",
      description:
        "Celebrate jazz in all its glory with performances from global legends and emerging talents. Soak in the rhythms and join musical workshops led by virtuosos.",
      date: "2024-12-22 19:00:00",
      location: "New Orleans, LA",
      price: 75.0,
      capacity: 800,
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
      featured: true,
      categoryId: 2,
      category: "Music",
      vip: ["Herbie Hancock", "Esperanza Spalding", "Wynton Marsalis"],
      workshops: ["Improvisation Techniques", "Jazz Composition"],
      companies: [
        "Blue Note Records",
        "Verve Music Group",
        "Jazz at Lincoln Center",
      ],
    },
    {
      id: 5,
      title: "Electronic Music Festival",
      description:
        "A night of pulsating beats and high-octane energy featuring top global DJs and immersive visual experiences. Get ready to dance till dawn!",
      date: "2024-12-30 20:00:00",
      location: "Miami, FL",
      price: 125.0,
      capacity: 1000,
      imageUrl:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=400&fit=crop",
      featured: false,
      categoryId: 2,
      category: "Music",
      vip: ["David Guetta", "Charlotte de Witte", "Armin van Buuren"],
      workshops: ["DJ Mixing Basics", "Live EDM Production"],
      companies: ["Ultra Records", "Spinnin' Records", "Beatport"],
    },
    {
      id: 6,
      title: "Marathon Training Workshop",
      description:
        "Prepare like a pro with our comprehensive training event. From injury prevention to meal planning, everything you need to run your best race.",
      date: "2024-12-18 07:00:00",
      location: "Central Park, NY",
      price: 45.0,
      capacity: 50,
      imageUrl:
        "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=400&fit=crop",
      featured: false,
      categoryId: 4,
      category: "Sports",
      vip: ["Eliud Kipchoge", "Desiree Linden", "Meb Keflezighi"],
      workshops: [
        "Strength Training for Runners",
        "Nutrition Planning for Endurance",
      ],
      companies: ["Nike Running", "Strava", "Brooks"],
    },
    {
      id: 7,
      title: "Yoga & Wellness Retreat",
      description:
        "Unplug and reconnect with nature and yourself at our rejuvenating retreat. Enjoy yoga sessions, mindfulness workshops, and holistic healing.",
      date: "2024-12-28 08:00:00",
      location: "Sedona, AZ",
      price: 199.99,
      capacity: 75,
      imageUrl:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop",
      featured: false,
      categoryId: 4,
      category: "Sports",
      vip: ["Adriene Mishler", "Sadhguru", "Rachel Brathen"],
      workshops: ["Power Vinyasa Flow", "Breathwork and Sound Healing"],
      companies: ["Lululemon", "Gaiam", "Calm"],
    },
    {
      id: 8,
      title: "Modern Art Exhibition",
      description:
        "Explore bold, thought-provoking contemporary art from around the globe. Guided tours and creative sessions with artists included.",
      date: "2024-12-16 14:00:00",
      location: "Chelsea, NY",
      price: 35.0,
      capacity: 150,
      imageUrl:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=400&fit=crop",
      featured: false,
      categoryId: 5,
      category: "Art",
      vip: ["Banksy", "Ai Weiwei", "Yayoi Kusama"],
      workshops: ["Mixed Media Collage", "Contemporary Art Narratives"],
      companies: ["MoMA", "Tate Modern", "LACMA"],
    },
    {
      id: 9,
      title: "Digital Art Workshop",
      description:
        "Master the digital canvas with guided workshops on illustration, character design, and digital painting using professional tools.",
      date: "2024-12-21 10:00:00",
      location: "Portland, OR",
      price: 89.99,
      capacity: 30,
      imageUrl:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=400&fit=crop",
      featured: false,
      categoryId: 5,
      category: "Art",
      vip: ["Loish", "Aaron Blaise", "Ross Tran"],
      workshops: [
        "Character Design in Procreate",
        "Lighting and Rendering Basics",
      ],
      companies: ["Adobe", "Wacom", "ArtStation"],
    },
    {
      id: 10,
      title: "Wine Tasting Evening",
      description:
        "A refined evening with curated wine selections from top vineyards, expert-led tastings, and gourmet pairings in a serene setting.",
      date: "2024-12-19 17:00:00",
      location: "Napa Valley, CA",
      price: 125.0,
      capacity: 60,
      imageUrl:
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=400&fit=crop",
      featured: false,
      categoryId: 6,
      category: "Food",
      vip: ["Gary Vaynerchuk", "Jancis Robinson", "Raj Parr"],
      workshops: ["Wine & Cheese Pairing", "Understanding Tannins and Terroir"],
      companies: ["Robert Mondavi Winery", "E&J Gallo", "Wine Spectator"],
    },
  ];
  const event = sampleEvents.find((e) => e.id === Number(id));

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
        <button className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition">
          Register Now
        </button>
      </div>
    </div>
  );
};

export default EventDescription;
