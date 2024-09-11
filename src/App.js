import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import "bootstrap/dist/css/bootstrap.min.css";
import UserList from "./UserList";

function App() {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);
  return (
    <div
      className="d-flex flex-column align-items-stretch"
      style={{ height: "100vh" }}
    >
      <BrowserRouter>
        {login ? (
          <div className="d-flex justify-content-around p-2">Users List</div>
        ) : (
          <div className="d-flex justify-content-around p-2 header-container">
            <div className="">
              <NavLink
                activeClassName="active"
                className="p-2 links"
                to="/register"
              >
                Register
              </NavLink>
            </div>
            <div className="">
              <NavLink
                activeClassName="active"
                className="p-2 links"
                to="/login"
              >
                Login
              </NavLink>
            </div>
          </div>
        )}
        <div className="bg-primary h-100 content-wrapper">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<UserList />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
