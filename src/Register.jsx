import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Card } from "reactstrap";
import axios from "axios";

export default function Register() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [error, setError] = useState("");
  const addUser = async (event) => {
    event.preventDefault();
    const user = {
      name: event.target.name.value,
      password: event.target.password.value,
      email: event.target.email.value,
      userRoleId: Number(event.target.role.value),
    };
    try {
      const response = await axios.post(`${baseUrl}/user`, user);
      setError("");
      console.log(response.data);
    } catch (e) {
      setError(e.response.data.message[0]);
      console.log(e.response.data.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      <div className="component-width">
        <Card body>
          <h1>Register Here</h1>
          <form onSubmit={addUser}>
            <div className="form-label">
              <b>Enter Email:</b>
            </div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              className="w-100 p-2 mb-2"
            />
            <br />
            <div className="form-label">
              <b>Enter Username:</b>
            </div>
            <input
              type="text"
              placeholder="Username"
              name="name"
              required
              className="w-100 p-2 mb-2"
            />
            <br />
            <div className="form-label ">
              <b>Enter Password:</b>
            </div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              className="w-100 p-2 mb-2"
            />
            <br />
            <div className="form-label">
              <b>Select Role:</b>
            </div>
            <select name="role" className="w-100 p-2 mb-2">
              <option value="2">User</option>
              <option value="1">Admin</option>
            </select>
            <br />
            {error && <p className="text-danger">{error}</p>}
            <div className="d-flex justify-content-end">
              <NavLink
                activeClassName="active w-25"
                className="links"
                to="/forgotpassword"
              >
                {" "}
                <p className="text-end">Forgot Password</p>
              </NavLink>
            </div>
            <button type="submit" className="login-btn p-2 mx-auto w-100">
              Register
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
