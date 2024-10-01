import api from "./api";

// Update user status
export const createCustomer = async (customerData) => {
  const response = await api.post(`/customers`, customerData );
  return response.data;
};
