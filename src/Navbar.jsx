import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import the CSS for Navbar styling
import axios from "axios";
import { logoutSuccess } from "./AuthSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const handleLogout = async () => {
    try {
      await axios.get(`${baseUrl}/auth/logout`, { withCredentials: true });
      dispatch(logoutSuccess());
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          MyApp
        </NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </li>
            <li className="nav-item" onClick={handleLogout}>
              <NavLink className="nav-link">Logout</NavLink>
            </li>
            {auth.user.userRoleId === 1 ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">
                  Users
                </NavLink>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
