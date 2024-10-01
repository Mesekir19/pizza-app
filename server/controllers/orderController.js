const {
  createOrderInDB,
  updateOrderStatusInDB,
  getOrdersFromDB,
} = require("../models/orderModel");

// Create an order (for customers)
const createOrder = async (req, res) => {
  const { customerId, restaurantId, pizzaId,quantity, toppings } = req.body;

  try {
    const newOrder = await createOrderInDB(
      customerId,
      restaurantId,
      pizzaId,
      quantity,
      toppings
    );
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error placing order:", error); // Log the exact error
    res.status(500).json({ message: "Error placing order" });
  }
};

const getOrder= async (req, res) => {
  try {
    const orders = await getOrdersFromDB();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
// Update order status (for restaurant managers)
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log("sjhdj",id,status);

  try {
    const updatedOrder = await updateOrderStatusInDB(id, status);
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating order status" });
  }
};

module.exports = { createOrder, updateOrderStatus, getOrder };
