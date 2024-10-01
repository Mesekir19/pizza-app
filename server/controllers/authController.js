const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail } = require("../models/userModel");
const { getRestaurantByEmail } = require("../models/restaurantModel");

// Register user
const register = async (req, res) => {
  const { name, email, password, role, restaurantId, status } = req.body;
  console.log(req.body)
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(
      name,
      email,
      hashedPassword,
      role,
      restaurantId,
      status
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email.email);
  console.log("hey 1")
  try {
  console.log("hey 2");

    // 1. Check if the email exists in the 'users' table
    let user = await getUserByEmail(email.email);

    if (user) {
  console.log("hey 22");

      // 2. If user found in the 'users' table, validate password
      const isMatch = await bcrypt.compare(email.password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

      // 3. Generate token for the user from the 'users' table
      const token = jwt.sign(
        { id: user.id, role: user.role, restaurantId: user.restaurant_id }, // Include restaurantId in token
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.json({
        token,
        role: user.role,
        restaurantId: user.restaurant_id, // Send restaurantId with response
      });
    }
  console.log("hey 3");

    // 4. If not found in 'users', check in the 'restaurants' table for super admin
    const restaurantAdmin = await getRestaurantByEmail(email.email);
  console.log("hey there admin ", restaurantAdmin);
    
    if (restaurantAdmin) {
  console.log("hey 4");

      // 5. Validate password for super admin (restaurant admin)
      const isMatch = await bcrypt.compare(email.password, restaurantAdmin.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });
  console.log("hey 5");

      // 6. Generate token for the super admin
      const token = jwt.sign(
        {
          id: restaurantAdmin.id,
          role: "super-admin",
          restaurantId: restaurantAdmin.id,
        }, // Include restaurantId in token
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  console.log("hey 6");

      return res.json({
        token,
        role: "super-admin",
        restaurantId: restaurantAdmin.id, // Send restaurantId with response
      });
    }

    // 7. If no user or restaurant admin is found
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user" });
  }
};

module.exports = { register, login };
