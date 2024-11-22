// seeders/userSeeder.js
const bcrypt = require("bcryptjs");
const User = require("../pages/user/UserModel");
const Role = require("../pages/role/RoleModel");

async function seedAdminUser() {
  try {
    // Cari role dengan nama "Admin"
    const adminRole = await Role.findOne({ name: "Admin" });
    if (!adminRole) {
      console.log("Role Admin not found. Please seed roles first.");
      return;
    }

    // Periksa apakah user admin sudah ada
    const existingUser = await User.findOne({ username: "admin" });
    if (!existingUser) {
      // Hash password
      const hashedPassword = await bcrypt.hash("admin1234", 10);

      // Buat user baru dengan role Admin
      await User.create({
        username: "admin",
        password: hashedPassword,
        role: adminRole._id,
      });

      console.log("Admin user created with username: admin");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Error seeding admin user:", error.message);
  }
}

module.exports = seedAdminUser;