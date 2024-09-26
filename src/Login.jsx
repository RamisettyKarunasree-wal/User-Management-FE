import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import googleIcon from "./google_Icon.webp";
import linkedinIcon from "./linkedin_icon.png";
import logo from "./login-side.jpg";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { fetchUserData, loginSuccess } from "./AuthSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUser = async (event) => {
    event.preventDefault();
    const user = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    try {
      await axios.post(`${baseUrl}/auth/login`, user, {
        withCredentials: true,
      });
      setError("");
      dispatch(loginSuccess());
      dispatch(fetchUserData());
      navigate("/profile");
    } catch (e) {
      setError(e.response.data.error);
      console.log(e.response.data.error);
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center h-100">
      <div className="login-card d-flex">
        {/* Form Section */}
        <div className="login-form">
          <h2 className="login-heading">Login to Your Account</h2>
          <form onSubmit={getUser}>
            <label className="login-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              required
              className="login-input"
            />
            <label className="form-label small-label" htmlFor="password">
              Password
            </label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
                required
                className="form-input"
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {error && <span className="text-danger">{error}</span>}
            </div>

            <NavLink
              to="/forgotpassword"
              className="forgot-password-link d-flex justify-content-end"
            >
              Forgot Password?
            </NavLink>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>

        {/* Info Section */}
        <div className="login-info p-4">
          <h2>Welcome Back!</h2>
          <p>
            Access your account to manage your preferences and explore more
            features.
          </p>
          <div className="login-image">
            <img src={logo} alt="Logo" />
          </div>
          <p className="login-account-text">
            Don't have an account?{" "}
            <NavLink to="/register" className="signin-link">
              Sign up here
            </NavLink>
          </p>
          <p className="text-center">OR</p>
          {/* Social Login Buttons */}
          <button
            className="google-login-btn mb-3"
            onClick={() =>
              (window.location.href = `${process.env.REACT_APP_BASE_URL}/auth/google/login`)
            }
          >
            <img src={googleIcon} alt="google-icon" className="me-2" /> Login
            with Google
          </button>
          <button
            className="linkedin-login-btn mb-3"
            onClick={() =>
              (window.location.href = `${process.env.REACT_APP_BASE_URL}/auth/google/login`)
            }
          >
            <img src={linkedinIcon} alt="linkedin-icon" className="me-2" />{" "}
            Login with LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
}
