const express = require("express");
const router = express.Router();

const Vehicle = require("../models/Vehicle");
const Booking = require("../models/Booking");
const User = require("../models/User");

router.get("/stats", async (req,res)=>{

 const totalUsers = await User.countDocuments();

 res.json({
   registeredUsers: totalUsers
 });

});

router.get("/dashboard", async (req, res) => {

  const totalVehicles = await Vehicle.countDocuments();
  const totalUsers = await User.countDocuments();
  const totalBookings = await Booking.countDocuments();

  const revenue = await Booking.aggregate([
    { $match: { paymentStatus: "Paid" } },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } }
  ]);

  res.json({
    vehicles: totalVehicles,
    users: totalUsers,
    bookings: totalBookings,
    revenue: revenue[0]?.total || 0
  });

});

module.exports = router;