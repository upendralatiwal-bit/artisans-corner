const Product = require("../models/Product")
const cloudinary = require("../config/cloudinary")

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body

    if (!name || !price || !description) {
      return res.status(400).json({ message: "All fields are required" })
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" })
    }

    const stream = cloudinary.uploader.upload_stream(
  { folder: "artisans-products" },
  async (error, result) => {

    if (error) {
      return res.status(500).json({ message: error.message })
    }

    // 👇 ADD TRY-CATCH HERE
    try {
      const product = await Product.create({
        name,
        price: Number(price),
        description,
        image: result.secure_url,
        vendor: req.user.id
      })

      res.status(201).json(product)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }

  }
)

    stream.end(req.file.buffer)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getProducts = async (req, res) => {
  try {

    const products = await Product.find().populate("vendor", "name email")

    res.json(products)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getMyProducts = async (req, res) => {
  try {

    const products = await Product.find({ vendor: req.user.id })

    res.json(products)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}