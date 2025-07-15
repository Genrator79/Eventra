const express = require("express")
const {getAllEvents} = require("../controllers/event-controllers");
const authMiddleware = require("../middleware/auth-middleware")
const router = express.Router();


router.get("/events", authMiddleware, getAllEvents);

module.exports = router