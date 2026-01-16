const Pickup = require("../models/Pickup");

// Create a new pickup
exports.createPickup = async (req, res) => {
  const { wasteId, scheduledDate } = req.body;

  if (!wasteId || !scheduledDate) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const pickup = await Pickup.create({
      userId: req.user.id,
      wasteId,
      scheduledDate,
      status: "pending",
    });

    res.status(201).json({ message: "Pickup scheduled successfully", pickup });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all pickups for the logged-in user
exports.getPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find({ userId: req.user.id })
      .populate("wasteId", "type quantityKg status") // populate waste info
      .sort({ scheduledDate: 1 });

    res.json(pickups || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
