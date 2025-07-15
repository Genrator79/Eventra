const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  categoryId: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  vip: {
    type: [String], // Array of VIP names
    default: [],
  },
  workshops: {
    type: [String], // Array of workshop titles
    default: [],
  },
  companies: {
    type: [String], // Array of company names
    default: [],
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
