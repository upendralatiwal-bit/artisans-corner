const Product = require("../models/Product")

exports.createProduct = async (req, res) => {

  try {

    const { name, price, description } = req.body

    const product = await Product.create({
      name,
      price,
      description,
      vendor: req.user.id
    })

    res.status(201).json(product)

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