import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
  });

  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${baseUrl}/auth/loggedInUser`, {
          withCredentials: true,
        });
        setAuth({
          isAuthenticated: true,
          user: response.data.user,
        });
      } catch (error) {
        setAuth({
          isAuthenticated: false,
          user: null,
        });
      }
    };

    checkAuth();
  }, [baseUrl]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
