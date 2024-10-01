const express = require("express");
const {
  createNewCustomer,
  getCustomer,
  updateCustomerById,
  deleteCustomerById,
  loginCustomer,
} = require("../controllers/customerController");
const router = express.Router();

// Create a new customer
router.post("/", createNewCustomer);

router.post("/login", loginCustomer);
// Get a customer by ID
router.get("/:customerId", getCustomer);

// Update a customer by ID
router.put("/:customerId", updateCustomerById);
// Delete a customer by ID
router.delete("/:customerId", deleteCustomerById);

module.exports = router;
