const sql = require("./db");
const { getToppingByName } = require("./toppingModel");

// Create an order
const createOrderInDB = async (customerId, restaurantId, pizzaId, quantity, toppings) => {
  // Insert order into the orders table
  const [order] = await sql`
    INSERT INTO orders (customer_id, restaurant_id, pizza_id, status, quantity)
    VALUES (${customerId}, ${restaurantId}, ${pizzaId}, 'Preparing',${quantity})
    RETURNING *;
  `;

  // If toppings are provided, convert their names to IDs and insert them into the order_toppings table
  if (toppings && toppings.length) {
    for (let toppingName of toppings) {
      const topping = await getToppingByName(toppingName); // Get topping object
      if (topping) {
        const toppingId = topping.id; // Extract the topping ID from the object
        await sql`
          INSERT INTO order_toppings (order_id, topping_id)
          VALUES (${order.id}, ${toppingId});
        `;
      } else {
        console.error(`Topping not found: ${toppingName}`);
      }
    }
  }

  return order;
};
const getOrdersFromDB = async () => {
  // Fetch all orders with their associated pizza and customer details
  const orders = await sql`
    SELECT o.id, o.customer_id, o.restaurant_id, o.pizza_id, o.status, o.order_date,o.quantity, c.phone_number AS customer_phone, p.name AS pizza_name
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    JOIN pizzas p ON o.pizza_id = p.id;
  `;

  // Fetch toppings for each order
  for (let order of orders) {
    const toppings = await sql`
      SELECT t.name
      FROM order_toppings ot
      JOIN toppings t ON ot.topping_id = t.id
      WHERE ot.order_id = ${order.id};
    `;
    order.toppings = toppings; // Attach toppings to the order object
  }

  return orders;
};

const getOrdersByCustomerId = async (customerId) => {
  // Fetch all orders for a specific customer
  const orders = await sql`
    SELECT 
      o.id, 
      o.customer_id, 
      o.restaurant_id, 
      o.pizza_id, 
      o.status, 
      o.order_date, 
      o.quantity, 
      c.phone_number AS customer_phone, 
      p.name AS pizza_name,
      p.photos[1] AS pizza_photo -- Assuming 'photos' is an array and you want the first photo
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    JOIN pizzas p ON o.pizza_id = p.id
    WHERE o.customer_id = ${customerId};  -- Filter by customer ID
  `;

  // Fetch toppings for each order
  for (let order of orders) {
    const toppings = await sql`
      SELECT t.name
      FROM order_toppings ot
      JOIN toppings t ON ot.topping_id = t.id
      WHERE ot.order_id = ${order.id};
    `;
    order.toppings = toppings; // Attach toppings to the order object
  }

  return orders;
};


// Update order status
const updateOrderStatusInDB = async (orderId, status) => {
  const [order] = await sql`
    UPDATE orders
    SET status = ${status}
    WHERE id = ${orderId}
    RETURNING *;
  `;
  return order;
};

module.exports = {
  createOrderInDB,
  updateOrderStatusInDB,
  getOrdersFromDB,
  getOrdersByCustomerId,
};
