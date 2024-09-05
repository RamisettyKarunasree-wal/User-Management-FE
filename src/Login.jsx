/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Card } from "reactstrap";

export default function Login() {
  const getUser = (event) => {
    event.preventDefault();
    console.log("TODO: Login User Functionality to be added");
  };

  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      <div className="min-w-50 w-sm-75 w-md-50">
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
              <p className="text-end">Forgot Password</p>
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
