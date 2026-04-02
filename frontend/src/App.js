import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import PaymentPage from "./pages/PaymentPage";

function App() {
  return (
    <Router>
      {/* NAVBAR */}
      <nav className="navbar">
  <div className="logo">RentiGo</div>

  <ul className="nav-links">
    <li><a href="/">Home</a></li>
    <li><a href="/vehicles">Vehicles</a></li>
    <li><a href="/admin">Admin</a></li>
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>
  </ul>
</nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>

      {/* FOOTER */}
      <Footer />
    </Router>
  );
}

export default App;
