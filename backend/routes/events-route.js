const express = require("express")
const {getAllEvents, addEvent} = require("../controllers/event-controllers");
const authMiddleware = require("../middleware/auth-middleware")
const router = express.Router();


router.get("/events", authMiddleware, getAllEvents);
router.get("/events/featured",getAllEvents);
router.post("/events/add", addEvent);

module.exports = router