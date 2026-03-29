const express = require("express")
const stripe = require("../utils/stripe")
const Order = require("../models/Order")

const router = express.Router()

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"]

    let event

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err) {
      console.log("❌ Webhook Error:", err.message)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    // ✅ PAYMENT SUCCESS
    if (event.type === "checkout.session.completed") {
      const session = event.data.object

      const orderId = session.metadata.orderId

      try {
        await Order.findByIdAndUpdate(orderId, {
          status: "paid"
        })

        console.log("✅ Order marked as PAID")
      } catch (err) {
        console.log("DB error:", err)
      }
    }

    res.sendStatus(200)
  }
)

module.exports = router