const express = require("express");
const BloodRequest = require("../models/BloodRequest");

const router = express.Router();

const bloodGroups = [
  "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
];

router.post("/", async (req, res) => {
  try {
    const {
      name,
      bloodgroup,
      units,
      hospital,
      location,
      contact,
      notes,
    } = req.body;

    const unitCount = Number(units);

    if (
      typeof name !== "string" ||
      typeof bloodgroup !== "string" ||
      typeof hospital !== "string" ||
      typeof location !== "string" ||
      typeof contact !== "string" ||
      !name.trim() ||
      !hospital.trim() ||
      !location.trim() ||
      !bloodGroups.includes(bloodgroup) ||
      !Number.isInteger(unitCount) ||
      unitCount < 1 ||
      unitCount > 100 ||
      !/^\+?[0-9]{10,13}$/.test(contact.trim()) ||
      (notes !== undefined && typeof notes !== "string") ||
      (notes && notes.length > 1000)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid blood request details.",
      });
    }

    const request = await BloodRequest.create({
      name: name.trim(),
      bloodgroup,
      units: unitCount,
      hospital: hospital.trim(),
      location: location.trim(),
      contact: contact.trim(),
      notes: (notes || "").trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Blood request submitted successfully.",
      request: {
        id: request._id,
        bloodgroup: request.bloodgroup,
        units: request.units,
        hospital: request.hospital,
        status: request.status,
      },
    });
  } catch (error) {
    console.error("Blood request error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to submit blood request.",
    });
  }
});

module.exports = router;
