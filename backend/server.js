const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const paymentRoutes = require("./routes/payment");
const adminRoutes = require("./routes/admin");

const Booking = require("./models/Booking");
const cron = require("node-cron");

const app = express();


// Connect Database
connectDB();


// Middlewares
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/vehicles", require("./routes/vehicleRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));


// Auto cancel expired bookings
cron.schedule("*/1 * * * *", async () => {
  try {

    console.log("⏱ Checking expired bookings...");

    const expiredBookings = await Booking.find({
      paymentStatus: "Pending",
      expiresAt: { $lt: new Date() }
    });

    for (let booking of expiredBookings) {

      booking.bookingStatus = "Cancelled";

      await booking.save();

      console.log("❌ Cancelled booking:", booking._id);

    }

  } catch (error) {
    console.error("Cron error:", error.message);
  }
});


// Start Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});