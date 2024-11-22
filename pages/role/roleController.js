const Role = require("./RoleModel");
const RolePermission = require("./RolePermissionModel");

// Create a new role
const createRole = async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    return res.status(201).json(role);
  } catch (error) {
    return res.status(500).json({ message: "Error creating role", error });
  }
};

const getAllRole = async (req, res) => {
  try {
    const roles = await Role.find().populate("name", "description");
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching roles", error });
  }
};

// Read a specific role detail with permissions
const getRoleDetail = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });

    const permissions = await RolePermission.find({ role: role._id });
    return res.json({ role, permissions });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching role details", error });
  }
};

// Update role details (name, description)
const updateRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const { feature, permissions } = req.body;

    // Find RolePermission by role ID
    const rolePermission = await RolePermission.findOne({ role: roleId, feature });
    if (!rolePermission) {
      return res.status(404).json({ message: 'Role permissions not found.' });
    }

    // Update permissions RolePermission
    rolePermission.permissions = { ...rolePermission.permissions, ...permissions };
    await rolePermission.save();

    res.status(200).json({ message: 'Permissions updated successfully', rolePermission });
  } catch (error) {
    console.error('Error updating permissions:', error);
    res.status(500).json({ message: 'An error occurred while updating permissions.' });
  }
};

// Update role permissions
const updateRolePermissions = async (req, res) => {
  const { permissions } = req.body; // permissions should be an array of permission objects [{ feature, permissions: {...} }]
  try {
    await Promise.all(
      permissions.map(async (perm) => {
        await RolePermission.findOneAndUpdate(
          { role: req.params.id, feature: perm.feature },
          { permissions: perm.permissions },
          { upsert: true, new: true }
        );
      })
    );
    return res.json({ message: "Permissions updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating permissions", error });
  }
};

// Delete a role
const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });

    // Delete related permissions as well
    await RolePermission.deleteMany({ role: role._id });
    return res.json({
      message: "Role and related permissions deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting role", error });
  }
};

module.exports = {
  createRole,
  getAllRole,
  getRoleDetail,
  updateRole,
  deleteRole,
  updateRolePermissions,
};
