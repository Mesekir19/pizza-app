const express = require("express");
const {
  createRoleController,
  updateRoleController,
  getRolesController,
  getRoleByIdController,
} = require("../controllers/roleController");

const router = express.Router();

// Route to create a new role
router.post("/", createRoleController);
router.get("/", getRolesController);
router.get("/:id", getRoleByIdController);
// Route to update a role's status and permissions
router.put("/:id", updateRoleController);

module.exports = router;
