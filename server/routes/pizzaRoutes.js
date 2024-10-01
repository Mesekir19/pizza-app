const express = require("express");
const { getPizzas, createPizza, getAllPizzas } = require("../controllers/pizzaController");
const authMiddleware = require("../middlewares/authMiddleware");
const abilityMiddleware = require("../middlewares/abilityMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getPizzas);
router.get("/all", getAllPizzas);
router.post(
  "/",
  authMiddleware,
  abilityMiddleware("create", "Pizza"),
  createPizza
);

module.exports = router;
