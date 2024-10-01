import axios from "axios";

// Set up the base URL for your backend API (adjust according to your backend's port)
const API_URL = process.env.REACT_APP_SERVER_HOST;

// Axios instance for all API calls
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set JWT token if it exists in local storage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
