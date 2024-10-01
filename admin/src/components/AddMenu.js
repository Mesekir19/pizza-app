import React, { useState, useEffect } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { Add, UploadFile } from "@mui/icons-material";
import axios from "axios"; // To make API requests
import { createPizza, getToppings, creatToppings } from "../api/pizzas";

const AddMenuForm = () => {
  const [toppings, setToppings] = useState([]); // State for dynamic toppings
  const [selectedToppings, setSelectedToppings] = useState({}); // State to track selected toppings
  const [showInput, setShowInput] = useState(false); // Track input visibility for new topping
  const [newTopping, setNewTopping] = useState(""); // Track new topping value
  const [name, setName] = useState(""); // Pizza name
  const [price, setPrice] = useState(""); // Pizza price
  const [photos, setPhotos] = useState([]); // Store the selected photos
  const [photoURLs, setPhotoURLs] = useState([]); // Store the uploaded image URLs

  // Fetch existing toppings from the backend
  useEffect(() => {
    const fetchToppings = async () => {
      try {
        const response = await getToppings(); // Fetch toppings from the API
        const toppingsData = response;
        setToppings(toppingsData);
        console.log(toppingsData)
      } catch (error) {
        console.error("Error fetching toppings:", error);
      }
    };
    fetchToppings();
  }, []);

  // Handle the checkbox changes for selected toppings
  const handleToppingChange = (event, toppingId) => {
    setSelectedToppings({
      ...selectedToppings,
      [toppingId]: event.target.checked,
    });
  };


  const handleAddClick = () => {
    setShowInput(true); // Show input when "Add" is clicked
  };

  const handleNewToppingChange = (event) => {
    setNewTopping(event.target.value); // Update new topping value
  };

  // const handleAddTopping = () => {
  //   if (newTopping) {
  //     // Add new topping to the toppings list and set it as selected
  //     const newToppingObj = { name: newTopping, selected: true };
  //     setToppings((prev) => [...prev, newToppingObj]);
  //     setSelectedToppings((prev) => ({
  //       ...prev,
  //       [newTopping]: true,
  //     }));
  //     setNewTopping(""); // Clear input after adding
  //     setShowInput(false); // Hide input after adding
  //   }
  // };

  // Function to upload multiple images to Cloudinary
  const handleAddTopping = async () => {
    if (newTopping) {
      try {
        // Call the API to create a new topping in the backend
        const response = await creatToppings({ name: newTopping });

        // If the API request is successful, add the new topping to the state
        const newToppingObj = { name: response.name, selected: true }; // Assuming response contains the created topping

        // Update the toppings state and mark the new topping as selected
        setToppings((prev) => [...prev, newToppingObj]);
        setSelectedToppings((prev) => ({
          ...prev,
          [newTopping]: true,
        }));

        setNewTopping(""); // Clear the input field
        setShowInput(false); // Hide the input field
      } catch (error) {
        console.error("Error creating topping:", error);
        alert("Failed to create topping");
      }
    }
  };

  const uploadImagesToCloudinary = async (images) => {
    const uploadedImagesURLs = [];

    for (let image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "upload"); // Replace with your Cloudinary upload preset

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_IMAGE_URL}`, // Replace with your Cloudinary cloud name
          formData
        );
        uploadedImagesURLs.push(response.data.secure_url); // Push each uploaded image's URL to the array
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw error;
      }
    }

    return uploadedImagesURLs; // Return an array of uploaded image URLs
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Upload the photos to Cloudinary if there are images
    let imageUrls = [];
    if (photos.length > 0) {
      try {
        imageUrls = await uploadImagesToCloudinary(photos);
        setPhotoURLs(imageUrls); // Store the uploaded image URLs
      } catch (error) {
        console.error("Failed to upload images", error);
        return;
      }
    }

    // Step 2: Get the selected toppings
    const selectedToppingsArray = Object.keys(selectedToppings).filter(
      (topping) => selectedToppings[topping]
    );

    // Step 3: Construct the pizza data object
    const pizzaData = {
      name,
      price,
      toppings: selectedToppingsArray, // Pass the array of selected toppings
      photos: imageUrls, // Array of Cloudinary URLs for the images
    };

    // Step 4: Send the pizza data to the backend API
    try {
      await createPizza(pizzaData); // Replace with the correct pizza API endpoint
      alert("Pizza added successfully!");
    } catch (error) {
      console.error("Error adding pizza:", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        backgroundColor: "white",
      }}
      component="form"
      onSubmit={handleSubmit} // Handle the form submission
    >
      <Typography variant="h5" component="h1">
        Add Menu
      </Typography>

      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <Typography
        variant="h6"
        component="h2"
        align="left"
        sx={{ width: "100%" }}
      >
        Toppings
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          width: "100%",
          alignItems: "center",
        }}
      >
        {/* Render the toppings dynamically */}
        {toppings?.map((topping) => (
          <FormControlLabel
            key={topping.id}
            control={
              <Checkbox
                checked={!!selectedToppings[topping.id]}
                color="warning"
                onChange={(event) => handleToppingChange(event, topping.id)}
                name={topping.name}
                sx={{ color: "#ff8100" }} // Apply the orange color to the checkboxes
              />
            }
            label={topping.name.charAt(0).toUpperCase() + topping.name.slice(1)}
          />
        ))}

        {/* Show input field to add new topping */}
        {showInput && (
          <TextField
            label="Topping name"
            variant="outlined"
            value={newTopping}
            onChange={handleNewToppingChange}
            size="small"
            sx={{ width: 150 }}
          />
        )}

        <Button
          variant="contained"
          color="warning"
          startIcon={<Add />}
          onClick={showInput ? handleAddTopping : handleAddClick}
          sx={{ height: "40px", ml: 1, backgroundColor: "#ff8100" }}
        >
          {showInput ? "Add" : ""}
        </Button>
      </Box>

      <TextField
        label="Price"
        variant="outlined"
        fullWidth
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

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
        Upload Pizza Photos
        <input
          type="file"
          multiple
          hidden
          onChange={(e) => setPhotos([...e.target.files])} // Handle multiple file selection
        />
      </Button>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "#ff8100",
          "&:hover": {
            backgroundColor: "#e07b00",
          },
          color: "#fff",
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default AddMenuForm;
