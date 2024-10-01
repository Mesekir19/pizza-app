import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { createCustomer } from "../api/customer";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerData = {
      email,
      password,
      location,
      phoneNumber,
    };

    try {
      // Create the customer via API
      await createCustomer(customerData);
      alert("Customer created successfully!");
      navigate("/login"); // Navigate to login after registration
    } catch (error) {
      console.error("Error creating customer:", error);
      alert("Error creating customer");
    }
  };

  const inputStyle = {
    "& .MuiOutlinedInput-input": {
      padding: "10px", // Reducing the padding to make the input height smaller
    },
    "& .MuiInputLabel-root": {
      color: "orange", // Default label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "orange", // Label color when focused
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "orange", // Default border color
      },
      "&:hover fieldset": {
        borderColor: "orange", // Border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "orange", // Border color when focused
      },
    },
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          backgroundColor: "orange",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/pizzaslice.svg"
          alt="logo"
          style={{ width: "50%", maxWidth: "300px" }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              mb: 2,
            }}
          >
            <img
              src="/pizzaslice.svg"
              alt="logo"
              style={{ width: "10%", maxWidth: "50px", marginRight: 10 }}
            />
            <Typography component="h1" variant="h4">
              Register
            </Typography>
          </Box>
          <Typography variant="h6" align="left" sx={{ width: "100%" }}>
            Customer Registration
          </Typography>
          <Divider sx={{ borderColor: "lightgray", width: "100%", mb: 2 }} />
          <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={inputStyle}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={inputStyle}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              name="location"
              label="Location"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={inputStyle}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              name="phoneNumber"
              label="Phone Number"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              sx={inputStyle}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "orange" }}
              onClick={handleSubmit}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
