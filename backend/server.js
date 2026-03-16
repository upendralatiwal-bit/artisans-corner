const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors())

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err))

const authRoutes = require("./routes/authRoutes")

app.use("/api/auth", authRoutes)

app.get("/", (req,res)=>{
  res.send("<h1>Artisan's Corner API Running</h1>")
})

const PORT = 8000

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})
const productRoutes = require("./routes/productRoutes")

app.use("/api/products", productRoutes)