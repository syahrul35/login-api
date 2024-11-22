// seeders/roleSeeder.js
const Role = require("../pages/role/RoleModel");

const roles = [
  { name: "Admin" },
  { name: "User" },
  { name: "Guest" },
];

async function seedRoles() {
  for (let roleData of roles) {
    const role = await Role.findOne({ name: roleData.name });
    if (!role) {
      await Role.create(roleData);
      console.log(`Role ${roleData.name} created`);
    } else {
      console.log(`Role ${roleData.name} already exists`);
    }
  }
}

module.exports = seedRoles;
