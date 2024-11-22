const express = require("express");
const userController = require("./userController");
const authMiddleware = require("../../middleware/auth/authMiddleware");
const checkPermission = require("../../middleware/checkPermission/checkPermission");

const router = express.Router();

// Add new user
router.post("/users", authMiddleware, checkPermission("user", "create"), userController.createUser);

// Get all user
router.get("/users", authMiddleware, checkPermission("user", "read"), userController.getAllUsers);

// Get detail user by ID
router.get("/users/:id", authMiddleware, checkPermission("user", "read"), userController.getUserById);

// Update user and permission or role
router.put("/users/:id", authMiddleware, checkPermission("user", "update"), userController.updateUser);

// Delete user by ID
router.delete("/users/:id", authMiddleware, checkPermission("user", "delete"), userController.deleteUser);

module.exports = router;