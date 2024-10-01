const sql = require("./db");

// Get all toppings
const getAllToppingsFromDB = async () => {
  const toppings = await sql`SELECT * FROM toppings;`;
  return toppings;
};

const getToppingByName = async (name) => {
  const [topping] = await sql`
    SELECT * FROM toppings WHERE name = ${name};
  `;
  return topping; // Will return undefined if not found
};
const createToppingInDB = async (name) => {
  const [newTopping] = await sql`
    INSERT INTO toppings (name)
    VALUES (${name})
    RETURNING *;
  `;
  return newTopping;
};
module.exports = { getAllToppingsFromDB, createToppingInDB, getToppingByName };
