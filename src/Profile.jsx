import React from "react";
import "./Profile.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="profile-container d-flex align-items-center justify-content-center h-100">
      <div className="profile-card">
        <h2 className="profile-heading mb-4">User Profile</h2>
        <p>
          <strong>First Name:</strong> {auth.user.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {auth.user.lastName}
        </p>
        <p>
          <strong>Email:</strong> {auth.user.email}
        </p>
        <button
          type="button"
          className="edit-profile-btn"
          onClick={() => {
            navigate("/edit-profile");
          }}
        >
          EditProfile
        </button>
      </div>
    </div>
  );
};

export default Profile;
