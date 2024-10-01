const express = require("express");
const { fetchUsersByRestaurant, changeUserStatus } = require("../controllers/userController");
const router = express.Router();

router.get("/userByrestId/:restaurantId", fetchUsersByRestaurant);
router.put("/status/:userId", changeUserStatus);
module.exports = router;
