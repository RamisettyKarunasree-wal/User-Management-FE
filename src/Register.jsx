import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./logo.png";
import "./Register.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import googleIcon from "./google_Icon.webp";
import linkedinIcon from "./linkedin_icon.png";
import { Spinner } from "reactstrap";

export default function Register() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const navigate = useNavigate();
  const addUser = async (event) => {
    event.preventDefault();
    const user = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      password: event.target.password.value,
      confirmPassword: event.target.confirmPassword.value,
      email: event.target.email.value,
      userRoleId: event.target.email.value === "karuna1350@gmail.com" ? 1 : 2,
    };
    try {
      const response = await axios.post(`${baseUrl}/user`, user);
      setError("");
      console.log(response.data);
      setMsg("Successfully Registered.Redirecting to login page");
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (e) {
      setMsg("");
      if (e.response && e.response.status === 400)
        setError(e.response.data.message[0]);
      else setError(e.response.data.message);
      console.log(e.response.data.message);
    }
  };

  return (
    <div className="register-container d-flex align-items-center justify-content-center h-100">
      <div className="register-card d-flex">
        <div className="register-form">
          <h2 className="register-heading mb-4">Create Your Account</h2>
          <form onSubmit={addUser}>
            <label className="form-label small-label" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter your First Name"
              name="firstName"
              required
              className="form-input"
            />

            <label className="form-label small-label" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your Last Name"
              name="lastName"
              required
              className="form-input"
            />

            <label className="form-label small-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              required
              className="form-input"
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
            </div>

            <label className="form-label small-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="password-field">
              <input
                type={showRetypePassword ? "text" : "password"}
                placeholder="Confirm your password"
                name="confirmPassword"
                required
                className="form-input"
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowRetypePassword(!showRetypePassword)}
              >
                {showRetypePassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* <label className="form-label small-label">Select Role</label>
            <select name="role" className="form-select" required>
              <option value="2">User</option>
              <option value="1">Admin</option>
            </select> */}

            {error && <p className="text-danger">{error}</p>}

            <NavLink
              to="/forgotpassword"
              className="forgot-password-link d-flex justify-content-end"
            >
              Forgot Password?
            </NavLink>
            {msg && (
              <span className="text-success">
                {msg}
                <Spinner />
              </span>
            )}

            <button type="submit" className="submit-btn">
              Register
            </button>
          </form>
        </div>

        <div className="register-info p-4">
          <h2>Welcome To User Management App</h2>
          <div className="sales-report">
            <img src={logo} alt="Sales Report" />
          </div>
          <p className="already-account-text">
            Already have an account?
            <NavLink to="/signin" className="signin-link">
              {" "}
              Sign in
            </NavLink>
          </p>

          <p className="text-center">OR</p>

          <button
            className="google-signup-btn mb-3"
            onClick={() =>
              (window.location.href = `${process.env.REACT_APP_BASE_URL}/auth/google/login`)
            }
          >
            <img src={googleIcon} alt="google-icon" className="me-2" /> Sign up
            with Google
          </button>
          <button
            className="linkedin-signup-btn mb-3"
            onClick={() =>
              (window.location.href = `${process.env.REACT_APP_BASE_URL}/auth/linkedin/login`)
            }
          >
            <img src={linkedinIcon} alt="linkedin-icon" className="me-2" /> Sign
            up with LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
}
