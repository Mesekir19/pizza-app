import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import { getOrdersByCustomerId } from "../api/orders"; // Assume you have this function to fetch orders

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem("userId"); // Get user ID from local storage
      try {
        const response = await getOrdersByCustomerId(userId); // Fetch orders for the user
        setOrders(response);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Box sx={{ padding: 3, borderRadius: 2 }}>
      <Typography variant="h3" sx={{ color: "gray" }} gutterBottom>
        Order History
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {orders.map((order, index) => (
          <Card
            key={index}
            sx={{
              width: 300,
              borderRadius: 2,
              padding: 2,
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#fff", // Card background color
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
                src={order.pizza_photo} // Assuming you have a photo field in the order
                alt={order.pizza_name} // Assuming you have a pizza_name field in the order
                width={150}
                height={150}
                style={{ borderRadius: "50%" }}
              />
            </Box>

            {/* Pizza Info */}
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6" component="div">
                {order.pizza_name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Toppings:{" "}
                {order.toppings.map((topping) => topping.name).join(", ")}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Quantity: {order.quantity}
              </Typography>
              <Typography variant="h4" color="green" gutterBottom>
                Price: {order.price} Birr
              </Typography>
            </CardContent>

            {/* Order Status */}
            <Divider />
            <Box sx={{ width: "100%", textAlign: "center", padding: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  color: order.status === "Preparing" ? "orange" : "green", // Conditional color based on status
                  fontWeight: "bold",
                }}
              >
                Status: {order.status}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default OrderHistory;
