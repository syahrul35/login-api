const bcrypt = require("bcryptjs");

const User = require("./UserModel");
const Role = require("../role/RoleModel");

// Add new user
exports.createUser = async (req, res) => {
  const { username, password, roleName } = req.body;
  try {
    const role = await Role.findOne({ name: roleName });
    if (!role) return res.status(404).json({ message: "Role not found" });

    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = new User({
      username,
      password: hashedPassword,
      role: role._id,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Get all user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("role", "name");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Get detail user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("role", "name");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Update user and permission or role
exports.updateUser = async (req, res) => {
  const { username, password, roleName } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (username) user.username = username;

    const hashedPassword = bcrypt.hashSync(password, 8);
    if (password) user.password = hashedPassword;

    // If role wants to be changed
    if (roleName) {
      const role = await Role.findOne({ name: roleName });
      if (!role) return res.status(404).json({ message: "Role not found" });
      user.role = role._id;
    }
    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
