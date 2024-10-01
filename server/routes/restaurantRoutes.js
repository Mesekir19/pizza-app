const express = require("express");
const {
  createRestaurant,
  getRestaurant,
  updateRestaurant,
  getAllRestaurants,
} = require("../controllers/restaurantController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Create a new restaurant (protected)
router.post("/", createRestaurant);
router.get("/", getAllRestaurants);
// Get a restaurant by ID (protected)
router.get("/:id", authMiddleware, getRestaurant);

// Update restaurant details (protected)
router.put("/:id", authMiddleware, updateRestaurant);

module.exports = router;
