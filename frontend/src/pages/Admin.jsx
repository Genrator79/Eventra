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
import {toast} from "sonner"

const COLORS = [
  "#8B5CF6", // violet
  "#EC4899", // pink
  "#3B82F6", // blue
  "#10B981", // green
  "#F59E0B", // amber
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleAdd = (e) => {
    navigate("/admin/addevent");
  };

  const stats = {
    totalUsers: 120,
    totalEvents: 45,
    totalCategories: 6,
    latestEvents: [
      { id: 1, title: "React Summit", date: "2025-07-21" },
      { id: 2, title: "Tech Carnival", date: "2025-07-25" },
      { id: 3, title: "Startup Expo", date: "2025-07-27" },
      { id: 4, title: "AI Conference", date: "2025-08-01" },
      { id: 5, title: "Music Mania", date: "2025-08-05" },
    ],
    featuredEvents: [
      { id: 101, title: "Mega Concert", date: "2025-08-15" },
      { id: 102, title: "Design Workshop", date: "2025-08-18" },
    ],
  };

  const eventCategoryData = [
    { name: "Tech", value: 12 },
    { name: "Music", value: 8 },
    { name: "Business", value: 10 },
    { name: "Education", value: 7 },
    { name: "Other", value: 8 },
  ];

  const monthlyData = [
    { month: "Jan", events: 3 },
    { month: "Feb", events: 6 },
    { month: "Mar", events: 4 },
    { month: "Apr", events: 8 },
    { month: "May", events: 10 },
    { month: "Jun", events: 5 },
    { month: "Jul", events: 9 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECE4F2] via-[#EADCF5] to-[#D7C9E6] p-6 space-y-12">
      <h1 className="text-4xl font-bold text-center text-purple-800">
        Admin Dashboard
      </h1>

      {/* Stat Cards */}
      <div className="w-full bg-gradient-to-br from-[#F5F0FF] via-[#F0E7FF] to-[#E6DBFB] py-8 px-6 rounded-xl shadow-inner">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Total Users */}
          <div className="bg-gradient-to-br from-[#E0F2FF] to-[#CDEBFF] rounded-2xl shadow-md p-6 border-l-[6px] border-sky-500 hover:scale-[1.02] transition-all duration-300">
            <h2 className="text-md font-semibold text-gray-700 mb-2">
              👥 Total Users
            </h2>
            <p className="text-4xl font-extrabold text-sky-700">
              {stats.totalUsers}
            </p>
          </div>

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

      {/* Latest & Featured Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Latest Events */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-xl font-semibold text-purple-800 mb-4">
            Latest Events
          </h2>
          <ul className="space-y-2">
            {stats.latestEvents.map((event) => (
              <li
                key={event.id}
                className="p-3 bg-gray-100 rounded-md shadow-sm flex justify-between"
              >
                <span>{event.title}</span>
                <span className="text-sm text-gray-600">{event.date}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured Events */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-xl font-semibold text-purple-800 mb-4">
            Upcoming Featured Events
          </h2>
          <ul className="space-y-2">
            {stats.featuredEvents.map((event) => (
              <li
                key={event.id}
                className="p-3 bg-gradient-to-r from-purple-200 to-purple-100 rounded-md shadow"
              >
                <div className="font-medium">{event.title}</div>
                <div className="text-sm text-gray-700">{event.date}</div>
              </li>
            ))}
          </ul>
        </div>
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
