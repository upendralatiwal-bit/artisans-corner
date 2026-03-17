const express = require("express")
const router = express.Router()

const { createProduct, getProducts, getMyProducts } = require("../controllers/productController")
const protect = require("../middleware/authMiddleware")
const upload = require("../middleware/uploadMiddleware") // ✅ THIS LINE

router.post("/", protect, upload.single("image"), createProduct)

router.get("/", getProducts)
router.get("/my-products", protect, getMyProducts)

module.exports = router