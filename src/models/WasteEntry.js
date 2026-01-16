const mongoose = require("mongoose");

const wasteEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["plastic", "metal", "organic", "paper"],
      required: true,
    },

    quantityKg: {
      type: Number,
      required: true,
      min: 0.1,
    },

    notes: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    photoUrl: {
      type: String,
      default: null, // ✅ NOT REQUIRED ANYMORE
    },

    status: {
      type: String,
      enum: ["pending", "matched", "picked"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WasteEntry", wasteEntrySchema);
