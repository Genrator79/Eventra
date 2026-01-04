const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");
const { findMe, editInfo, getUserRegistrations } = require("../controllers/user-controller")

router.get("/me", authMiddleware, findMe)
router.get("/me/registrations", authMiddleware, getUserRegistrations); // Get user registrations
router.put("/me/update", authMiddleware, editInfo);

module.exports = router;
