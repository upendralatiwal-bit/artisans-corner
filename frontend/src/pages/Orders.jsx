import { useEffect, useState } from "react"
import API from "../api"

function Orders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    API.get("/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Orders 📦</h2>

      {orders.length === 0 ? (
        <p>No orders yet 😢</p>
      ) : (
        orders.map(order => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "20px",
              padding: "15px",
              borderRadius: "10px"
            }}
          >
            <h3>Status: {order.status}</h3>
            <p><b>Total:</b> ₹{order.totalAmount}</p>

            <h4>Items:</h4>

            {order.items.map((item, i) => (
              <div key={i}>
                <p>
                  {item.product?.name} × {item.quantity}
                </p>
              </div>
            ))}

            <p style={{ fontSize: "12px", color: "gray" }}>
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  )
}

export default Orders