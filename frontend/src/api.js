import axios from "axios"

const API = axios.create({
  baseURL: "https://artisans-corner.onrender.com/api",
  headers: {
    "Cache-Control": "no-cache"
  }
})

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token")

  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }

  return req
})

export default API