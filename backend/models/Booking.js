const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
{
  userId: String,
  vehicleId: String,
  totalAmount: Number,

  paymentStatus: {
    type: String,
    default: "Pending"
  },

  bookingStatus: {
    type: String,
    default: "Pending"
  },

  expiresAt: Date
},
{ timestamps: true }
);

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

module.exports = Booking;