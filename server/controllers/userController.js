const { getUsersByRestaurantId, updateUserStatus } = require("../models/userModel");

const fetchUsersByRestaurant = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    console.log("Raw restaurantId from params:", restaurantId); // Debugging the raw value

    // Convert restaurantId to an integer
    const id = parseInt(restaurantId, 10);

    console.log("Parsed restaurantId:", id); // Debugging the parsed value

    if (isNaN(id) || id <= 0) {
      return res
        .status(400)
        .json({
          message: "Invalid restaurant ID. It should be a positive integer.",
        });
    }

    const users = await getUsersByRestaurantId(id);

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found for this restaurant" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error); // Log the actual error
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

const changeUserStatus = async (req, res) => {
  const { userId } = req.params; // Get the userId from the URL parameter
  const { status } = req.body; // Get the new status from the request body
  console.log(status)
  try {
    // Convert userId to an integer
    const id = parseInt(userId, 10);

    if (isNaN(id) || id <= 0) {
      return res
        .status(400)
        .json({ message: "Invalid user ID. It should be a positive integer." });
    }

    // Call the model function to update the status
    const updatedUser = await updateUserStatus(id, status);

    res.status(200).json({
      message: "User status updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user status", error: error.message });
  }
};

module.exports = { fetchUsersByRestaurant, changeUserStatus };
