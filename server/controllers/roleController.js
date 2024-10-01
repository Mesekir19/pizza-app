const { createRole, updateRole, getRoles, getRoleById } = require("../models/roleModel");

// Create a role with a status and permissions
const createRoleController = async (req, res) => {
  const { roleName, status, permissions } = req.body;
  console.log("Creating role", roleName, status, permissions);
  try {
    const role = await createRole(roleName, status, permissions);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: "Error creating role" });
  }
};

const getRolesController = async (req, res) => {
  try {
    const roles = await getRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving roles" });
  }
};

const getRoleByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await getRoleById(id);
    if (role) {
      res.json(role);
    } else {
      res.status(404).json({ message: "Role not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving role" });
  }
};
// Update role status and permissions
const updateRoleController = async (req, res) => {
  const { id } = req.params;
  const { status, permissions } = req.body;
  try {
    const updatedRole = await updateRole(id, status);
    res.json(updatedRole);
  } catch (error) {
    res.status(500).json({ message: "Error updating role" });
  }
};

module.exports = {
  createRoleController,
  updateRoleController,
  getRolesController,
  getRoleByIdController,
};
