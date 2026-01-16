const express = require("express");
const router = express.Router();

const {
  createCompanyWaste,
  getMatches,
} = require("../controllers/company.controller");

const { protect } = require("../middlewares/auth.middleware");

router.post("/waste", protect, createCompanyWaste);
router.get("/matches", protect, getMatches);

module.exports = router;
