// seeders/rolePermissionSeeder.js
const Role = require("../pages/role/RoleModel");
const RolePermission = require("../pages/role/RolePermissionModel");

// Define permissions for each role and feature
const permissions = [
  {
    roleName: "Admin",
    features: [
      { feature: "booking", permissions: { create: true, read: true, update: true, delete: true } },
      { feature: "report", permissions: { create: true, read: true, update: true, delete: true } },
      { feature: "role", permissions: { create: true, read: true, update: true, delete: true } },
      { feature: "user", permissions: { create: true, read: true, update: true, delete: true } }
    ]
  },
  {
    roleName: "User",
    features: [
      { feature: "booking", permissions: { create: true, read: true, update: true, delete: true } },
      { feature: "report", permissions: { create: true, read: true, update: false, delete: false } }
    ]
  },
  {
    roleName: "Guest",
    features: [
      { feature: "booking", permissions: { create: false, read: true, update: false, delete: false } },
      { feature: "report", permissions: { create: false, read: true, update: false, delete: false } }
    ]
  }
];

async function seedRolePermissions() {
  for (let perm of permissions) {
    // Find the role based on the role name
    const role = await Role.findOne({ name: perm.roleName });
    if (role) {
      for (let featurePerm of perm.features) {
        // Check if permission for this feature already exists for the role
        const existingPermission = await RolePermission.findOne({
          role: role._id,
          feature: featurePerm.feature
        });

        if (!existingPermission) {
          await RolePermission.create({
            role: role._id,
            feature: featurePerm.feature,
            permissions: featurePerm.permissions
          });
          console.log(`Permissions for role ${perm.roleName} on feature ${featurePerm.feature} created`);
        } else {
          console.log(`Permissions for role ${perm.roleName} on feature ${featurePerm.feature} already exists`);
        }
      }
    } else {
      console.log(`Role ${perm.roleName} not found`);
    }
  }
}

module.exports = seedRolePermissions;