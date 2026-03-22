import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"

import Login from "./pages/Login"
import Products from "./pages/Products"
import MyProducts from "./pages/MyProducts"
import AddProduct from "./pages/AddProduct"
import EditProduct from "./pages/EditProduct"
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"
import Success from "./pages/Success"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <div>
      {/* 🔥 NAVBAR (visible on all pages) */}
      <Navbar />

      {/* 🔥 ROUTES */}
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/my-products"
          element={
            <ProtectedRoute>
              <MyProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-product/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route path="/success" element={<Success />} />

      </Routes>
    </div>
  )
}

export default App