const Product = require("../models/Product")
const cloudinary = require("../config/cloudinary")
const fs = require("fs")

// ✅ CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body

    // 🔴 Validation
    if (!name || !price || !description) {
      return res.status(400).json({ message: "All fields are required" })
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" })
    }

    // ✅ Read file from disk
    const fileData = fs.readFileSync(req.file.path)

    // ✅ Convert to base64
    const base64 = `data:${req.file.mimetype};base64,${fileData.toString("base64")}`

    // ✅ Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image"
    })

    // ✅ Save to DB
    const product = await Product.create({
      name,
      price: Number(price),
      description,
      image: result.secure_url,
      vendor: req.user.id
    })

    res.status(201).json(product)

  } catch (error) {
    console.log("🔥 FINAL ERROR:", error)
    res.status(500).json({ message: error.message })
  }
}


// ✅ GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("vendor", "name email")
    res.json(products)

  } catch (error) {
    console.log("🔥 GET PRODUCTS ERROR:", error)
    res.status(500).json({ message: error.message })
  }
}


// ✅ GET MY PRODUCTS
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user.id })
      .populate("vendor", "name email")

    res.json(products)

  } catch (error) {
    console.log("🔥 MY PRODUCTS ERROR:", error)
    res.status(500).json({ message: error.message })
  }
}
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body

    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    // ✅ Check ownership
    if (product.vendor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" })
    }

    // update fields
    if (name) product.name = name
    if (price) product.price = Number(price)
    if (description) product.description = description

    // 🔥 IMAGE UPDATE BLOCK (PUT HERE)
    const fs = require("fs")

    if (req.file) {
      console.log("FILE PATH:", req.file.path)
      console.log("MIME:", req.file.mimetype)

      const fileBuffer = fs.readFileSync(req.file.path)
      const base64 = fileBuffer.toString("base64")

      // 👉 use actual mimetype if available, else fallback to jpeg
      const mime = (req.file.mimetype && req.file.mimetype !== "application/octet-stream")
        ? req.file.mimetype
        : "image/jpeg"

      const dataURI = `data:${mime};base64,${base64}`

      const result = await cloudinary.uploader.upload(dataURI, {
        resource_type: "auto"
      })

      product.image = result.secure_url

      fs.unlinkSync(req.file.path)
    }

    // save
    const updatedProduct = await product.save()

    res.json(updatedProduct)

  } catch (error) {
    console.log("🔥 REAL UPDATE ERROR:", error)

    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error
    })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    // ✅ Check ownership
    if (product.vendor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" })
    }

    await product.deleteOne()

    res.json({ message: "Product deleted successfully" })

  } catch (error) {
    console.log("🔥 DELETE ERROR:", error)

    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong"
    })
  }
}