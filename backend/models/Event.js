const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000,
  },
  longDescription: {
    type: String,
    required: false, // Optional, enables detailed storytelling
    maxlength: 5000,
  },
  gallery: {
    type: [String], // Array of image URLs
    default: [],
  },
  date: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > new Date();
      },
      message: 'Event date must be in the future'
    }
  },
  location: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 10000,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
    max: 10000,
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
    min: 1,
  },
  category: {
    type: String,
    required: true,
    enum: ['Technology', 'Music', 'Business', 'Sports', 'Art', 'Food', 'Education', 'Health', 'Entertainment'],
    trim: true,
  },
  vip: {
    type: [String], // Array of VIP names
    default: [],
    validate: {
      validator: function (value) {
        return value.length <= 10;
      },
      message: 'Maximum 10 VIPs allowed'
    }
  },
  workshops: {
    type: [String], // Array of workshop titles
    default: [],
    validate: {
      validator: function (value) {
        return value.length <= 5;
      },
      message: 'Maximum 5 workshops allowed'
    }
  },
  companies: {
    type: [String], // Array of company names
    default: [],
    validate: {
      validator: function (value) {
        return value.length <= 10;
      },
      message: 'Maximum 10 companies allowed'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional for seeded data, required for app usage
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add indexes for better query performance
eventSchema.index({ date: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ isFeatured: 1 });
eventSchema.index({ title: 'text', description: 'text' }); // Text search index
eventSchema.index({ createdAt: -1 }); // For sorting by newest

// Virtual for formatted date
eventSchema.virtual('formattedDate').get(function () {
  return this.date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Virtual for remaining capacity (if you add registrations later)
eventSchema.virtual('remainingCapacity').get(function () {
  // This would be calculated based on actual registrations
  return this.capacity;
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
