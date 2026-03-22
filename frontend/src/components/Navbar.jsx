import { Link, useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      background: "#111",
      color: "#fff"
    }}>

      {/* LEFT SIDE */}
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        <h2>🛍 Artisan's Corner</h2>
      </Link>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", gap: "15px" }}>

        <Link to="/" style={{ color: "white" }}>Home</Link>
        <Link to="/cart" style={{ color: "white" }}>
          Cart 🛒 
        </Link>

        {token && (
          <Link to="/my-products" style={{ color: "white" }}>
            My Products
          </Link>
        )}

        {token && (
          <Link to="/add-product" style={{ color: "white" }}>
            Add Product
          </Link>
        )}

        {token && (
          <Link to="/orders" style={{ color: "white" }}>
            Orders
          </Link>
        )}

        {!token ? (
          <Link to="/login" style={{ color: "white" }}>
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        )}

      </div>

    </div>
  )
}

export default Navbar