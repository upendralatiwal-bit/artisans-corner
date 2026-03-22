import { useContext, useEffect, useState } from "react"
import { CartContext } from "../context/CartContext"
import API from "../api"

function Products() {
  const [products, setProducts] = useState([])

  const { cart, setCart } = useContext(CartContext)

  useEffect(() => {
    API.get("/products")
      .then(res => {
        console.log("DATA:", res.data)
        setProducts(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const addToCart = (product) => {
    const exists = cart.find(item => item._id === product._id)

    if (exists) {
      setCart(
        cart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  return (
    <div>
      <h2>All Products</h2>

      {products.map(p => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <p>{p.description}</p>

          {p.image && (
            <img src={p.image} width="200" />
          )}

          <button onClick={() => addToCart(p)}>
            Add to Cart 🛒
          </button>
        </div>
      ))}
    </div>
  )
}

export default Products