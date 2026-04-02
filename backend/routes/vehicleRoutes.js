const express = require("express");
const Vehicle = require("../models/Vehicle");

const router = express.Router();

/* ================= CREATE VEHICLE ================= */
router.post("/", async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= GET ALL VEHICLES ================= */
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= DELETE VEHICLE BY ID ================= */
router.delete("/:id", async (req, res) => {
  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!deletedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json({
      message: "Vehicle deleted successfully",
      vehicle: deletedVehicle
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update vehicle availability
router.put("/:id/availability", async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    vehicle.availability = !vehicle.availability;
    await vehicle.save();

    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
