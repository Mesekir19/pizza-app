const {
  getAllToppingsFromDB,
  createToppingInDB,
} = require("../models/toppingModel");

// Get all toppings
const getAllToppings = async (req, res) => {
  try {
    const toppings = await getAllToppingsFromDB();
    res.json(toppings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching toppings" });
  }
};

const fetchTopping = async (req, res) => {
  const { name } = req.params; // Assuming the name is passed as a URL parameter
  try {
    const topping = await getToppingByName(name);
    if (topping) {
      res.status(200).json(topping);
    } else {
      res.status(404).json({ message: "Topping not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching topping", error: error.message });
  }
};
const createTopping = async (req, res) => {
  const { name } = req.body; // Assuming topping name is provided in the request body

  if (!name) {
    return res.status(400).json({ message: "Topping name is required" });
  }

  try {
    const newTopping = await createToppingInDB(name);
    res.status(201).json(newTopping); // Send back the newly created topping
  } catch (error) {
    res.status(500).json({ message: "Error creating topping" });
  }
};

module.exports = { getAllToppings, createTopping, fetchTopping };
