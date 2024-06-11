// Import required modules
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller"); // Assuming UserController is defined in UserController.js

router.get("/:id", UserController.getUserById);
router.get("/", UserController.getAllUsers);
router.post("/", UserController.createUser);

module.exports = router;
