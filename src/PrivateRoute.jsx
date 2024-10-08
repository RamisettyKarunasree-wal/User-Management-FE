// PrivateRoute.js
import React from "react";
import { useSelector } from "react-redux";
import Login from "./Login";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? children : <Login />;
};

export default PrivateRoute;
