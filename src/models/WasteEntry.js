const mongoose = require("mongoose");

const wasteEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["plastic", "metal", "organic", "paper"], required: true },
  quantityKg: { type: Number, required: true },
  photoUrl: { type: String, required: true },
  status: { type: String, enum: ["pending", "collected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("WasteEntry", wasteEntrySchema);
