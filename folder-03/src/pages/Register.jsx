import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "./Register.css";

import api from "../services/api";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Register
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", formData);

      toast.success(response.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="register-container">

      <div className="register-card">

        <h1 className="register-title">
          Create Account
        </h1>

        <p className="register-subtitle">
          Register to continue shopping
        </p>

        <form onSubmit={handleSubmit}>

          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required={true}
          />

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required={true}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required={true}
          />

          <Button
            text="Register"
            type="submit"
          />

        </form>

        <p className="login-text">
          Already have an account?

          <Link to="/login" className="login-link">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;