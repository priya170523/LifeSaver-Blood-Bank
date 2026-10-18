const express = require("express");
const Donor = require("../models/Donor");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, age, bloodgroup, phone, city } = req.body;

    if (
      typeof name !== "string" ||
      typeof bloodgroup !== "string" ||
      typeof phone !== "string" ||
      typeof city !== "string" ||
      !name.trim() ||
      !city.trim() ||
      !/^\d{10}$/.test(phone) ||
      !["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(bloodgroup) ||
      !Number.isInteger(Number(age)) ||
      Number(age) < 18 ||
      Number(age) > 65
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid donor details.",
      });
    }

    const donor = await Donor.create({
      name: name.trim(),
      age: Number(age),
      bloodgroup,
      phone,
      city: city.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Donor registered successfully.",
      donor: {
        id: donor._id,
        name: donor.name,
        bloodgroup: donor.bloodgroup,
        city: donor.city,
      },
    });
  } catch (error) {
    console.error("Donor registration error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to register donor. Please try again.",
    });
  }
});

module.exports = router;
