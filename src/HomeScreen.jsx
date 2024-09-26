import React from "react";
import { Link } from "react-router-dom";
import "./HomeScreen.css"; // Create a CSS file for the styling
import logo from "./logo.png";

const HomeScreen = () => {
  return (
    <div className="home-screen">
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>

      <div className="main-content">
        <div className="header">
          <h1>User Management</h1>
          <input
            type="text"
            placeholder="Search by name"
            className="search-bar"
          />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Signup Date</th>
                <th>Role</th>
                <th>Enabled</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
