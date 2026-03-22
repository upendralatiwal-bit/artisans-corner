import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import API from "../api"

function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)

  // ✅ LOAD EXISTING DATA
  useEffect(() => {
    API.get(`/products/${id}`)
      .then(res => {
        setName(res.data.name)
        setPrice(res.data.price)
        setDescription(res.data.description)
      })
      .catch(err => console.log(err))
  }, [id])

  // ✅ UPDATE PRODUCT
  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("price", price)
      formData.append("description", description)

      if (image) {
        formData.append("image", image)
      }

      await API.put(`/products/${id}`, formData)

      alert("Updated successfully 🔥")

      navigate("/my-products")

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Product</h2>

      <form onSubmit={handleUpdate}>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br /><br />

        <button type="submit">
          Update Product
        </button>

      </form>
    </div>
  )
}

export default EditProduct