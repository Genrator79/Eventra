const Event = require("../models/Event");

// Controller to get all events with pagination and filtering
const getAllEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};

    // Filter by category if provided
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Filter by featured if provided (accepts true/false, 1/0)
    if (req.query.featured !== undefined) {
      filter.isFeatured = ['true', '1'].includes(req.query.featured);
    }

    // Search by title if provided
    if (req.query.search) {
      filter.title = { $regex: req.query.search, $options: 'i' };
    }

    // Get events with pagination
    const events = await Event.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Get total count for pagination
    const total = await Event.countDocuments(filter);

    res.status(200).json({
      success: true,
      events, // <-- consistent key
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      },
      message: "Events fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching events",
    });
  }
};

const addEvent = async (req, res) => {
  try {
    const eventData = req.body;

    // Set status to approved by default
    eventData.status = 'approved';
    if (req.user) {
      eventData.createdBy = req.user.id;
    }

    // Input validation
    const requiredFields = [
      'title', 'description', 'date', 'location',
      'price', 'capacity', 'imageUrl', 'category'
    ];

    const missingFields = requiredFields.filter(field =>
      eventData[field] === undefined || eventData[field] === null || eventData[field] === ""
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }

    // Validate date
    const eventDate = new Date(eventData.date);
    if (isNaN(eventDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format",
      });
    }

    // Validate price and capacity
    if (eventData.price < 0) {
      return res.status(400).json({
        success: false,
        message: "Price cannot be negative",
      });
    }

    if (eventData.capacity < 1) {
      return res.status(400).json({
        success: false,
        message: "Capacity must be at least 1",
      });
    }

    const newEvent = new Event(eventData);
    const savedEvent = await newEvent.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event: savedEvent, // <-- consistent key
    });
  } catch (err) {
    console.error("Error saving event:", err);

    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while creating the event",
    });
  }
};

// Controller to get a single event by ID
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      event, // <-- consistent key
      message: "Event fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching event",
    });
  }
};

// Controller to update an event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }

    const event = await Event.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      event, // <-- consistent key
      message: "Event updated successfully",
    });
  } catch (error) {
    console.error("Error updating event:", error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while updating event",
    });
  }
};

// Controller to delete an event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while deleting event",
    });
  }
};

const Registration = require("../models/Registration");

// ... existing code ...

const registerForEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userInfo.userId;

    // Check if event exists
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // Check if already registered
    const existingRegistration = await Registration.findOne({
      user: userId,
      event: id,
    });

    if (existingRegistration) {
      return res.status(400).json({ success: false, message: "You are already registered for this event" });
    }

    // Create registration
    const registration = await Registration.create({
      user: userId,
      event: id,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      registration,
    });
  } catch (error) {
    console.error("Error registering for event:", error);
    res.status(500).json({
      success: false,
      message: "Server error while registering",
    });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  addEvent,
  updateEvent,
  deleteEvent,
  registerForEvent
};
