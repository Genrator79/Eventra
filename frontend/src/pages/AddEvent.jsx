import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { eventsAPI } from "../config/api";

const AddEventForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const didRun = useRef(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    price: "",
    capacity: "",
    imageUrl: "",
    categoryId: "",
    category: "",
    vips: "",
    workshops: "",
    companies: "",
    isFeatured: false,
  });

  useEffect(()=>{
    if(didRun.current) return;
    didRun.current = true;

    const token = localStorage.getItem("token");

    if(!token){
      toast.error("Unauthorized user. Please login first.");
      navigate("/login");
      return;
    }

    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user);

    if(!user || user.role !=="admin"){
      toast.error("Only admins are allowed.");
      navigate("/", {replace : true});
      return;
    }
  },[navigate])
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitted Data:", formData);

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return toast.error("Unauthorized user. Please login first.", {
        duration: 3000,
      });
    }
    try {
      const response = await eventsAPI.addEvent(formData, token);

      if (!response.ok) {
        return toast.error(response.data.message || "Failed to add event");
      }

      toast.success("Event added successfully!",{duration:3000});

      setFormData({
      title: "",
      description: "",
      date: "",
      location: "",
      price: "",
      capacity: "",
      imageUrl: "",
      categoryId: "",
      category: "",
      vips: "",
      workshops: "",
      companies: "",
      isFeatured: false,
    });
    } catch (err) {
        toast.error("Error adding Event!!!")
    }
    finally{
        setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 via-pink-200 to-orange-100 py-12 px-6 flex items-center justify-center">
      <div className="bg-[#FFF1F2] shadow-xl rounded-3xl p-10 w-full max-w-5xl">
        <h2 className="text-3xl md:text-3xl font-bold text-center text-purple-700 mb-8">
          Add New Event
        </h2>

        <form 
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-8"
        >
          {/* Left Column */}
          <div className="space-y-6">
            <Input
              name="title"
              label="Title"
              type="text"
              placeholder="Event Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <Input
              name="description"
              label="Description"
              type="text"
              placeholder="Brief description of the event"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <Input
              name="date"
              label="Date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <Input
              name="location"
              label="Location"
              type="text"
              placeholder="Event Location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <Input
              name="price"
              label="Price"
              type="number"
              placeholder="0 or more"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <Input
              name="capacity"
              label="Capacity"
              type="number"
              placeholder="Number of participants"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Input
              name="imageUrl"
              label="Image URL"
              type="text"
              placeholder="Paste image link"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
            <Input
              name="categoryId"
              label="Category ID"
              type="number"
              placeholder="E.g. 1, 2, 3..."
              value={formData.categoryId}
              onChange={handleChange}
              required
            />
            <Input
              name="category"
              label="Category"
              type="text"
              placeholder="E.g. Tech, Music, Business"
              value={formData.category}
              onChange={handleChange}
              required
            />
            <Input
              name="vips"
              label="VIPs"
              type="text"
              placeholder="E.g. Elon Musk, Sundar Pichai (comma separated)"
              value={formData.vips}
              onChange={handleChange}
            />
            <Input
              name="workshops"
              label="Workshops"
              type="text"
              placeholder="E.g. AI Bootcamp, Startup Talk (comma separated)"
              value={formData.workshops}
              onChange={handleChange}
            />
            <Input
              name="companies"
              label="Companies"
              type="text"
              placeholder="E.g. Google, Amazon (comma separated)"
              value={formData.companies}
              onChange={handleChange}
            />

            {/* isfeatured */}
            <div className="flex items-center space-x-3 pt-2">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-5 h-5 text-purple-600 focus:ring-purple-500 rounded-lg"
              />
              <label
                htmlFor="isFeatured"
                className="text-purple-700 font-medium"
              >
                Mark as Featured Event
              </label>
            </div>
          </div>
                  <div className="mt-10 flex justify-center">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition duration-200"
          >
            {loading ? "Adding..." : "Add Event"}
          </button>
        </div>
        </form>

      </div>
    </div>
  );
};

const Input = ({ label, type = "text", placeholder, name, onChange, value, required}) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 text-lg font-medium text-purple-700">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      className="border border-purple-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-[#FFF8E9] text-gray-800"
    />
  </div>
);

export default AddEventForm;
