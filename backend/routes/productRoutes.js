const express = require("express")
const router = express.Router()

const {
  createProduct,
  getProducts,
  getMyProducts,
  updateProduct
} = require("../controllers/productController")

const protect = require("../middleware/authMiddleware")
const upload = require("../middleware/uploadMiddleware") // ✅ ONLY ONCE

// CREATE
router.post("/", protect, upload.single("image"), createProduct)

// READ
router.get("/", getProducts)
router.get("/my-products", protect, getMyProducts)

// UPDATE
router.put("/:id", protect, upload.single("image"), updateProduct)

module.exports = router

const { deleteProduct } = require("../controllers/productController")

router.delete("/:id", protect, deleteProduct)