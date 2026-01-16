const mongoose = require("mongoose");

const companyWasteSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    wasteType: {
      type: String,
      required: true,
    },
    quantityKg: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "matched", "collected"],
      default: "open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CompanyWaste", companyWasteSchema);
