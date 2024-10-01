const {
  createRestaurantInDB,
  updateRestaurantPhotoInDB,
  getRestaurantById,
  updateRestaurantInDB,
  getAllRestaurantsFromDB,
} = require("../models/restaurantModel");
const bcrypt = require("bcrypt");
const createRestaurant = async (req, res) => {
  const {
    name,
    address,
    photo,
    adminName,
    email,
    password,
    phoneNumber,
    location,
  } = req.body;
  console.log("restaurant", photo);

  try {
    // Hash the admin password
    const hashedPassword = await bcrypt.hash(password, 10);
  console.log("restaurant", photo);

    const newRestaurant = await createRestaurantInDB(
      name,
      address,
      photo,
      adminName,
      email,
      hashedPassword,
      phoneNumber,
      location
    );
  console.log("restaurant3", photo);

    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ message: "Error creating restauranthjjhhj", error });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await getAllRestaurantsFromDB(); // Fetch restaurants from the model

    // Return the list of restaurants
    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res
      .status(500)
      .json({ message: "Error fetching restaurants", error: error.message });
  }
};
// Get restaurant details by ID
const getRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await getRestaurantById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurant", error });
  }
};

// Update restaurant admin details or location
const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    address,
    photo,
    adminName,
    email,
    password,
    phoneNumber,
    location,
  } = req.body;

  try {
    // Hash the new password if provided
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const updatedRestaurant = await updateRestaurantInDB(
      id,
      name,
      address,
      photo,
      adminName,
      email,
      hashedPassword,
      phoneNumber,
      location
    );
    res.json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ message: "Error updating restaurant", error });
  }
};

// Update restaurant's photo
const updateRestaurantPhoto = async (req, res) => {
  const { id } = req.params;
  const { photo } = req.body;
  try {
    const updatedRestaurant = await updateRestaurantPhotoInDB(id, photo);
    res.json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ message: "Error updating restaurant photo" });
  }
};

module.exports = {
  createRestaurant,
  updateRestaurantPhoto,
  updateRestaurant,
  getRestaurant,
  getAllRestaurants,
};
