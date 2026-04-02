function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="container">
          <div className="hero-text">
            <h1>Rent Bikes & Cars Easily</h1>
            <p>Affordable • Fast • Reliable</p>

            <div className="hero-buttons">
              <a href="/vehicles" className="hero-btn">
                Explore Vehicles
              </a>

              <a href="/vehicles" className="hero-btn secondary">
                Book Your Ride
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <h3>100+</h3>
                <p>Vehicles</p>
              </div>

              <div className="stat">
                <h3>500+</h3>
                <p>Happy Riders</p>
              </div>

              <div className="stat">
                <h3>24/7</h3>
                <p>Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE RENTIGO */}
      <section className="why-choose">
        <div className="container">

          <h2 className="section-title">Why Choose RentiGo?</h2>
            <br />
          <div className="why-grid">
            <div className="why-card">
              🚗
              <h4>Verified Vehicles</h4>
              <p>All vehicles are quality checked and reliable.</p>
            </div>

            <div className="why-card">
              💰
              <h4>Affordable Pricing</h4>
              <p>Best rental prices with no hidden charges.</p>
            </div>

            <div className="why-card">
              ⚡
              <h4>Quick Booking</h4>
              <p>Book vehicles in just a few clicks.</p>
            </div>

            <div className="why-card">
              🛠️
              <h4>Admin Managed Fleet</h4>
              <p>Well-maintained vehicles managed by admins.</p>
            </div>
          </div>

        </div>
      </section>

      {/* HOW BOOKING WORKS */}
      <section className="how-it-works">
        <div className="container">

          <h2 className="section-title">How Booking Works</h2>
            <br />
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">🚲</div>
              <h4>Choose Vehicle</h4>
              <p>Select your favorite bike or car.</p>
            </div>

            <div className="step-card">
              <div className="step-icon">📅</div>
              <h4>Select Dates</h4>
              <p>Pick your rental start and end dates.</p>
            </div>

            <div className="step-card">
              <div className="step-icon">💳</div>
              <h4>Secure Payment</h4>
              <p>Pay safely using QR or card.</p>
            </div>

            <div className="step-card">
              <div className="step-icon">🏍️</div>
              <h4>Enjoy Ride</h4>
              <p>Start your journey with RentiGo.</p>
            </div>
          </div>

        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="reviews">
        <div className="container">

          <h2 className="section-title">What Our Riders Say</h2>
             <br />
          <div className="reviews-grid">
            <div className="review-card">
              ⭐⭐⭐⭐⭐
              <p>"Super easy booking and great bikes!"</p>
              <h4>- Rahul</h4>
            </div>

            <div className="review-card">
              ⭐⭐⭐⭐⭐
              <p>"Affordable rentals and smooth experience."</p>
              <h4>- Priya</h4>
            </div>

            <div className="review-card">
              ⭐⭐⭐⭐⭐
              <p>"Perfect for quick city rides."</p>
              <h4>- Arjun</h4>
            </div>
          </div>

        </div>
      </section>

      
{/* CTA */}

<section className="cta">
  <div className="container cta-box">

    <h2>
      Ready to Ride with <span className="cta-brand">RentiGo</span>?
    </h2>

    <p>
      Discover the freedom of hassle-free vehicle rentals.
      Choose your ride, pay securely, and start your journey today.
    </p>

    <div className="cta-buttons">
      <a href="/vehicles" className="cta-btn">
        Browse Vehicles
      </a>
    </div>

  </div>
</section>


    </>
  );
}

export default Home;

