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
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { createRestaurant } from "../../api/restaurants";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [rememberMe, setRememberMe] = useState(false);
  const [photo, setPhoto] = useState(null); // State for handling the selected photo
  const [photoURL, setPhotoURL] = useState(""); // State for storing uploaded image URL
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    let imageUrl = "";
    if (photo) {
      try {
        // Upload photo to Cloudinary
        imageUrl = await uploadImageToCloudinary(photo);
        setPhotoURL(imageUrl); // Store the uploaded image URL
      } catch (error) {
        console.error("Failed to upload image", error);
        return;
      }
    }

    // Construct restaurant data
    const restaurantData = {
      name: restaurantName,
      address: location,
      photo: imageUrl, // Store Cloudinary URL
      adminName: name,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      location: location,
    };

    try {
      // Create the restaurant via API
      await createRestaurant(restaurantData);
      alert("Restaurant created successfully!");
      navigate("/login"); // Navigate to login after registration
    } catch (error) {
      console.error("Error creating restaurant:", error);
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
          <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              id="name"
              label="Admin Name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              onChange={(e) => setPhoneNumber(parseInt(e.target.value, 10))}
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
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
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
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "orange" }}
              onClick={handleSubmit}
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
        </Box>
      </Grid>
    </Grid>
  );
}
