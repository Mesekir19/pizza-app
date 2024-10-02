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
  Checkbox,
  FormControlLabel,
  Link,
  Divider,
  CircularProgress,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { createRestaurant } from "../../api/restaurants";
import { z } from "zod"; // Import Zod for validation
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"; // Import react-hook-form

// Define Zod validation schema
const restaurantSchema = z.object({
  name: z.string().min(1, "Admin name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z
    .string()
    .min(6, "Confirm password is required")
    .refine((val, ctx) => {
      if (val !== ctx.parent.password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords must match",
        });
      }
      return true;
    }),
  location: z.string().min(1, "Location is required"),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "Phone number must be numeric")
    .min(1, "Phone number is required"),
  restaurantName: z.string().min(1, "Restaurant name is required"),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(restaurantSchema),
  });

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [photo, setPhoto] = useState(null); // State for handling the selected photo
  const [photoURL, setPhotoURL] = useState(""); // State for storing uploaded image URL
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate();

  // Function to upload the image to Cloudinary
  const uploadImageToCloudinary = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "upload"); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_IMAGE_URL}`, // Replace with your Cloudinary cloud name
        formData
      );
      return response.data.secure_url; // Cloudinary returns a secure URL for the image
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  };

  // Handle form submission
  const handleRegister = async (data) => {
    setLoading(true); // Set loading to true
    setError(""); // Reset error message
    let imageUrl = "";

    if (photo) {
      try {
        // Upload photo to Cloudinary
        imageUrl = await uploadImageToCloudinary(photo);
        setPhotoURL(imageUrl); // Store the uploaded image URL
      } catch (error) {
        console.error("Failed to upload image", error);
        setLoading(false); // Reset loading state
        setError("Failed to upload image"); // Set error message
        return;
      }
    }

    // Construct restaurant data
    const restaurantData = {
      name,
      address: location,
      photo: imageUrl, // Store Cloudinary URL
      adminName: name,
      email,
      password,
      phoneNumber,
      location,
      restaurantName,
    };

    try {
      // Create the restaurant via API
      await createRestaurant(restaurantData);
      alert("Restaurant created successfully!");
      navigate("/login"); // Navigate to login after registration
    } catch (error) {
      console.error("Error creating restaurant:", error);
      setError("Error creating restaurant"); // Set error message
    } finally {
      setLoading(false); // Set loading to false
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
              Pizza
            </Typography>
          </Box>
          <Typography variant="h6" align="left" sx={{ width: "100%" }}>
            Register
          </Typography>
          <Divider sx={{ borderColor: "lightgray", width: "100%", mb: 2 }} />
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleRegister)}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              id="name"
              label="Admin Name"
              name="name"
              autoComplete="name"
              {...register("name")}
              error={!!errors.name} // Display error if validation fails
              helperText={errors.name ? errors.name.message : ""}
              sx={inputStyle}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
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
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
              sx={inputStyle}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="confirm-password"
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword ? errors.confirmPassword.message : ""
              }
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
              {...register("location")}
              error={!!errors.location}
              helperText={errors.location ? errors.location.message : ""}
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
              {...register("phoneNumber")}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber ? errors.phoneNumber.message : ""}
              sx={inputStyle}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              id="restaurantName"
              label="Restaurant Name"
              name="restaurantName"
              autoComplete="restaurantName"
              {...register("restaurantName")}
              error={!!errors.restaurantName}
              helperText={
                errors.restaurantName ? errors.restaurantName.message : ""
              }
              sx={inputStyle}
            />
            {/* Photo Upload */}
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadFile />}
              sx={{
                border: "1px dashed",
                width: "100%",
                height: 60,
                color: "#ff8c00",
              }}
            >
              Upload Restaurant Photo
              <input
                type="file"
                hidden
                onChange={(e) => setPhoto(e.target.files[0])} // Handle the file selection
              />
            </Button>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  sx={{ color: "orange" }}
                />
              }
              label="I Accept the Terms and Conditions"
            />
            <Button
              type="submit" // Change to submit type for form submission
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "orange" }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item xs>
                Already have an account?{" "}
                <Link
                  href="/login"
                  underline="none"
                  color="orange"
                  variant="body2"
                >
                  Login
                </Link>
              </Grid>
            </Grid>
          </Box>
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
