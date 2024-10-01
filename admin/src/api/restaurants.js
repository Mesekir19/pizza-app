import api from "./api";

// Create a new restaurant
export const createRestaurant = async (restaurantData) => {
  const response = await api.post("/restaurants", restaurantData);
  return response.data;
};

// Update a restaurant's details
export const updateRestaurant = async (restaurantId, restaurantData) => {
  const response = await api.put(
    `/restaurants/${restaurantId}`,
    restaurantData
  );
  return response.data;
};

// Get restaurant by ID
export const getRestaurant = async (restaurantId) => {
  const response = await api.get(`/restaurants/${restaurantId}`);
  return response.data;
};
