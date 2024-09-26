import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import UserList from "./UserList";
import ForgotPassword from "./ForgotPassword";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "./AuthSlice";
import PrivateRoute from "./PrivateRoute";
import ResetPassword from "./ResetPassword";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const loadUserData = async () => {
      await dispatch(fetchUserData());
    };

    loadUserData();
  }, [dispatch]);

  return (
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        {isAuthenticated && <Navbar />}{" "}
        <div className="content-wrapper flex-grow-1">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <UserList />
                </PrivateRoute>
              }
            />
            <Route
              path="*"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
