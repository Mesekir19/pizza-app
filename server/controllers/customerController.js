const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  createCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomerByEmail,
} = require("../models/customerModel");

// Create a new customer
const createNewCustomer = async (req, res) => {
  const { email, password, location, phoneNumber } = req.body;
  try {
    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    // Create a new customer with the hashed password
    const newCustomer = await createCustomer(
      email,
      hashedPassword, // Use the hashed password
      location,
      phoneNumber
    );
    res.status(201).json({
      message: "Customer created successfully",
      customer: newCustomer,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating customer", error: error.message });
  }
};

// Get a customer by ID
const getCustomer = async (req, res) => {
  const { customerId } = req.params;
  try {
    const customer = await getCustomerById(customerId);
    res.status(200).json(customer);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Customer not found", error: error.message });
  }
};

// Update a customer by ID
const updateCustomerById = async (req, res) => {
  const { customerId } = req.params;
  const { email, password, location, phoneNumber } = req.body;
  try {
    // Hash the password if it's provided
    let hashedPassword = password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const updatedCustomer = await updateCustomer(customerId, {
      email,
      password: hashedPassword, // Use the hashed password or existing password
      location,
      phoneNumber,
    });
    res.status(200).json({
      message: "Customer updated successfully",
      customer: updatedCustomer,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating customer", error: error.message });
  }
};
const loginCustomer = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find customer by email
    const customer = await getCustomerByEmail(email);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: customer.id, email: customer.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token valid for 1 hour
    );

    res.status(200).json({
      message: "Login successful",
      token, // Return the JWT token to the client
      userId:customer.id,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
// Delete a customer by ID
const deleteCustomerById = async (req, res) => {
  const { customerId } = req.params;
  try {
    const deletedCustomer = await deleteCustomer(customerId);
    res.status(200).json({
      message: "Customer deleted successfully",
      customer: deletedCustomer,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting customer", error: error.message });
  }
};

module.exports = {
  createNewCustomer,
  getCustomer,
  updateCustomerById,
  deleteCustomerById,
  loginCustomer,
};
