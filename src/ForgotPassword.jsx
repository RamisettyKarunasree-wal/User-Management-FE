import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "./logo.png"; // Add the logo as per the design
import "./ForgotPassword.css"; // Import the custom CSS file for this component
import axios from "axios";

export default function ForgotPassword() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  const sendResetLink = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    setLoading(true); // Start loading

    try {
      await axios.post(`${baseUrl}/auth/forgot-password`, { email });
      setPopupVisible(true); // Show popup
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  return (
    <div className="forgotpassword-container d-flex align-items-center justify-content-center h-100">
      <div className="forgotpassword-card d-flex">
        {/* Form Section */}
        <div className="forgotpassword-form">
          <h2 className="forgotpassword-heading">Forgot Password</h2>
          <form onSubmit={sendResetLink}>
            <label className="forgotpassword-label" htmlFor="email">
              Enter Your Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              required
              className="forgotpassword-input"
            />

            <p className="reset-instruction">
              A link to reset your password will be sent to the above email.
            </p>

            <button
              type="submit"
              className="forgotpassword-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="forgotpassword-account-text">
            Remember your password?{" "}
            <NavLink to="/login" className="login-link">
              Sign in here
            </NavLink>
          </p>
        </div>

        {/* Info Section */}
        <div className="forgotpassword-info p-4">
          <h2>Reset Your Password</h2>
          <p>
            Enter the email address associated with your account, and we'll send
            you a link to reset your password.
          </p>
          <div className="forgotpassword-image">
            <img src={logo} alt="Logo" />
          </div>
        </div>
      </div>

      {/* Popup Message */}
      {popupVisible && (
        <div className="popup">
          <div className="popup-content">
            <p>Password reset link has been sent to your email!</p>
            <button onClick={() => setPopupVisible(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
