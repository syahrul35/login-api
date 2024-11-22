require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require('../../pages/user/UserModel');

const authMiddleware = async (req, res, next) => {
   const token = req.header("Authorization")?.replace("Bearer ", "");

   if (!token) {
      return res.status(401).json({ message: "Access Denied, Token Missing" });
   }

   try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(decoded.id).populate("role");
      
      if (!user) {
         return res.status(401).json({ message: "User Not Found" });
      }

      req.user = user;
      req.user.roleId = user.role._id;
      next();
   } catch (error) {
      res.status(401).json({ message: "Invalid Token" });
   }
};

module.exports = authMiddleware;