import React, { useState } from "react";
import axios from "axios";
import "./EditProfile.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { fetchUserData } from "./AuthSlice";

const EditProfile = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const auth = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    firstName: auth.user?.firstName || "",
    lastName: auth.user?.lastName || "",
    email: auth.user?.email || "",
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");
  const [passError, setPassError] = useState("");
  const [success, setSuccess] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.patch(
        `${baseUrl}/auth/update-profile`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        },
        { withCredentials: true }
      );

      setError("");
      setSuccess("Profile updated successfully!");
      dispatch(fetchUserData());
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (e) {
      console.log(e);
      setSuccess("");
      setError(e.response.data.error);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      await axios.patch(
        `${baseUrl}/auth/change-password`,
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
          confirmNewPassword: passwordData.confirmNewPassword,
        },
        { withCredentials: true }
      );

      setPassError("");
      setSuccess("Password changed successfully!");
      setShowChangePassword(false);
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (e) {
      setSuccess("");
      setPassError(e.response.data.error);
    }
  };

  const handleCancel = () => {
    window.location.href = "/profile";
  };

  const toggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
    setError("");
  };

  const showOldPasswordField = auth.user?.providers?.includes("jwt");

  return (
    <div className="edit-profile-container d-flex align-items-center justify-content-center h-100">
      <div className="edit-profile-card">
        <h2 className="edit-profile-heading mb-4">Edit Your Profile</h2>
        {error && <p className="text-danger">{error}</p>}
        {success && <p className="text-success">{success}</p>}
        <form>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="d-flex justify-content-end mb-3">
            <button
              type="button"
              className="edit-profile-btn me-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="edit-profile-btn me-2"
              onClick={handleSave}
            >
              Save Profile
            </button>
            <button
              type="button"
              className="edit-profile-btn"
              onClick={toggleChangePassword}
            >
              {showChangePassword
                ? "Close Manage Passwords"
                : "Manage Passwords"}
            </button>
          </div>
        </form>

        {/* Change Password Section */}
        {showChangePassword && (
          <div className="change-password-container mt-4">
            <h4 className="change-password-heading">
              {showOldPasswordField ? "Change Password" : "Create Password"}
            </h4>
            {passError && <p className="text-danger">{passError}</p>}

            {showOldPasswordField && (
              <div className="mb-3">
                <label htmlFor="oldPassword" className="form-label">
                  Old Password
                </label>
                <div className="password-field">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    id="oldPassword"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                    className="form-input"
                  />
                  <span
                    className="password-toggle-icon"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <div className="password-field">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="form-input"
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="confirmNewPassword" className="form-label">
                Confirm New Password
              </label>
              <div className="password-field">
                <input
                  type={showConfirmNewPassword ? "text" : "password"}
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  value={passwordData.confirmNewPassword}
                  onChange={handlePasswordChange}
                  className="form-input"
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
            </div>

            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="edit-profile-btn me-2"
                onClick={toggleChangePassword}
              >
                Cancel
              </button>
              <button
                type="button"
                className="edit-profile-btn"
                onClick={handleChangePassword}
              >
                {showOldPasswordField ? "Change Password" : "Create Password"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
