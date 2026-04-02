import { useState } from "react";
import { api } from "../services/api";

function Register() {

  const [form, setForm] = useState({
    name:"",
    email:"",
    password:""
  });

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      await api.post("/auth/register",form);
      alert("Registration successful");
    }
    catch(err){
      alert("Registration failed");
    }
  };

  return (

    <div className="register-page">

      <div className="register-card">

        <h2>Create Account</h2>
        <p className="register-subtitle">
          Join <span>RentiGo</span> and start riding today
        </p>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

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
            Register
          </button>

        </form>

      </div>

    </div>

  );
}

export default Register;

