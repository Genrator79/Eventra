import { useEffect, useState } from "react";
import Card from "../components/Card";
import LoadingSpinner, { CardSkeleton } from "../components/LoadingSpinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { eventsAPI } from "../config/api";
import { Filter, X } from "lucide-react";

const CATEGORIES = ['Technology', 'Music', 'Business', 'Sports', 'Art', 'Food', 'Education', 'Health', 'Entertainment'];

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";

  useEffect(() => {
    const fetchEvents = async () => {
      // Need to verify auth if backend requires it, otherwise this check might block public browsing?
      // Re-adding auth check based on previous file content, assuming it's required.
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return toast.error("Unauthorized user. Please login first.", { duration: 3000 });
      }

      try {
        setLoading(true);
        // Build params object dynamically
        const params = {};
        if (searchQuery) params.search = searchQuery;
        if (categoryQuery) params.category = categoryQuery;

        const response = await eventsAPI.getAllEvents(params);

        setEvents(response.data.events || []);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          toast.warning("Session expired. Please login again.", { duration: 4000 });
          navigate("/login");
          return;
        }
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to load events", { duration: 4000 });
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [searchQuery, categoryQuery, navigate]);

  const handleCategoryChange = (category) => {
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set("category", category);
    } else {
      newParams.delete("category");
    }
    // Keep filter open if selecting? Or close? Let's keep specific behavior simple.
    setSearchParams(newParams);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setSearchParams({});
    setIsFilterOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {categoryQuery ? `${categoryQuery} Events` : (searchQuery ? `Results for "${searchQuery}"` : "All Events")}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {searchQuery
              ? "Browse the events matching your search"
              : "Explore our complete collection of events and find something amazing to attend"}
          </p>
        </div>
      </div>

      {/* Events Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {loading ? "Loading..." : `${events.length} Events Found`}
            </h2>
            <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-300">
              {searchQuery && <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Search: {searchQuery}</span>}
              {categoryQuery && <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full">Category: {categoryQuery}</span>}
            </div>
          </div>

          {/* Filter Controls */}
          <div className="relative">
            <div className="flex items-center gap-3">
              {(searchQuery || categoryQuery) && (
                <button
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-red-500 flex items-center gap-1 text-sm font-medium transition-colors"
                >
                  <X className="w-4 h-4" /> Clear
                </button>
              )}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all ${isFilterOpen ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              >
                <Filter className="w-4 h-4" />
                <span className="font-medium">Filter Category</span>
              </button>
            </div>

            {/* Filter Dropdown */}
            {isFilterOpen && (
              <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">Categories</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => handleCategoryChange("")}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!categoryQuery ? 'bg-purple-50 text-purple-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    All Categories
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${categoryQuery === cat ? 'bg-purple-50 text-purple-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <CardSkeleton count={8} />
        ) : events.length > 0 ? (
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
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Events Found</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              We couldn't find any events matching your current filters. Try changing your search or category.
            </p>
            <button
              onClick={clearFilters}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;