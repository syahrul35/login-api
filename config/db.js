const mongoose = require("mongoose")

const connectDB = async () => {
   try {
      await mongoose.connect("mongodb://127.0.0.1:27017/userDB")
      console.log("Terhubung ke MongoDB")
   } catch (error) {
      console.error("Koneksi MongoDB gagal:", error)
      process.exit(1)
   }
}

module.exports = connectDB
