const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String, // 2W / 4W
      required: true,
    },

    fuelType: {
      type: String,
    },

    transmission: {
      type: String,
    },

    priceDaily: {
      type: Number,
    },

    priceWeekly: {
      type: Number,
    },

    priceMonthly: {
      type: Number,
    },

    image: {
      type: String,
    },

    availability: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Vehicle =
  mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;