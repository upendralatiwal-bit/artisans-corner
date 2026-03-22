import { useEffect, useState } from "react"
import API from "../api"
import { useNavigate } from "react-router-dom"

function MyProducts() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const res = await API.get("/products/my-products")
    setProducts(res.data)
  }

  // 🔥 DELETE
  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`)
      setProducts(products.filter(p => p._id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  // 🔥 EDIT NAVIGATION
  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`)
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Products</h2>

      {products.map((p) => (
        <div
          key={p._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
            maxWidth: "400px"
          }}
        >
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <p>{p.description}</p>

          {p.image && (
            <img
              src={p.image}
              alt={p.name}
              width="200"
              style={{ borderRadius: "6px" }}
            />
          )}

          {/* 🔥 BUTTONS */}
          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            
            <button
              onClick={() => handleEdit(p._id)}
              style={{
                background: "#007bff",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer"
              }}
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(p._id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>

          </div>
        </div>
      ))}
    </div>
  )
}

export default MyProducts
