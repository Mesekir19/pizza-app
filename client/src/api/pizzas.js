import api from "./api";

// Get all pizzas
export const getPizzas = async () => {
  const response = await api.get("/pizzas/all");
  return response.data;
};

// Create a new pizza (for restaurant managers)
export const createPizza = async (pizzaData) => {
  const response = await api.post("/pizzas", pizzaData);
  return response.data;
};

// Get all toppings (for creating a pizza)
export const getToppings = async () => {
  const response = await api.get("/toppings");
  return response.data;
};

export const creatToppings = async (topping) => {
  const response = await api.post("/toppings", topping);
  return response.data;
};
