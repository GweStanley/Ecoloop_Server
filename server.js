const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes
const authRoutes = require("./src/routes/auth.routes");
const wasteRoutes = require("./src/routes/waste.routes");
const pickupRoutes = require("./src/routes/pickup.routes");
const companyRoutes = require("./src/routes/company.routes");

// App init
const app = express();

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ---------- ROUTES ----------
app.use("/api/auth", authRoutes);
app.use("/api/waste", wasteRoutes);
app.use("/api/pickup", pickupRoutes);
app.use("/api/company", companyRoutes);

// ---------- HEALTH CHECK ----------
app.get("/", (req, res) => {
  res.status(200).send("🌱 EcoLoop API running");
});

// ---------- 404 HANDLER (FIXED) ----------
// ❌ DO NOT use app.all("*")
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ---------- ERROR HANDLER ----------
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({
    message: "Internal server error",
  });
});

// ---------- DB + SERVER ----------
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecoloop";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
