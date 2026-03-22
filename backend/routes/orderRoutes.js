const Stripe = require("stripe")

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const express = require("express")
const router = express.Router()

const Order = require("../models/Order")
const authMiddleware = require("../middleware/authMiddleware")

// CREATE ORDER
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, totalAmount } = req.body

    const order = new Order({
      user: req.user.id,
      items,
      totalAmount
    })

    await order.save()

    res.json({ message: "Order placed successfully 🔥", order })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET USER ORDERS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product")
      .sort({ createdAt: -1 })

    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body

    const line_items = items.map(item => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.productName || "Product"
        },
        unit_amount: item.price * 100 // ₹ → paise
      },
      quantity: item.quantity
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",

      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cart"
    })

    res.json({ url: session.url })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
})
module.exports = router