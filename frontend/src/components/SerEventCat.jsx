import {
  FaPaintBrush,
  FaBriefcase,
  FaUtensils,
  FaMusic,
  FaDumbbell,
  FaLaptop,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const categories = [
  { label: "Art", icon: <FaPaintBrush />, color: "bg-red-100 text-red-500" },
  { label: "Business", icon: <FaBriefcase />, color: "bg-yellow-100 text-yellow-500" },
  { label: "Food", icon: <FaUtensils />, color: "bg-orange-100 text-orange-500" },
  { label: "Music", icon: <FaMusic />, color: "bg-purple-100 text-purple-500" },
  { label: "Sports", icon: <FaDumbbell />, color: "bg-green-100 text-green-500" },
  { label: "Technology", icon: <FaLaptop />, color: "bg-blue-100 text-blue-500" },
];

const stats = [
  { number: "20", label: "Events" },
  { number: "500+", label: "Attendees" },
  { number: "6", label: "Categories" },
  { number: "50+", label: "Organizers" },
];

const CategoriesSection = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/events/category/${category.toLowerCase()}`);
  };

  return (
    <section className="py-14 bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100">
      {/* Title */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl font-extrabold text-purple-700 mb-2">Explore Categories</h2>
        <p className="text-gray-600 max-w-xl mx-auto text-base">
          Find events that match your interests from our diverse categories
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 px-6 md:px-16">
        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => handleClick(cat.label)}
            className="cursor-pointer group flex flex-col items-center justify-center bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-transform hover:-translate-y-1"
          >
            <div
              className={`text-3xl rounded-full p-4 ${cat.color} mb-2 transition-transform duration-300 ease-in-out group-hover:rotate-12 group-hover:scale-110`}
            >
              {cat.icon}
            </div>
            <h3 className="font-semibold text-gray-700">{cat.label}</h3>
            <span className="text-sm text-gray-500">View events</span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 px-6 md:px-24">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="text-center py-6 rounded-xl bg-gradient-to-tr from-purple-200 via-pink-100 to-orange-100 shadow"
          >
            <p className="text-3xl font-bold text-purple-700">{stat.number}</p>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
