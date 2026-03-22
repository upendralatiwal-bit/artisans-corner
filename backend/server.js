require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

// 🔥 ROUTES
const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")

// 🔥 CLOUDINARY
const cloudinary = require("./config/cloudinary")

dotenv.config()

const app = express()

// 🔥 MIDDLEWARE
app.use(cors())
app.use(express.json())

// 🔥 TEST ROUTE (optional)
app.get("/test-cloudinary", async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    )
    res.json(result)
  } catch (err) {
    console.log("TEST ERROR:", err)
    res.status(500).json(err)
  }
})

// 🔥 API ROUTES
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)

// 🔥 DB CONNECT
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected 🚀")

    app.listen(8000, () => {
      console.log("Server running on port 8000 🔥")
    })
  })
  .catch(err => console.log(err))