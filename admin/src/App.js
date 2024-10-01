import React, { useEffect } from "react";
import DashboardLayout from "./components/New/DashboardLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/New/Login";
import Register from "./components/New/Register";
import ProtectedRoute from "./components/New/ProtectedRoute";
import { AuthProvider } from "./Auth/AuthContext";

const App = () => {


  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Separate Login and Register routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Other pages */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/*" element={<DashboardLayout />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;