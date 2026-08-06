import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import {Link} from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import toast from "react-hot-toast";

import "./Login.css";

function Login() {
  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/auth/login", formData);

    // Save Token
    localStorage.setItem("token", response.data.token);

    // Save User
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    // Update Context
    setUser(response.data.user);

    toast.success("Login Successful");

    // Navigate Home
    navigate("/");
  } catch (error) {
    toast.error(error.response?.data?.message || "Login Failed");
  }
};

  // console.log(formData);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Login to continue shopping</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="register-text">
          Don't have an account?

          <Link to ="/register" className= "register-link">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
