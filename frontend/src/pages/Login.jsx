import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api" // make sure this exists

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate() // ✅ HERE (inside component)

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password })

      localStorage.setItem("token", res.data.token)

      navigate("/my-products") // 🔥 redirect after login

    } catch (err) {
      console.log(err)
      alert("Login failed ❌")
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login