import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Divider,
} from "@mui/material";
import { getPizzas } from "../api/pizzas";

const PopularPizzas = () => {
  const [pizzas, setPizzas] = useState([]);
  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await getPizzas(); // Fetch pizzas from API
        setPizzas(response); // Store the fetched pizzas in state
      } catch (error) {
        console.error("Error fetching pizzas:", error);
      }
    };

    fetchPizzas();
  }, []);

  // Handle Order Button Click
  const handleOrderClick = (pizza) => {
    navigate("/order", { state: { pizza } }); // Navigate to the order page with pizza data
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" sx={{ color: "gray" }} gutterBottom>
        Popular Pizzas
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {pizzas.map((pizza, index) => (
          <Card
            key={index}
            sx={{
              width: 280,
              borderRadius: 2,
              padding: 2,
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Pizza Image */}
            <Box
              sx={{
                background:
                  "linear-gradient(to bottom right, #ffecd2, #fcb69f)",
                borderRadius: "50%",
                alignItems: "center",
              }}
            >
              <img
                src={pizza.photos[0]}
                alt={pizza.name}
                width={150}
                height={150}
                style={{ borderRadius: "50%" }}
              />
            </Box>

            {/* Pizza Info */}
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6" component="div">
                {pizza.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {pizza.toppings?.join(", ")}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-around"
              >
                <Typography variant="h4" color="green">
                  {pizza.price} Birr
                </Typography>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleOrderClick(pizza)} // Navigate on button click
                >
                  Order
                </Button>
              </Box>
            </CardContent>

            {/* Restaurant Info */}
            <Divider />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: 2,
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Avatar
                alt={pizza.restaurant.name}
                src={pizza.restaurant.photo}
              />
              <Typography variant="subtitle2" sx={{ marginLeft: 1 }}>
                {pizza.restaurant.name}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PopularPizzas;
