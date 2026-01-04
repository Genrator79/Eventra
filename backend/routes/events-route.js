const express = require("express")
const {
    getAllEvents,
    getEventById,
    addEvent,
    updateEvent,
    deleteEvent,
    registerForEvent
} = require("../controllers/event-controllers");
const authMiddleware = require("../middleware/auth-middleware")
const router = express.Router();

// Public routes (no authentication required)
router.get("/events/featured", getAllEvents); // Get featured events
router.get("/events/:id", getEventById); // Get single event by ID

// Protected routes (authentication required)
router.get("/events", authMiddleware, getAllEvents); // Get all events with pagination
router.post("/events/add", authMiddleware, addEvent); // Add new event
router.put("/events/:id", authMiddleware, updateEvent); // Update event
router.delete("/events/:id", authMiddleware, deleteEvent); // Delete event
router.post("/events/:id/register", authMiddleware, registerForEvent); // Register for event

module.exports = router;