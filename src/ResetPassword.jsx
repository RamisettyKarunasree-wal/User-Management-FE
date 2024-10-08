import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "./logo.png"; // Add the logo as per the design
import "./ResetPassword.css"; // Import the custom CSS file for this component
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [linkExpired, setLinkExpired] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenValue = queryParams.get("token");
    const user = queryParams.get("userId");
    setToken(tokenValue);
    setUserId(user);
    checkLinkExpired(queryParams.get("token"), queryParams.get("userId"));
  }, []);

  const checkLinkExpired = async (token, userId) => {
    try {
      const res = await axios.post(`${baseUrl}/auth/reset-password/verify`, {
        token,
        userId,
      });
      console.log(res.data.success);
      setLinkExpired(false);
    } catch (error) {
      setLinkExpired(true);
      console.error(error);
    }
  };

  const resetPassword = async (event) => {
    event.preventDefault();
    const newPassword = event.target.newPassword.value;
    const confirmPassword = event.target.confirmPassword.value;

    try {
      const res = await axios.post(`${baseUrl}/auth/reset-password`, {
        token,
        newPassword,
        confirmPassword,
        userId,
      });
      console.log(res.data.message);
      setMessage(res.data.message);
      setError("");
    } catch (error) {
      setError(error.response.data.error);
      setMessage("");
      console.error(error);
    }
  };

  return !linkExpired ? (
    <div className="resetpassword-container d-flex align-items-center justify-content-center h-100">
      <div className="resetpassword-card d-flex">
        {/* Form Section */}
        <div className="resetpassword-form">
          <h2 className="resetpassword-heading">Reset Password</h2>

          {error && <p className="error-message text-danger">{error}</p>}
          {message && <p className="success-message text-success">{message}</p>}

          <form onSubmit={resetPassword}>
            <label className="resetpassword-label" htmlFor="newPassword">
              New Password
            </label>
            <div className="password-field">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter your new password"
                name="newPassword"
                required
                className="resetpassword-input"
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <label className="resetpassword-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="password-field">
              <input
                type={showConfirmNewPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                name="confirmPassword"
                required
                className="resetpassword-input"
              />
              <span
                className="password-toggle-icon"
                onClick={() =>
                  setShowConfirmNewPassword(!showConfirmNewPassword)
                }
              >
                {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit" className="resetpassword-btn">
              Reset Password
            </button>
          </form>

          <p className="resetpassword-account-text">
            Remember your password?{" "}
            <NavLink to="/login" className="login-link">
              Sign in here
            </NavLink>
          </p>
        </div>

        {/* Info Section */}
        <div className="resetpassword-info p-4">
          <h2>Reset Your Password</h2>
          <p>Enter your new password below to reset your account's password.</p>
          <div className="resetpassword-image">
            <img src={logo} alt="Logo" />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div class="error-page">
      <h1>404</h1>
      <p>The page you are looking for is not available or has expired.</p>
      <a href="/">Go Back to Home</a>
    </div>
  );
}
