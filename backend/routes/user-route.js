const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");
const { findMe, editInfo } = require("../controllers/user-controller")

router.get("/me", authMiddleware, findMe)
router.put("/me/update", authMiddleware, editInfo);

module.exports = router;
