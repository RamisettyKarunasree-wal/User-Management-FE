import React from "react";
import { NavLink } from "react-router-dom";
import { Card } from "reactstrap";

export default function Register() {
  const addUser = (event) => {
    event.preventDefault();
    const user = {
      name: event.target.name.value,
      password: event.target.password.value,
      email: event.target.email.value,
      dob: event.target.dob.value,
    };
    console.log("Todo: add post functionality", user);
  };

  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      <div className="min-w-50 w-sm-75 w-md-50">
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
              <b>Enter Date of Birth:</b>
            </div>
            <input
              type="date"
              placeholder="dob"
              name="dob"
              required
              className="w-100 p-2 mb-2"
            />
            <br />
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
