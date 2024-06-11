// Import required modules
const User = require("../models/user"); // Assuming you have a User model defined

// GET a single user by ID
async function getUserById(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// LIST all users
async function getAllUsers(req, res) {
  try {
    // console.log("User", User);
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  // res.status(200).json({ success: true, message: "done" });
}

// POST a new user
async function createUser(req, res) {
  try {
    const { name, avatar, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    const existing_user = await User.findOne({ where: { email } });
    if (existing_user) {
      return res
        .status(400)
        .json({ status: 400, error: "User with this Email already exists" });
    }
    const user = await User.create({ name, avatar, email });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
};
