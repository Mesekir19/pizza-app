const { createPizzaInDB, getPizzasFromDB, updatePizzaPhotosInDB, getPizzasFromDB2 } = require("../models/pizzaModel");
const { getRestaurantById } = require("../models/restaurantModel");

// Get all pizzas (for both customers and managers)
const getPizzas = async (req, res) => {
  try {
    const pizzas = await getPizzasFromDB();
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pizzas" });
  }
};
const getAllPizzas = async (req, res) => {
  try {
    // Fetch all pizzas with their toppings from the database
    const pizzas = await getPizzasFromDB2();

    // Map through pizzas and fetch the restaurant details for each pizza
    const formattedPizzas = await Promise.all(
      pizzas.map(async (pizza) => {
        // Fetch the restaurant for each pizza using the restaurant_id
        const restaurant = await getRestaurantById(pizza.restaurant_id);
        const toppings = Array.isArray(pizza.toppings)
          ? pizza.toppings
              .filter((topping) => topping && topping.name) // Filter out null or invalid toppings
              .map((topping) => topping.name)
          : [];
        return {
          id: pizza.id,
          name: pizza.name,
          toppings, // Extract topping names
          price: pizza.price, // Assuming there's a price field
          photos: pizza.photos, // Array of photo URLs
          restaurant: {
            id: restaurant.id,
            name: restaurant.name,
            photo: restaurant.photo, // Restaurant photo
          },
        };
      })
    );

    // Send formatted pizzas as response
    res.status(200).json(formattedPizzas);
  } catch (error) {
    console.error("Error fetching pizzas:", error);
    res
      .status(500)
      .json({ message: "Error fetching pizzas", error: error.message });
  }
};
// Create a pizza with an array of photos
const createPizza = async (req, res) => {
  const { name, toppings, photos } = req.body;
  const restaurantId=1
  const description = "description";
  console.log("Creating pizza", name, description, toppings, restaurantId, photos)
  try {
    const newPizza = await createPizzaInDB(name, description, toppings, restaurantId, photos);
    res.status(201).json(newPizza);
  } catch (error) {
    res.status(500).json({ message: 'Error creating pizza' });
  }
};

// Update pizza's photos
const updatePizzaPhotos = async (req, res) => {
  const { id } = req.params;
  const { photos } = req.body;
  try {
    const updatedPizza = await updatePizzaPhotosInDB(id, photos);
    res.json(updatedPizza);
  } catch (error) {
    res.status(500).json({ message: 'Error updating pizza photos' });
  }
};

module.exports = { getPizzas, createPizza, updatePizzaPhotos, getAllPizzas };
