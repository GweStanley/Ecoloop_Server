const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: function() { return this.role !== "collector"; } },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["household", "collector", "company"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
