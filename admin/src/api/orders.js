import api from "./api";

export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

// Update order status (for restaurant managers)
export const updateOrderStatus = async (orderId, status) => {
  const response = await api.put(`/orders/${orderId}`, { status });
  return response.data;
};

// Get all orders (for restaurant managers)
export const getOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};
