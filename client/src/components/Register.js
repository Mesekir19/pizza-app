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
  CircularProgress,
} from "@mui/material";
import { createCustomer } from "../api/customer";
import { z } from "zod"; // Import Zod for validation
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"; // Import react-hook-form

// Define Zod validation schema
const customerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  location: z.string().min(1, "Location is required"),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "Phone number must be numeric")
    .min(1, "Phone number is required"),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(customerSchema),
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // State to track loading status
  const [message, setMessage] = useState(""); // State to hold success/error message

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    setMessage(""); // Clear previous messages
    try {
      // Create the customer via API
      await createCustomer(data);
      setMessage("Customer created successfully!"); // Set success message
      navigate("/login"); // Navigate to login after registration
    } catch (error) {
      console.error("Error creating customer:", error);
      setMessage("Error creating customer"); // Set error message
    } finally {
      setLoading(false); // End loading
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
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              label="Email"
              {...register("email")} // Register the input with react-hook-form
              error={!!errors.email} // Display error if validation fails
              helperText={errors.email ? errors.email.message : ""} // Display error message
              sx={inputStyle}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              label="Password"
              type="password"
              {...register("password")} // Register the input with react-hook-form
              error={!!errors.password} // Display error if validation fails
              helperText={errors.password ? errors.password.message : ""} // Display error message
              sx={inputStyle}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              label="Location"
              {...register("location")} // Register the input with react-hook-form
              error={!!errors.location} // Display error if validation fails
              helperText={errors.location ? errors.location.message : ""} // Display error message
              sx={inputStyle}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              label="Phone Number"
              {...register("phoneNumber")} // Register the input with react-hook-form
              error={!!errors.phoneNumber} // Display error if validation fails
              helperText={errors.phoneNumber ? errors.phoneNumber.message : ""} // Display error message
              sx={inputStyle}
            />
            <Button
              type="submit" // Change to submit type for form submission
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "orange" }}
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register"
              )}
            </Button>
            {/* Message Display */}
            {message && (
              <Typography variant="body2" color={loading ? "orange" : "green"}>
                {message}
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
