const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");


// Create Booking
router.post("/", async (req, res) => {

  try {

    const { userId, vehicleId, totalAmount } = req.body;

    // booking expires in 5 minutes
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const booking = new Booking({
      userId,
      vehicleId,
      totalAmount,
      expiresAt
    });

    await booking.save();

    res.json({
      message: "Booking created",
      booking
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// Get All Bookings
router.get("/", async (req, res) => {

  const bookings = await Booking.find();

  res.json(bookings);

});

module.exports = router;