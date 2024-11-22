const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");

// Database Connection
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./middleware/auth/authRoutes");
const userRoutes = require("./pages/user/userRoutes");
const roleRoutes = require("./pages/role/roleRoutes");
const dashboardRoutes = require("./pages/dashboard/dashboardRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
connectDB();

// Routes
app.use("/api", authRoutes, dashboardRoutes, userRoutes, roleRoutes);

// console.log(listEndpoints(app));

// Server Running
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
