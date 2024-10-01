// import api from "./api";

// // User registration
// export const registerUser = async (userData) => {
//   const response = await api.post("/auth/register", userData);
//   return response.data;
// };

// // User login
// export const loginUser = async (credentials) => {
//   const response = await api.post("/auth/login", credentials);
//   const { token } = response.data;

//   // Store token in local storage
//   localStorage.setItem("token", token);

//   return response.data;
// };

// // User logout (just removes the token)
// export const logoutUser = () => {
//   localStorage.removeItem("token");
// };


import axios from "axios";
import { AuthContext } from "../Auth/AuthContext";
import { useContext } from "react";

// Create Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_HOST, // Set your API base URL here
});

// Axios interceptor to automatically include the JWT token in the request header
const useAxios = () => {
  const { token } = useContext(AuthContext); // Get token from the AuthContext

  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to the header
    }
    return config;
  });

  return api;
};

export default useAxios;
