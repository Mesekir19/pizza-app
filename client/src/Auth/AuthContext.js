import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Correct import

// Create a context for authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores the decoded token data
  const [token, setToken] = useState(localStorage.getItem("token") || ""); // Token from local storage
  const [userId, setUserId] = useState(
    localStorage.getItem("userId") || ""
  ); // Store restaurant_id
  const [loading, setLoading] = useState(true); // Loading state for auth actions

  // Check for token and decode user
  useEffect(() => {
    const checkAuth = () => {
      if (token) {
        try {
          const decodedUser = jwtDecode(token); // Decode the JWT token
          setUser(decodedUser); // Set the decoded user in state
        } catch (error) {
          console.error("Invalid token", error);
          setUser(null); // Clear user if token is invalid
        }
      } else {
        setUser(null); // Clear user if no token
      }
      setLoading(false); // Set loading to false after checking auth
    };

    checkAuth();
  }, [token]); // Runs when token changes

  // Login function to get the token and restaurant_id from the API
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOST}/customers/login`,
         email, password 
      );
      const receivedToken = response.data.token;
      setToken(receivedToken); // Set token in state
      setUserId(response.data.userId); // Set user_id

      // Immediately decode token and set user
      const decodedUser = jwtDecode(receivedToken);
      setUser(decodedUser); // Set user state with decoded token

      // Store token and restaurantId in localStorage
      localStorage.setItem("token", receivedToken);
      localStorage.setItem("userId", response.data.userId);
    } catch (error) {
      console.error("Login failed", error);
      throw new Error("Login failed");
    }
  };

  // Logout function
  const logout = () => {
    setToken(""); // Clear the token
    setUser(null); // Clear the user
    // setRestaurantId(""); // Clear restaurant_id
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("userId"); // Remove restaurant_id from localStorage
    
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        userId,
        login,
        logout,
        loading,
        isAuthenticated: !!user, // Boolean flag to check if the user is logged in
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
