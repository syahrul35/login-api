const mongoose = require("mongoose");
const RolePermission = require('../role/RolePermissionModel');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
});

userSchema.methods.getPermissions = async function () {
  console.log("Role ID:", this.role);
  const rolePermission = await RolePermission.findOne({ role: this.role });
  console.log("Role Permissions:", rolePermission);
  return rolePermission ? rolePermission.permissions : null;
};

module.exports = mongoose.model("User", userSchema);