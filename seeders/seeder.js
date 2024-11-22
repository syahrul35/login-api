// seeders/seed.js
const mongoose = require("mongoose");
const seedRoles = require("./roleSeeder");
const seedRolePermissions = require("./rolePermissionSeeder");
const seedUser = require("./userSeeder");
const connectDB = require("../config/db");

async function runSeeders() {
  try {
    await connectDB();

    console.log("Seeding roles...");
    await seedRoles();

    console.log("Seeding role permissions...");
    await seedRolePermissions();

    console.log("Seeding Users...");
    await seedUser();

    console.log("All seeders completed");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error running seeders:", error);
    mongoose.connection.close();
  }
}

runSeeders();
