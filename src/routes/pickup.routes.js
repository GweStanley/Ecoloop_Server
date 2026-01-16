const express = require("express");
const router = express.Router();

const {
  createPickup,
  getPickups,
} = require("../controllers/pickup.controller");

// ✅ FIX: use named export
const { protect } = require("../middlewares/auth.middleware");

// Schedule a pickup
router.post("/create", protect, createPickup);

// Get all pickups for logged-in user
router.get("/", protect, getPickups);

module.exports = router;
