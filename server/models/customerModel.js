const sql = require("./db");

// Create a new customer
const createCustomer = async (email, password, location, phoneNumber) => {
  const [customer] = await sql`
    INSERT INTO customers (email, password, location, phone_number)
    VALUES (${email}, ${password}, ${location}, ${phoneNumber})
    RETURNING *;
  `;
  return customer;
};

// Get a customer by ID
const getCustomerById = async (customerId) => {
  const [customer] =
    await sql`SELECT * FROM customers WHERE id = ${customerId};`;
  if (!customer) {
    throw new Error(`Customer with ID ${customerId} not found.`);
  }
  return customer;
};

// Update a customer by ID
const updateCustomer = async (
  customerId,
  { email, password, location, phoneNumber }
) => {
  const [customer] = await sql`
    UPDATE customers
    SET 
      email = ${email}, 
      password = ${password}, 
      location = ${location}, 
      phone_number = ${phoneNumber},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${customerId}
    RETURNING *;
  `;
  if (!customer) {
    throw new Error(`Customer with ID ${customerId} not found.`);
  }
  return customer;
};

// Delete a customer by ID
const deleteCustomer = async (customerId) => {
  const [customer] = await sql`
    DELETE FROM customers WHERE id = ${customerId}
    RETURNING *;
  `;
  if (!customer) {
    throw new Error(`Customer with ID ${customerId} not found.`);
  }
  return customer;
};
const getCustomerByEmail = async (email) => {
  const [customer] = await sql`
    SELECT * FROM customers WHERE email = ${email};
  `;

  if (!customer) {
    throw new Error(`Customer with email ${email} not found.`);
  }

  return customer;
};
module.exports = {
  createCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomerByEmail,
};
