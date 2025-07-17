const Event = require("../models/Event");

// Controller to get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();  // fetch all events

    res.status(200).json({
      success: true,
      events,
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

    const newEvent = new Event(eventData);
    const savedEvent = await newEvent.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event: savedEvent,
    });
  } catch (err) {
    console.error("Error saving event:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating the event",
    });
  }
};

module.exports = {
  getAllEvents,
  addEvent
};
