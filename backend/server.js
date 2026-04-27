const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");

const paymentRoutes = require("./routes/payment");
const adminRoutes = require("./routes/admin");

const Booking = require("./models/Booking");
const cron = require("node-cron");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/vehicles", require("./routes/vehicleRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));


// 🚀 Start Server ONLY after DB connection
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB Connected");

    // 🔁 Cron Job (runs every 1 minute)
    cron.schedule("*/1 * * * *", async () => {
      try {
        // Check DB connection state
        if (Booking.db.readyState !== 1) {
          console.log("⏳ DB not ready, skipping cron...");
          return;
        }

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

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ DB connection failed:", error.message);
    process.exit(1); // stop app if DB fails
  }
};

startServer();