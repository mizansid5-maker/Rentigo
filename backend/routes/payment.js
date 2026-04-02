const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");

const Booking = require("../models/Booking");


// Generate UPI QR
router.get("/upi-qr/:amount", async (req, res) => {

  try {

    const amount = req.params.amount;

    const upiLink = `upi://pay?pa=rentigo@upi&pn=Rentigo&am=${amount}&cu=INR`;

    const qrCode = await QRCode.toDataURL(upiLink);

    res.json({
      qr: qrCode,
      upiLink: upiLink
    });

  } catch (error) {

    res.status(500).json({
      message: "QR generation failed"
    });

  }

});


// Fake Payment
router.post("/fake-payment", async (req, res) => {

  try {

    const { bookingId } = req.body;

    const transactionId = "TXN" + Date.now();

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        paymentStatus: "Paid",
        bookingStatus: "Confirmed",
        transactionId: transactionId
      },
      { new: true }
    );

    res.json({
      message: "Payment successful",
      transactionId: transactionId,
      booking: booking
    });

  } catch (error) {

    res.status(500).json({
      message: "Payment failed"
    });

  }

});


// Payment History
router.get("/history/:userId", async (req, res) => {

  try {

    const payments = await Booking.find({
      userId: req.params.userId,
      paymentStatus: "Paid"
    });

    res.json(payments);

  } catch (error) {

    res.status(500).json({
      message: "Could not fetch payment history"
    });

  }

});

module.exports = router;