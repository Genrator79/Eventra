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

module.exports = {
  getAllEvents,
};
