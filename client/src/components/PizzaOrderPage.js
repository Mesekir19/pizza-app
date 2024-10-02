import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import { keyframes } from "@mui/system";
import { createOrder } from "../api/orders";

// Keyframe animation for sliding effect
const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-100%);
  }
`;

export default function PizzaOrderPage() {
  // Get pizza details from the router state
  const { state } = useLocation();
  const { pizza } = state || {}; // Destructure the pizza data
  console.log(pizza);
  // State for handling order submission
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(pizza?.photos[0]);
  const [toppings, setToppings] = useState(
    pizza?.toppings.map((topping) => ({ label: topping, selected: true })) || []
  );
  const [isSliding, setIsSliding] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for order submission

  const handleQuantityChange = (delta) => {
    if (quantity + delta >= 1) setQuantity(quantity + delta);
  };

  const handleImageClick = (image) => {
    if (selectedImage !== image) {
      setIsSliding(true);
      setTimeout(() => {
        setSelectedImage(image);
        setIsSliding(false);
      }, 300);
    }
  };

  const handleToppingChange = (index) => {
    const updatedToppings = [...toppings];
    updatedToppings[index].selected = !updatedToppings[index].selected;
    setToppings(updatedToppings);
  };

  // Handle order submission
  const handleOrderSubmit = async () => {
    setLoading(true);

    try {
      // Prepare toppings array by filtering selected toppings
      const selectedToppings = toppings
        .filter((topping) => topping.selected)
        .map((topping) => topping.label); // Assuming toppings are strings
  const userId = localStorage.getItem("userId");

      const orderData = {
        customerId: userId, // Replace with dynamic customerId
        restaurantId: pizza.restaurant.id, // Restaurant ID from the pizza
        pizzaId: pizza.id, // Pizza ID
        quantity: quantity,
        toppings: selectedToppings, // Selected toppings
      };

      // Send the order data to the backend
      await createOrder(orderData);

      // alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      // alert("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  // Related Pizzas (Dummy data for now, replace with dynamic data)
  const relatedPizzas = Array(5).fill({
    name: "Margherita",
    description: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
    img: "fullpizza.png", // Replace with your image path
  });

  if (!pizza) {
    return <Typography variant="h5">Pizza not found!</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      {/* Pizza Details Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 4,
          width: "100%",
          maxWidth: "1200px",
          mb: 8,
        }}
      >
        {/* Pizza Image and Thumbnails */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="div"
            sx={{
              position: "relative",
              width: 300,
              height: 300,
              overflow: "hidden",
              mb: 2,
              borderRadius: "50%",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              component="img"
              src={selectedImage}
              alt="Pizza"
              key={selectedImage}
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
                animation: isSliding
                  ? `${slideOut} 0.3s ease-out`
                  : `${slideIn} 0.3s ease-out`,
              }}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, ml: 5 }}>
            {pizza.photos.map((img, index) => (
              <Box
                key={index}
                component="img"
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleImageClick(img)}
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  cursor: "pointer",
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                  border: selectedImage === img ? "2px solid #F59E0B" : "none",
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Pizza Details and Order Section */}
        <Box>
          <Typography variant="h3" fontWeight="bold">
            {pizza.name}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            {toppings.map((topping, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={topping.selected}
                    onChange={() => handleToppingChange(index)}
                    sx={{
                      color: "#F59E0B",
                      "&.Mui-checked": { color: "#F59E0B" },
                    }}
                  />
                }
                label={topping.label}
              />
            ))}
          </Box>

          {/* Quantity and Price */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mt: 4,
              backgroundColor: "white",
              padding: "10px 20px",
              borderRadius: "10px",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
              maxWidth: "40%",
            }}
          >
            {/* Quantity Control */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                onClick={() => handleQuantityChange(-1)}
                size="small"
                sx={{ color: "#F59E0B" }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="h6">{quantity}</Typography>
              <IconButton
                onClick={() => handleQuantityChange(1)}
                size="small"
                sx={{ color: "#F59E0B" }}
              >
                <AddIcon />
              </IconButton>
            </Box>

            {/* Price */}
            <Typography variant="h5" fontWeight="bold" color="#22C55E">
              {pizza.price * quantity} Birr
            </Typography>
          </Box>

          {/* Order Button */}
          <Button
            variant="contained"
            color="warning"
            size="large"
            sx={{ mt: 4, fontWeight: "bold", fontSize: "1rem" }}
            startIcon={<ShoppingCartIcon />}
            onClick={handleOrderSubmit}
            disabled={loading}
          >
            {loading ? "Ordering..." : "Order"}
          </Button>
        </Box>
      </Box>

      {/* Related Pizzas Section */}
      <Box sx={{ width: "100%", maxWidth: "1200px" }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Related
        </Typography>
        <Grid container spacing={2}>
          {relatedPizzas.map((pizza, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                  borderRadius: "20px",
                  padding: "20px",
                }}
              >
                <CardMedia
                  component="img"
                  height="200px"
                  image={pizza.img}
                  alt={pizza.name}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {pizza.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {pizza.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
