console.log("🔥 THIS IS NEW BUILD v2 🔥");
console.log("NEW CODE RUNNING ✅");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();



// 🔗 Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

// 🔥 Middleware
app.use(cors());
app.use(express.json());

// 🔥 Base Route (test)
app.get("/", (req, res) => {
  res.send("NEW DEPLOY WORKING 🚀🔥");
});

// 🔥 API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// 🔥 MongoDB + Server Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected 🚀");

    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🔥`);
    });
  })
  .catch((err) => {
    console.log("DB Error:", err);
  });