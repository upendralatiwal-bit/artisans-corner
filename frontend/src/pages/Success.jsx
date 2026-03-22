import { useEffect } from "react"
import API from "../api"
import { useNavigate } from "react-router-dom"

function Success() {
  const navigate = useNavigate()

  useEffect(() => {
    const saveOrder = async () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart")) || []

        const items = cart.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price
        }))

        const totalAmount = cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )

        await API.post("/orders", {
          items,
          totalAmount
        })

        // 🧹 clear cart
        localStorage.removeItem("cart")

        setTimeout(() => {
          navigate("/orders")
        }, 1000)

      } catch (err) {
        console.log(err)
        alert("Saving order failed ❌")
      }
    }

    saveOrder()
  }, [])

  return <h2>Processing payment...</h2>
}

export default Success