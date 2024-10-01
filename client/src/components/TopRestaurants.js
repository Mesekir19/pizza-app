import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import { getRestaurant } from "../api/restaurants";

const TopRestaurants = () => {
   const [restaurants, setRestaurants] = useState([]);

   // Fetch pizzas from the backend API
   useEffect(() => {
     const fetchPizzas = async () => {
       try {
         const response = await getRestaurant(); // Adjust the endpoint as needed
         setRestaurants(response); // Store the fetched pizzas in state
         console.log(response);
       } catch (error) {
         console.error("Error fetching pizzas:", error);
       }
     };

     fetchPizzas();
   }, []);
  return (
    <Box sx={{ padding: 10 }}>
      <Typography variant="h3" sx={{ color: "gray" }} gutterBottom>
        Top Restaurants
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollbarWidth: "none",
          paddingBottom: 2,
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: "10px",
          },
          gap: 2,
        }}
      >
        {restaurants.map((restaurant, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 2,
              borderRadius: 2,
              backgroundColor: "background.paper",
              boxShadow: 1,
              minWidth: 280,
              flexShrink: 0, // Prevent shrinking when scrolling
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                alt={restaurant.name}
                src={restaurant.photo}
                sx={{ width: 56, height: 56, marginRight: 2 }}
              />
              <CardContent sx={{ padding: 0 }}>
                <Typography variant="h6">{restaurant.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {restaurant.location}
                </Typography>
              </CardContent>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 1,
                backgroundColor: "action.hover",
                borderRadius: 1,
                minWidth: 80,
              }}
            >
              <Typography
                sx={{
                  color: "warning.main",
                  fontWeight: "bold",
                  fontSize: "24px",
                }}
              >
                {restaurant.order_count}
              </Typography>
              <Typography variant="caption" sx={{ marginLeft: 1 }}>
                Orders
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default TopRestaurants;
