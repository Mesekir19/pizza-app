const sql = require("./db");

const createRestaurantInDB = async (
  name,
  address,
  photo,
  adminName,
  email,
  hashedPassword,
  phoneNumber,
  location
) => {
  const [restaurant] = await sql`
    INSERT INTO restaurants (name, address, photo, adminName, email, password, phoneNumber, location)
    VALUES (${name}, ${address}, ${photo}, ${adminName}, ${email}, ${hashedPassword}, ${phoneNumber}, ${location})
    RETURNING *;
  `;
  console.log("restaurant2", restaurant.photo);
  return restaurant;
};
const getAllRestaurantsFromDB = async () => {
  const restaurants = await sql`
    SELECT 
      restaurants.id,
      restaurants.name,
      restaurants.address,
      restaurants.photo,
      restaurants.email,
      restaurants.phoneNumber,
      restaurants.location,
      COUNT(orders.id) AS order_count
    FROM restaurants
    LEFT JOIN orders ON restaurants.id = orders.restaurant_id
    GROUP BY restaurants.id;
  `;
  return restaurants;
};
// Retrieve a restaurant by its ID (for admin management or other operations)
const getRestaurantById = async (id) => {
  const [restaurant] = await sql`
    SELECT * FROM restaurants WHERE id = ${id};
  `;
  return restaurant;
};

const getRestaurantByEmail = async (email) => {
  const [restaurant] =
    await sql`SELECT * FROM restaurants WHERE email = ${email};`;
  console.log("hey there");

  return restaurant;
};
// Update a restaurant's admin details or location
const updateRestaurantInDB = async (
  id,
  name,
  address,
  photo,
  adminName,
  email,
  hashedPassword,
  phoneNumber,
  location
) => {
  const [restaurant] = await sql`
    UPDATE restaurants
    SET name = ${name}, address = ${address}, photo = ${photo}, adminName = ${adminName}, email = ${email}, password = ${hashedPassword}, phoneNumber = ${phoneNumber}, location = ${location}
    WHERE id = ${id}
    RETURNING *;
  `;
  return restaurant;
};

// Update a restaurant's photo
const updateRestaurantPhotoInDB = async (restaurantId, photo) => {
  const [restaurant] = await sql`
    UPDATE restaurants
    SET photo = ${photo}
    WHERE id = ${restaurantId}
    RETURNING *;
  `;
  return restaurant;
};

module.exports = {
  createRestaurantInDB,
  updateRestaurantPhotoInDB,
  updateRestaurantInDB,
  getRestaurantById,
  getAllRestaurantsFromDB,
  getRestaurantByEmail,
};
