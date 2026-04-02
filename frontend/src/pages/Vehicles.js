import { useEffect, useState } from "react";
import { api } from "../services/api";

function Vehicles() {

  const [vehicles, setVehicles] = useState([]);

  // Filters
  const [search, setSearch] = useState("");
  const [type, setType] = useState("ALL");
  const [fuel, setFuel] = useState("ALL");
  const [sortPrice, setSortPrice] = useState("");

  // Booking
  const [showBooking, setShowBooking] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Payment
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // QR + TIMER
  const [qr, setQr] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);

  // Load vehicles
  useEffect(() => {
    api.get("/vehicles")
      .then(res => setVehicles(res.data))
      .catch(err => console.log(err));
  }, []);

  // Load QR when payment opens
  useEffect(() => {

    if (showPayment && paymentMethod === "UPI") {

      api.get(`/payment/upi-qr/${calculateTotal()}`)
        .then(res => setQr(res.data.qr))
        .catch(err => console.log(err));

      setTimeLeft(300);

    }

  }, [showPayment, paymentMethod]);

  // Payment timer
  useEffect(() => {

    if (!showPayment || paymentMethod !== "UPI") return;

    const timer = setInterval(() => {

      setTimeLeft(prev => {

        if (prev <= 1) {
          clearInterval(timer);
          alert("Payment time expired");
          setShowPayment(false);
          return 0;
        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(timer);

  }, [showPayment, paymentMethod]);

  const formatTime = (seconds) => {

    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;

  };

  // Calculate days
  const calculateDays = () => {

    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = end - start;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays > 0 ? diffDays : 0;

  };

  // Calculate price
  const calculateTotal = () => {

    const days = calculateDays();
    return selectedVehicle ? days * selectedVehicle.priceDaily : 0;

  };

  // Open booking modal
  const openBooking = (vehicle) => {

    setSelectedVehicle(vehicle);
    setStartDate("");
    setEndDate("");
    setShowBooking(true);

  };

  // Confirm booking
  const confirmBooking = () => {

    if (!startDate || !endDate) {
      alert("Please select both dates");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      alert("End date must be after start date");
      return;
    }

    setShowBooking(false);
    setShowPayment(true);

  };

  // Fake payment
  const handlePayment = async () => {

    setProcessing(true);

    setTimeout(async () => {

      try {

        await api.post("/bookings", {
          vehicleId: selectedVehicle._id,
          startDate,
          endDate,
          totalAmount: calculateTotal()
        });

        setProcessing(false);
        setShowPayment(false);
        setPaymentSuccess(true);

      } catch (err) {

        alert("Booking failed");
        setProcessing(false);

      }

    }, 2000);

  };

  // Filters
  const filteredVehicles = vehicles
    .filter(v => {

      const matchType = type === "ALL" || v.type === type;
      const matchFuel = fuel === "ALL" || v.fuelType === fuel;
      const matchSearch = v.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      return matchType && matchFuel && matchSearch;

    })
    .sort((a, b) => {

      if (sortPrice === "LOW") return a.priceDaily - b.priceDaily;
      if (sortPrice === "HIGH") return b.priceDaily - a.priceDaily;

      return 0;

    });

  return (
    <div>

      <h2>Available Vehicles</h2>

  {/* FILTER BAR */}

  <div className="filter-bar">

  <input
    placeholder="Search vehicle..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select onChange={(e) => setType(e.target.value)}>
    <option value="ALL">All Types</option>
    <option value="2W">2 Wheeler</option>
    <option value="4W">4 Wheeler</option>
  </select>

  <select onChange={(e) => setFuel(e.target.value)}>
    <option value="ALL">All Fuel</option>
    <option value="Petrol">Petrol</option>
    <option value="Diesel">Diesel</option>
  </select>

  <select onChange={(e) => setSortPrice(e.target.value)}>
    <option value="">Sort by Price</option>
    <option value="LOW">Low → High</option>
    <option value="HIGH">High → Low</option>
  </select>

  </div>

      {/* VEHICLE GRID */}
      <div className="vehicle-grid">

        {filteredVehicles.length === 0 && (
          <p>No vehicles available</p>
        )}

        {filteredVehicles.map(v => (
          <div key={v._id} className="vehicle-card">

            <div className="image-wrapper">

              <span className="badge">{v.type}</span>

              {v.image && (
                <img
                  src={v.image}
                  alt={v.name}
                  className="vehicle-image"
                />
              )}

            </div>

            <h4>{v.name}</h4>
            <p>{v.type} | {v.fuelType}</p>
            <p>₹{v.priceDaily}/day</p>

            <button onClick={() => openBooking(v)}>
              Book Now
            </button>

          </div>
        ))}

      </div>

     {/* BOOKING MODAL */}
{showBooking && (
  <div className="popup-overlay">
    <div className="booking-box animated">

      <h3>🚀 Book {selectedVehicle?.name}</h3>

      <div className="date-row">
        <div className="date-field">
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="date-field">
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* LIVE SUMMARY */}
      {startDate && endDate && (
        <div className="booking-summary glow">
          <p>🗓️ Days: <span>{calculateDays()}</span></p>
          <p>💰 ₹{selectedVehicle?.priceDaily}/day</p>
          <h4>🔥 Total: ₹{calculateTotal()}</h4>
        </div>
      )}

      <div className="booking-actions">
        <button className="confirm-btn" onClick={confirmBooking}>
          ⚡ Confirm
        </button>

        <button
          className="cancel-btn"
          onClick={() => setShowBooking(false)}
        >
          ❌ Cancel
        </button>
      </div>

    </div>
  </div>
)}

{/* PAYMENT MODAL */}
{showPayment && (
  <div className="popup-overlay">
    <div className="payment-box animated">

      <h3>💳 Payment for {selectedVehicle?.name}</h3>

      <div className="payment-amount">
        ₹{calculateTotal()}
      </div>

      {/* PAYMENT METHOD SWITCH */}
      <div className="payment-tabs">
        <button
          className={paymentMethod === "UPI" ? "active" : ""}
          onClick={() => setPaymentMethod("UPI")}
        >
          UPI
        </button>

        <button
          className={paymentMethod === "CARD" ? "active" : ""}
          onClick={() => setPaymentMethod("CARD")}
        >
          Card
        </button>
      </div>

      {/* UPI SECTION */}
      {paymentMethod === "UPI" && (
        <div className="upi-section">

          <p className="upi-text">Scan QR to Pay</p>

          <div className="timer">{formatTime(timeLeft)}</div>

          {qr && (
            <img src={qr} alt="QR" className="qr-img" />
          )}

          <input
            className="upi-input"
            placeholder="Enter UPI ID (optional)"
          />

        </div>
      )}

      {/* CARD SECTION */}
      {paymentMethod === "CARD" && (
        <div className="card-section">
          <input placeholder="Card Number" />
          <input placeholder="Expiry (MM/YY)" />
          <input placeholder="CVV" />
        </div>
      )}

      <div className="payment-actions">
        <button className="pay-btn" onClick={handlePayment}>
          {processing ? "Processing..." : "Pay Now 🚀"}
        </button>

        <button
          className="cancel-btn"
          onClick={() => setShowPayment(false)}
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
)}
     
      {/* SUCCESS */}
{paymentSuccess && (
  <div className="popup-overlay">
    <div className="success-box animated">

      <div className="success-icon">✅</div>

      <h3>Payment Successful!</h3>

      <p>Your booking is confirmed 🚀</p>

      <button onClick={() => setPaymentSuccess(false)}>
        Continue
      </button>

    </div>
  </div>
)}

    </div>
  );
}

export default Vehicles;

