const express = require("express");
const router = express.Router();

// Controller imports
const {
  createWaste,
  getMyWaste,
  getStats,
} = require("../controllers/waste.controller");

// Auth middleware import (named export)
const { protect } = require("../middlewares/auth.middleware");

// ROUTES
// Create new waste entry
router.post("/create", protect, createWaste);

// Get all household waste
router.get("/my", protect, getMyWaste);

// Dashboard stats
router.get("/stats", protect, getStats);

// Export router
module.exports = router;
