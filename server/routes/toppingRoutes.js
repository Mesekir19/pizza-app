const express = require("express");
const { getAllToppings, createTopping } = require("../controllers/toppingController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getAllToppings);
router.post("/",authMiddleware, createTopping);

module.exports = router;
