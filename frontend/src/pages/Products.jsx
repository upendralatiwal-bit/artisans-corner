import { useEffect, useState } from "react"
import API from "../api"

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    API.get("/products", {
      headers: { "Cache-Control": "no-cache" }
    })
      .then((res) => {
        console.log("DATA:", res.data) // 🔍 debug
        setProducts(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("ERROR:", err)
        setError("Failed to load products")
        setLoading(false)
      })
  }, [])

  // 🔄 Loading state
  if (loading) {
    return <h2>Loading products...</h2>
  }

  // ❌ Error state
  if (error) {
    return <h2>{error}</h2>
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Products</h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px"
            }}
          >
            <h3>{p.name}</h3>
            <p><strong>Price:</strong> ₹{p.price}</p>
            <p>{p.description}</p>

            {p.image && (
              <img
                src={p.image}
                alt={p.name}
                width="200"
                style={{ borderRadius: "8px", marginTop: "10px" }}
              />
            )}

            <div style={{ marginTop: "10px" }}>
              <button>Add to Cart 🛒</button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Products