const WasteEntry = require("../models/WasteEntry");

/**
 * CREATE NEW WASTE ENTRY (HOUSEHOLD)
 */
exports.createWaste = async (req, res) => {
  const { type, quantityKg, notes } = req.body;
  const userId = req.user.id;

  if (!type || quantityKg === undefined) {
    return res.status(400).json({
      message: "Type and quantity are required",
    });
  }

  try {
    const waste = await WasteEntry.create({
      userId,
      type,
      quantityKg,
      notes: notes || "",
      status: "pending",
    });

    res.status(201).json({
      message: "Waste entry created successfully",
      waste,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET LOGGED-IN USER WASTE ENTRIES
 */
exports.getMyWaste = async (req, res) => {
  try {
    const entries = await WasteEntry.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(entries || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * DASHBOARD STATS (HOUSEHOLD / COLLECTOR / COMPANY)
 * SAFE, EXTENSIBLE, NO-CRASH
 */
exports.getStats = async (req, res) => {
  try {
    const role = req.user.role;
    const userId = req.user.id;

    // ---- DEFAULT SAFE RESPONSE ----
    const stats = {
      entries: 0,
      pickups: 0,
      weight: 0,
      co2: 0,
      points: req.user.points || 0,
      matches: 0,
    };

    // ---- HOUSEHOLD ----
    if (role === "household") {
      const waste = await WasteEntry.find({ userId });

      stats.entries = waste.length;
      stats.weight = waste.reduce(
        (sum, w) => sum + (w.quantityKg || 0),
        0
      );

      // simple CO₂ estimate (can be improved later)
      stats.co2 = stats.weight * 1.7; // kg CO₂ saved per kg recycled
    }

    // ---- COLLECTOR (placeholder-safe) ----
    if (role === "collector") {
      // Extend later when Pickup model is active
      stats.pickups = 0;
      stats.weight = 0;
      stats.co2 = 0;
    }

    // ---- COMPANY (placeholder-safe) ----
    if (role === "company") {
      // Extend later with matching logic
      stats.matches = 0;
      stats.weight = 0;
      stats.co2 = 0;
    }

    return res.json(stats);
  } catch (err) {
    console.error("Stats error:", err.message);
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};
