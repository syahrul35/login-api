require("dotenv").config();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../../pages/user/UserModel")
const Role = require("../../pages/role/RoleModel")

// const SECRET_KEY = "your_secret_key"

const register = async (req, res) => {
   const { username, password, roleName } = req.body

   try {
      const role = await Role.findOne({ name: roleName });
      if (!role) return res.status(404).json({ message: "Role Not Found" });

      const hashedPassword = bcrypt.hashSync(password, 8)
      const user = new User({ username, password: hashedPassword, role: role._id })
      await user.save()

      res.status(201).json({ message: "Registration Successful" })
   } catch (error) {
      res.status(400).json({ message: "Registration Failed", error: error.message })
   }
}

// Login pengguna
const login = async (req, res) => {
   const { username, password } = req.body

   try {
      const user = await User.findOne({ username })
      if (!user) {
         return res.status(400).json({ message: "Username Not Found" })
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password)
      if (!isPasswordValid) {
         return res.status(401).json({ message: "Wrong Password" })
      }

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" })
      res.json({ token, message: "Login Successful" })
   } catch (error) {
      res.status(500).json({ message: "An Error Occurred", error: error.message })
   }
}

module.exports = { register, login }