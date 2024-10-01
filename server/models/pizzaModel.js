const sql = require("./db");

// Get all pizzas
const getPizzasFromDB = async () => {
  const pizzas = await sql`
    SELECT pizzas.*, json_agg(toppings.*) AS toppings
    FROM pizzas
    LEFT JOIN pizza_toppings ON pizzas.id = pizza_toppings.pizza_id
    LEFT JOIN toppings ON pizza_toppings.topping_id = toppings.id
    GROUP BY pizzas.id;
  `;
  return pizzas;
};

// Create a pizza with photos
const createPizzaInDB = async (
  name,
  description,
  toppings,
  restaurantId,
  photos
) => {
  if (!Array.isArray(photos)) {
    throw new Error("Photos must be an array.");
  }

  // Manually format the photos array for PostgreSQL
  const formattedPhotos = `{${photos.map((photo) => `"${photo}"`).join(",")}}`;

  try {
    const [pizza] = await sql`
      INSERT INTO pizzas (name, description, restaurant_id, photos)
      VALUES (${name}, ${description}, ${restaurantId}, ${formattedPhotos}::text[])
      RETURNING *;
    `;
    console.log("Pizza inserted:", pizza);

    // Insert toppings for the pizza
    if (toppings && toppings.length) {
      for (let toppingId of toppings) {
        await sql`
          INSERT INTO pizza_toppings (pizza_id, topping_id)
          VALUES (${pizza.id}, ${toppingId});
        `;
      }
    }

    return pizza;
  } catch (error) {
    console.error("Error in createPizzaInDB:", error); // Log the error details
    throw error;
  }
};
const getPizzasFromDB2 = async () => {
  const pizzas = await sql`
    SELECT pizzas.*, json_agg(toppings.*) AS toppings
    FROM pizzas
    LEFT JOIN pizza_toppings ON pizzas.id = pizza_toppings.pizza_id
    LEFT JOIN toppings ON pizza_toppings.topping_id = toppings.id
    GROUP BY pizzas.id;
  `;
  return pizzas;
};

// Update a pizza's photos
const updatePizzaPhotosInDB = async (pizzaId, photos) => {
  const [pizza] = await sql`
    UPDATE pizzas
    SET photos = ${sql.array(photos)}
    WHERE id = ${pizzaId}
    RETURNING *;
  `;
  return pizza;
};

module.exports = {
  getPizzasFromDB,
  createPizzaInDB,
  updatePizzaPhotosInDB,
  getPizzasFromDB2,
};
