import React from "react";
import { NavLink } from "react-router-dom";
import { Card } from "reactstrap";

export default function Login() {
  const getUser = (event) => {
    event.preventDefault();
    const user = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    console.log("TODO: Login User Functionality to be added", user);
  };

  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      <div className="component-width">
        <Card body>
          <h1>Login</h1>
          <form onSubmit={getUser}>
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
              <b>Enter Password:</b>
            </div>
            <input
              type="password"
              placeholder="password"
              name="password"
              required
              className="w-100 p-2 mb-2"
            />
            <br />
            <div className="d-flex justify-content-end">
              <NavLink
                activeClassName="active-nav  w-25"
                className="links"
                to="/forgotpassword"
              >
                {" "}
                <p className="text-end">Forgot Password</p>
              </NavLink>
            </div>
            <button type="submit" className="login-btn p-2 mx-auto w-100">
              Login
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
