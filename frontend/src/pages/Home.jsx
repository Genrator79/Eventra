import Hero from "../components/Hero";
import Card from "../components/Card";
import SerEventCat from "../components/SerEventCat";
const Home = () => {
  const AllEvents = [
    {
      id: 1,
      title: "React Conference 2024",
      description:
        "Join the largest React conference with industry leaders sharing the latest in React development, best practices, and future roadmap.",
      date: "2024-12-20 09:00:00",
      location: "San Francisco, CA",
      price: 299.99,
      capacity: 500,
      imageUrl:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
      isFeatured: true,
      categoryId: 1,
      category: "Technology",
    },
    {
      id: 2,
      title: "AI & Machine Learning Summit",
      description:
        "Explore the cutting-edge developments in AI and ML with hands-on workshops and expert presentations from tech giants.",
      date: "2024-12-25 10:00:00",
      location: "Seattle, WA",
      price: 449.99,
      capacity: 300,
      imageUrl:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
      isFeatured: true,
      categoryId: 1,
      category: "Technology",
    },
    {
      id: 3,
      title: "Startup Pitch Night",
      description:
        "Watch innovative startups pitch their ideas to investors and network with entrepreneurs and VCs.",
      date: "2024-12-15 18:00:00",
      location: "Austin, TX",
      price: 25.0,
      capacity: 200,
      imageUrl:
        "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=400&fit=crop",
      categoryId: 3,
      category: "Business",
    },
    {
      id: 4,
      title: "Jazz Festival Downtown",
      description:
        "Experience the best jazz musicians from around the world in an intimate downtown setting.",
      date: "2024-12-22 19:00:00",
      location: "New Orleans, LA",
      price: 75.0,
      capacity: 800,
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
      isFeatured: true,
      categoryId: 2,
      category: "Music",
    },
    {
      id: 5,
      title: "Electronic Music Festival",
      description:
        "Dance the night away with top DJs and electronic music artists from across the globe.",
      date: "2024-12-30 20:00:00",
      location: "Miami, FL",
      price: 125.0,
      capacity: 1000,
      imageUrl:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=400&fit=crop",
      isFeatured: true,
      categoryId: 2,
      category: "Music",
    },
    {
      id: 6,
      title: "Marathon Training Workshop",
      description:
        "Learn proper running techniques, nutrition, and training strategies from professional marathon coaches.",
      date: "2024-12-18 07:00:00",
      location: "Central Park, NY",
      price: 45.0,
      capacity: 50,
      imageUrl:
        "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=400&fit=crop",
      categoryId: 4,
      category: "Sports",
    },
    {
      id: 7,
      title: "Yoga & Wellness Retreat",
      description:
        "Rejuvenate your mind and body with expert yoga instructors and wellness practitioners.",
      date: "2024-12-28 08:00:00",
      location: "Sedona, AZ",
      price: 199.99,
      capacity: 75,
      imageUrl:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop",
      categoryId: 4,
      category: "Sports",
    },
    {
      id: 8,
      title: "Modern Art Exhibition",
      description:
        "Discover contemporary art pieces from emerging and established artists in a curated gallery experience.",
      date: "2024-12-16 14:00:00",
      location: "Chelsea, NY",
      price: 35.0,
      capacity: 150,
      imageUrl:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=400&fit=crop",
      categoryId: 5,
      category: "Art",
    },
    {
      id: 9,
      title: "Digital Art Workshop",
      description:
        "Learn digital painting and illustration techniques using industry-standard software and tools.",
      date: "2024-12-21 10:00:00",
      location: "Portland, OR",
      price: 89.99,
      capacity: 30,
      imageUrl:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=400&fit=crop",
      categoryId: 5,
      category: "Art",
    },
    {
      id: 10,
      title: "Wine Tasting Evening",
      description:
        "Sample exquisite wines from renowned vineyards paired with gourmet appetizers and expert sommelier guidance.",
      date: "2024-12-19 17:00:00",
      location: "Napa Valley, CA",
      price: 125.0,
      capacity: 60,
      imageUrl:
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=400&fit=crop",
      categoryId: 6,
      category: "Food",
    },
    {
      id: 11,
      title: "Culinary Masterclass",
      description:
        "Master the art of French cuisine with Michelin-starred chefs in this hands-on cooking experience.",
      date: "2024-12-23 11:00:00",
      location: "Chicago, IL",
      price: 189.99,
      capacity: 25,
      imageUrl:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop",
      isFeatured: true,
      categoryId: 6,
      category: "Food",
    },
    {
      id: 12,
      title: "Blockchain & Cryptocurrency Forum",
      description:
        "Deep dive into blockchain technology, DeFi, and cryptocurrency trends with industry experts.",
      date: "2024-12-27 09:00:00",
      location: "Las Vegas, NV",
      price: 349.99,
      capacity: 400,
      imageUrl:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop",
      isFeatured: true,
      categoryId: 1,
      category: "Technology",
    },
    {
      id: 13,
      title: "Rock Concert Spectacular",
      description:
        "Experience legendary rock bands live in concert with spectacular light shows and sound production.",
      date: "2024-12-31 21:00:00",
      location: "Los Angeles, CA",
      price: 89.99,
      capacity: 1200,
      imageUrl:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&h=400&fit=crop",
      isFeatured: true,
      categoryId: 2,
      category: "Music",
    },
    {
      id: 14,
      title: "Leadership Summit",
      description:
        "Develop your leadership skills with workshops, keynotes, and networking opportunities with C-suite executives.",
      date: "2024-12-24 08:00:00",
      location: "Boston, MA",
      price: 275.0,
      capacity: 250,
      imageUrl:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
      categoryId: 3,
      category: "Business",
    },
    {
      id: 15,
      title: "Basketball Tournament",
      description:
        "Compete in or watch exciting basketball games with teams from across the region.",
      date: "2024-12-26 10:00:00",
      location: "Denver, CO",
      price: 15.0,
      capacity: 500,
      imageUrl:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=400&fit=crop",
      categoryId: 4,
      category: "Sports",
    },
    {
      id: 16,
      title: "Photography Workshop",
      description:
        "Learn advanced photography techniques including composition, lighting, and post-processing from professional photographers.",
      date: "2024-12-17 13:00:00",
      location: "Nashville, TN",
      price: 79.99,
      capacity: 40,
      imageUrl:
        "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=400&fit=crop",
      categoryId: 5,
      category: "Art",
    },
    {
      id: 17,
      title: "Street Food Festival",
      description:
        "Taste authentic street food from around the world with over 50 vendors and live cooking demonstrations.",
      date: "2024-12-29 12:00:00",
      location: "Phoenix, AZ",
      price: 20.0,
      capacity: 2000,
      imageUrl:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop",
      categoryId: 6,
      category: "Food",
    },
    {
      id: 18,
      title: "Cloud Computing Conference",
      description:
        "Stay ahead of cloud technology trends with sessions on AWS, Azure, and Google Cloud platforms.",
      date: "2025-01-03 09:00:00",
      location: "Dallas, TX",
      price: 399.99,
      capacity: 350,
      imageUrl:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
      categoryId: 1,
      category: "Technology",
    },
    {
      id: 19,
      title: "Classical Music Gala",
      description:
        "Enjoy an elegant evening of classical music performed by renowned symphony orchestras and soloists.",
      date: "2025-01-05 19:30:00",
      location: "Philadelphia, PA",
      price: 95.0,
      capacity: 600,
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
      categoryId: 2,
      category: "Music",
    },
    {
      id: 20,
      title: "Innovation Workshop",
      description:
        "Participate in design thinking workshops and learn innovation methodologies used by top tech companies.",
      date: "2025-01-08 10:00:00",
      location: "San Diego, CA",
      price: 149.99,
      capacity: 80,
      imageUrl:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
      categoryId: 3,
      category: "Business",
    },
  ];
  const filteredEvents = AllEvents.filter((event) => event.isFeatured === true);

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
