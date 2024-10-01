const { AbilityBuilder, Ability } = require("@casl/ability");

const defineAbilitiesFor = (user) => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (user.role === "super-admin") {
    can("manage", "Order"); // Restaurant managers can manage orders
    can("manage", "Pizza"); // Restaurant managers can manage pizzas and toppings
  } else if (user.role === "customer") {
    can("read", "Pizza"); // Customers can view pizzas
    can("create", "Order"); // Customers can create orders
    can("read", "Order", { customerId: user.id }); // Customers can only read their own orders
  }

  return build();
};

const abilityMiddleware = (action, subject) => {
  return (req, res, next) => {
    const ability = defineAbilitiesFor(req.user);
    if (ability.can(action, subject)) {
      return next();
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
  };
};

module.exports = abilityMiddleware;
