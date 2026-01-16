const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper to create JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, phone: user.phone, points: user.points || 0 },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// REGISTER
exports.registerUser = async (req, res) => {
  const { phone, password, role, name } = req.body;

  if (!phone || !password || !role) {
    return res.status(400).json({ message: "Phone, password, and role are required" });
  }

  try {
    // Check for existing phone
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "Phone number already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      phone,
      password: hashedPassword,
      role,
      name: role !== "collector" ? name : undefined,
    });

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.status(400).json({ message: "Phone and password are required" });
  }

  try {
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      token: generateToken(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
