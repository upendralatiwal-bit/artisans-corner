import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import API from "../api"
import { loadStripe } from "@stripe/stripe-js"
const stripePromise = loadStripe("pk_test_51TDLgHFaGlFt6kXoROcdRKOZ5xBbf1iaCEZzBrLDLnWKCpueyP4BryT4LThpfTby6upf0UD07jMtkL7CmZsRVQ3i00mM470Yuz")
function Cart() {
  const { cart, setCart } = useContext(CartContext)

  // ❌ REMOVE ITEM
  const removeItem = (id) => {
    setCart(cart.filter(item => item._id !== id))
  }

  // 💰 TOTAL PRICE
  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)

  // ➕ INCREASE
  const increaseQty = (id) => {
    setCart(
      cart.map(item =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  // ➖ DECREASE
  const decreaseQty = (id) => {
    setCart(
      cart.map(item =>
        item._id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    )
  }

  // 💳 CHECKOUT
  const handleCheckout = async () => {
    try {
      const items = cart.map(item => ({
        product: item._id,
        productName: item.name, // ✅ ADD THIS
        quantity: item.quantity,
        price: item.price
      }))

      const totalAmount = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )

      // 🔥 CALL BACKEND
      const res = await API.post("/orders/create-checkout-session", {
        items,
        totalAmount
      })

      // 🔥 STRIPE REDIRECT
      window.location.href = res.data.url

    } catch (err) {
      console.log(err)
      alert("Checkout failed ❌")
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Cart 🛒</h2>

      {cart.length === 0 ? (
        <p>Cart is empty 😢</p>
      ) : (
        <>
          {cart.map(item => (
            <div
              key={item._id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "10px",
                background: "#f9f9f9"
              }}
            >
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>

              {/* 🔥 QUANTITY CONTROLS */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px"
              }}>

                <button
                  onClick={() => decreaseQty(item._id)}
                  style={{
                    padding: "6px 14px",
                    background: "#444",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  −
                </button>

                <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQty(item._id)}
                  style={{
                    padding: "6px 14px",
                    background: "#444",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  +
                </button>

              </div>

              {/* ❌ REMOVE BUTTON */}
              <button
                onClick={() => removeItem(item._id)}
                style={{
                  background: "#ff3b3b",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Remove ❌
              </button>

            </div>
          ))}

          {/* 💰 TOTAL */}
          <h2>Total: ₹{total}</h2>

          {/* 💳 CHECKOUT BUTTON */}
          <button
            onClick={handleCheckout}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Checkout 💳
          </button>
        </>
      )}
    </div>
  )
}

export default Cart