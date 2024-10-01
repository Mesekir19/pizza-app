const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const pizzaRoutes = require("./routes/pizzaRoutes");
const orderRoutes = require("./routes/orderRoutes");
const toppingRoutes = require("./routes/toppingRoutes");
const roleRoutes = require("./routes/roleRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const customerRoutes = require("./routes/customerRoutes");



require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/pizzas", pizzaRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/toppings", toppingRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/customers", customerRoutes);
app.get("/",(req, res) => {
  res.json({message:"Hello from thr backend"})
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
