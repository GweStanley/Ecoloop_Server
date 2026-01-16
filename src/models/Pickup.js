const mongoose = require("mongoose");

const pickupSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    wasteId: { type: mongoose.Schema.Types.ObjectId, ref: "WasteEntry", required: true },
    scheduledDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "collected", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pickup", pickupSchema);
