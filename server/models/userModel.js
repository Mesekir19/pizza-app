const sql = require("./db");

const createUser = async (
  name,
  email,
  password,
  role,
  restaurantId = null,
  status = "active"
) => {
  const [user] = await sql`
    INSERT INTO users (name, email, password, role, restaurant_id, status)
    VALUES (${name}, ${email}, ${password}, ${role}, ${restaurantId}, ${status})
    RETURNING *;
  `;
  return user;
};

// Update a user's status
const updateUserStatus = async (userId, status) => {
  const [user] = await sql`
    UPDATE users
    SET status = ${status}
    WHERE id = ${userId}
    RETURNING *;
  `;
  return user;
};

const getUserByEmail = async (email) => {
  const [user] = await sql`SELECT * FROM users WHERE email = ${email};`;
  return user;
};

const getUsersByRestaurantId = async (restaurantId) => {
  if (typeof restaurantId !== "number") {
    throw new Error("Invalid restaurantId: restaurantId should be an integer.");
  }

  const users = await sql`
    SELECT * FROM users WHERE restaurant_id = ${restaurantId};
  `;
  return users; // Returns an array of users
};
module.exports = {
  createUser,
  getUserByEmail,
  updateUserStatus,
  getUsersByRestaurantId,
};
