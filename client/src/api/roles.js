import api from "./api";

// Create a new role (for customers)
export const createRole = async (roleData) => {
  const response = await api.post("/roles", roleData);
  return response.data;
};

// Update role status (for restaurant managers)
export const updateRoleStatus = async (roleId, status) => {
  const response = await api.put(`/roles/${roleId}`, { status });
  return response.data;
};

// Get all roles (for restaurant managers)
export const getRoles = async () => {
  const response = await api.get("/roles");
  return response.data;
};

export const getRoleById = async (roleId) => {
  const response = await api.get(`/roles/${roleId}`);
  return response.data;
};
