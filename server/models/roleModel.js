const sql = require("./db");

const getRoles = async () => {
  try {
    const roles = await sql`
      SELECT id, role_name, status, permissions, created_at FROM roles;
    `;
    return roles;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw new Error("Error fetching roles");
  }
};
const getRoleById = async (roleId) => {
  const [role] = await sql`
    SELECT * FROM roles
    WHERE id = ${roleId};
  `;
  return role;
};
// Create a new role with status and permissions
const createRole = async (roleName, status = "active", permissions = []) => {
    const formattedPermissions = `{${permissions
      .map((per) => `"${per}"`)
      .join(",")}}`;

  try {
    const [role] = await sql`
      INSERT INTO roles (role_name, status, permissions)
      VALUES (${roleName}, ${status}, ${formattedPermissions}::text[])
      RETURNING *;
    `;
    return role;
  } catch (error) {
    console.error("Error creating role:", error);
    throw new Error("Error creating role");
  }
};

// Update a role's status and permissions
const updateRole = async (roleId, status) => {
  try {
    const [role] = await sql`
      UPDATE roles
      SET status = ${status}
      WHERE id = ${roleId}
      RETURNING *;
    `;
    return role;
  } catch (error) {
    console.error("Error updating role:", error);
    throw new Error("Error updating role");
  }
};

module.exports = { getRoles, createRole, updateRole, getRoleById };
