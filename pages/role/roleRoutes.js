const express = require("express");
const roleController = require("./roleController");
const authMiddleware = require("../../middleware/auth/authMiddleware");
const checkPermission = require("../../middleware/checkPermission/checkPermission");

const router = express.Router();

// Add new role
router.post("/role", authMiddleware, checkPermission("role", "create"), roleController.createRole);

// Get all role
router.get("/role", authMiddleware, checkPermission("role", "read"), roleController.getAllRole);

// Get Detail Role by ID
router.get("/role/:id", authMiddleware, checkPermission("role", "read"), roleController.getRoleDetail);

// Update role by ID
router.put("/role/:id", authMiddleware, checkPermission("role", "update"), roleController.updateRole);

// Delete role by ID
router.delete("/role/:id", authMiddleware, checkPermission("role", "delete"), roleController.deleteRole);

module.exports = router;