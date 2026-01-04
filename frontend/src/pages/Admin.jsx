import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";
import { eventsAPI, userAPI } from "../config/api";

const COLORS = [
  "#8B5CF6", // violet
  "#EC4899", // pink
  "#3B82F6", // blue
  "#10B981", // green
  "#F59E0B", // amber
  "#EF4444", // red
  "#6366F1", // indigo
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const didRun = useRef(false);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalCategories: 0,
    latestEvents: [],
    featuredEvents: [],
    pendingEvents: [],
  });

  const [users, setUsers] = useState([]);

  const [eventCategoryData, setEventCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (!token) {
      toast.error("Unauthorized user. Please login first.");
      navigate("/login");
      return;
    }

    if (!user || user.role !== "admin") {
      toast.error("Only admins are allowed.");
      navigate("/", { replace: true });
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const [eventsRes] = await Promise.all([
          eventsAPI.getAllEvents(),
        ]);

        const events = eventsRes.data.events || [];

        // Calculate Stats
        const totalEvents = events.length;

        // Extract Categories
        const categories = {};
        events.forEach((event) => {
          const cat = event.category || "Uncategorized";
          categories[cat] = (categories[cat] || 0) + 1;
        });
        const totalCategories = Object.keys(categories).length;

        // Prepare Chart Data: Categories
        const categoryData = Object.keys(categories).map((key) => ({
          name: key,
          value: categories[key],
        }));

        // Prepare Chart Data: Monthly Trends
        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];
        const monthlyCounts = new Array(12).fill(0);

        events.forEach((event) => {
          const date = new Date(event.date);
          if (!isNaN(date)) {
            monthlyCounts[date.getMonth()]++;
          }
        });

        const monthTrendData = months.map((month, index) => ({
          month,
          events: monthlyCounts[index],
        }));

        // Latest & Featured
        // Sort by date descending
        const sortedEvents = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));
        const latestEvents = sortedEvents.slice(0, 5);
        const featuredEvents = events.filter((e) => e.isFeatured).slice(0, 5);

        setStats({
          // totalUsers, // Removed
          totalEvents,
          totalCategories,
          featuredEvents,
          // pendingEvents, // Removed
        });

        setEventCategoryData(categoryData);
        setMonthlyData(monthTrendData);

      } catch (error) {
        console.error("Dashboard fetch error:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleAdd = (e) => {
    navigate("/admin/addevent");
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await eventsAPI.updateEventStatus(id, status);
      toast.success(`Event ${status} successfully!`);
      // Refresh details - logic removed as pending events are gone
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  // handleRoleUpdate removed

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-purple-600 animate-pulse">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECE4F2] via-[#EADCF5] to-[#D7C9E6] p-6 space-y-12">
      <h1 className="text-4xl font-bold text-center text-purple-800">
        Admin Dashboard
      </h1>

      {/* Stat Cards */}
      <div className="w-full bg-gradient-to-br from-[#F5F0FF] via-[#F0E7FF] to-[#E6DBFB] py-8 px-6 rounded-xl shadow-inner">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {/* Total Events */}
          <div className="bg-gradient-to-br from-[#FFE8ED] to-[#FFD5E1] rounded-2xl shadow-md p-6 border-l-[6px] border-rose-400 hover:scale-[1.02] transition-all duration-300">
            <h2 className="text-md font-semibold text-gray-700 mb-2">
              📅 Total Events
            </h2>
            <p className="text-4xl font-extrabold text-rose-600">
              {stats.totalEvents}
            </p>
          </div>

          {/* Total Categories */}
          <div className="bg-gradient-to-br from-[#F3F0FF] to-[#E3D9FF] rounded-2xl shadow-md p-6 border-l-[6px] border-indigo-400 hover:scale-[1.02] transition-all duration-300">
            <h2 className="text-md font-semibold text-gray-700 mb-2">
              🏷️ Total Categories
            </h2>
            <p className="text-4xl font-extrabold text-indigo-600">
              {stats.totalCategories}
            </p>
          </div>

          {/* Add Event */}
          <div
            onClick={handleAdd}
            className="bg-gradient-to-br from-[#E9F5DB] to-[#D0E6A5] rounded-2xl shadow-md p-6 border-l-[6px] border-lime-500 flex flex-col justify-center items-start hover:scale-[1.03] transition-all duration-300 cursor-pointer"
          >
            <h2 className="text-md font-semibold text-gray-700 mb-2">
              ✨ Add New Event
            </h2>
            <p className="text-sm text-lime-700">
              Click here to create a new event
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-gradient-to-br from-[#F4F1FA] via-[#ECE4F5] to-[#E3DAF1] shadow-md rounded-2xl p-6 text-gray-800">
          <h2 className="text-xl font-bold text-center mb-4 tracking-wide text-purple-700">
            Events by Category
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={eventCategoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={40}
                dataKey="value"
                label
                stroke="#F4F1FA"
                strokeWidth={2}
              >
                {eventCategoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  border: "1px solid #D6BCFA",
                  color: "#333",
                }}
                labelStyle={{ color: "#6B46C1", fontWeight: 600 }}
                itemStyle={{ color: "#4C1D95" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-gradient-to-br from-[#F7F4FC] via-[#EFE7FB] to-[#E3DAF5] shadow-lg rounded-2xl p-6 text-gray-800">
          <h2 className="text-xl font-bold text-center mb-4 tracking-wide text-purple-700">
            Monthly Event Trends
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData} barSize={35}>
              <XAxis
                dataKey="month"
                tick={{ fill: "#7C3AED", fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6B7280", fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background:
                    "linear-gradient(to bottom right, #F3E8FF, #EDE9FE)",
                  border: "none",
                  borderRadius: "1rem",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                  color: "#4B5563",
                  padding: "12px 16px",
                }}
                labelStyle={{
                  color: "#7C3AED",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
                itemStyle={{ color: "#6D28D9", fontWeight: 500 }}
                cursor={{ fill: "rgba(167,139,250,0.1)", radius: 10 }}
              />
              <Bar
                dataKey="events"
                fill="#A78BFA"
                radius={[12, 12, 0, 0]} // more rounded top
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Featured Events */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-8">
        <h2 className="text-xl font-semibold text-purple-800 mb-4">
          Featured Events
        </h2>
        {stats.featuredEvents?.length > 0 ? (
          <ul className="space-y-2">
            {stats.featuredEvents.map((event) => (
              <li
                key={event._id}
                className="p-3 bg-gradient-to-r from-purple-200 to-purple-100 rounded-md shadow flex justify-between"
              >
                <div className="font-medium text-purple-900 line-clamp-1">{event.title}</div>
                <div className="text-sm text-purple-700 whitespace-nowrap ml-2">
                  {new Date(event.date).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-4">No featured events.</p>
        )}
      </div>

      {/* Logout Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            toast.success("Logged out successfully!", { duration: 800 });
            setTimeout(() => navigate("/login"), 500);
          }}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
