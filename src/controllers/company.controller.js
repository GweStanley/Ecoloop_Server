const CompanyWaste = require("../models/CompanyWaste");
const WasteEntry = require("../models/WasteEntry");

/**
 * @desc Company posts waste
 * @route POST /api/company/waste
 */
exports.createCompanyWaste = async (req, res) => {
  const { wasteType, quantityKg, location } = req.body;

  if (!wasteType || !quantityKg || !location) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const waste = await CompanyWaste.create({
      companyId: req.user.id,
      wasteType,
      quantityKg,
      location,
    });

    res.status(201).json({
      message: "Company waste posted",
      waste,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Match company waste with household waste
 * @route GET /api/company/matches
 */
exports.getMatches = async (req, res) => {
  try {
    const matches = await WasteEntry.find({
      type: { $exists: true },
      status: "pending",
    }).limit(20);

    res.json(matches || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
