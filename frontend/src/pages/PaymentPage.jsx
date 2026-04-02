import React, { useEffect, useState } from "react";

function PaymentPage() {

  const [qr, setQr] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  // Fetch QR code
  useEffect(() => {

    fetch("http://localhost:5000/api/payment/upi-qr/450")
      .then(res => res.json())
      .then(data => {
        setQr(data.qr);
      })
      .catch(err => console.log(err));

  }, []);

  // Countdown timer
  useEffect(() => {

    const timer = setInterval(() => {

      setTimeLeft(prev => {

        if (prev <= 1) {
          clearInterval(timer);
          alert("Payment time expired ❌");
          window.location.href = "/";
          return 0;
        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  // Convert seconds → mm:ss
  const formatTime = (seconds) => {

    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;

  };

  // Payment confirmation
  const handlePayment = async () => {

    try {

      const response = await fetch("http://localhost:5000/api/payment/fake-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          bookingId: "123456"
        })
      });

      const data = await response.json();

      alert("Payment Successful ✅");

      window.location.href = "/my-bookings";

    } catch (error) {

      alert("Payment failed");

    }

  };

  return (

    <div style={{textAlign:"center", marginTop:"50px"}}>

      <h2>Rentigo Payment</h2>

      <p>Complete payment in</p>

      <h1>{formatTime(timeLeft)}</h1>

      {qr ? (
        <img src={qr} alt="QR Code" width="250"/>
      ) : (
        <p>Loading QR...</p>
      )}

      <br/><br/>

      <button onClick={handlePayment}
      style={{
        padding:"10px 20px",
        fontSize:"16px",
        cursor:"pointer"
      }}>
        I Have Paid
      </button>

    </div>

  );

}

export default PaymentPage;