
import { useState } from "react";
import { api } from "../services/api";

function Login() {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/login", form);
      alert("Login successful");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (

    <div className="login-page">

      <div className="login-card">

        <h2>Welcome Back</h2>

        <p className="login-subtitle">
          Login to continue with <span>RentiGo</span>
        </p>

        <form onSubmit={handleSubmit}>

          <input
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>

  );
}

export default Login;

