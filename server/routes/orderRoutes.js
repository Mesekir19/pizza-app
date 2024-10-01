const express = require('express');
const { createOrder, updateOrderStatus, getOrder } = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const abilityMiddleware = require('../middlewares/abilityMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createOrder);
router.get("/", authMiddleware, getOrder);

router.put('/:id', authMiddleware, updateOrderStatus);

module.exports = router;
