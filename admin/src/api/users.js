import api from "./api";

// Update user status
export const updateUserStatus = async (userId, status) => {
  const response = await api.put(`/users/${userId}/status`, { status });
  return response.data;
};
