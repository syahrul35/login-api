const express = require("express")
const authMiddleware = require("../../middleware/auth/authMiddleware")

const router = express.Router()

router.get("/dashboard", authMiddleware, (req, res) => {
    res.json({ message: "Welcome to Dashboard!" })
})

module.exports = router