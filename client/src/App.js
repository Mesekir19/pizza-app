import React from "react";
import { Box, Container } from "@mui/material";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import FeaturedPizzaSlider from "./components/FeaturedPizzaSlider";
import TopRestaurants from "./components/TopRestaurants";
import PopularPizzas from "./components/PopularPizzas";
import HorizontalScrollPizzas from "./components/HorizontalScrollPizzas";
import MainFooter from "./components/Footer";
import PizzaOrderPage from "./components/PizzaOrderPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./Auth/AuthContext";
import ProtectedRoute from "./Protected/ProtectedRoute";
import OrderHistory from "./components/OrderHistory";

function AppLayout() {

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #ffecd2, #fcb69f)",
      }}
    >
      {" "}
      <Navbar />
      <Routes>
        {/* Route for home page that includes all components */}
        <Route
          path="/"
          element={
            <>
              <MainContent />
              <FeaturedPizzaSlider />
              <TopRestaurants />
              <PopularPizzas />
              <HorizontalScrollPizzas />
            </>
          }
        />

        {/* Route for the pizza order page */}
        <Route path="/order" element={<PizzaOrderPage />} />
        <Route path="/orderHistory" element={<OrderHistory />} />
      </Routes>
      <MainFooter />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Separate Login and Register routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
