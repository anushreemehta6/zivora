"use client"

import { useEffect, useState } from "react"

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: "",
    metal: "silver",
    purity: "",
    weight: "",
    makingCharge: "",
    stonePrice: "",
    description: "",
    type: "",
    categoryId: "",
    image: ""
  })

  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  // 🔥 Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/admin/category")
      const data = await res.json()
      setCategories(data)
    }

    fetchCategories()
  }, [])

  // 🧠 Handle input
  const handleChange = (e:any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  // 🖼️ Upload to Cloudinary
  const handleImageUpload = async (e:any) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)

    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "my_unsigned_preset") // 👈 change this

    const res = await fetch(
   `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data
      }
    )

    const result = await res.json()

    setForm((prev) => ({
      ...prev,
      image: result.secure_url
    }))

    setUploading(false)
  }

  // 🚀 Submit
  const handleSubmit = async (e:any) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      body: JSON.stringify({
  ...form,
  weight: Number(form.weight),
  makingCharge: Number(form.makingCharge),
  stonePrice: Number(form.stonePrice || 0),
  type: form.type.toUpperCase() // 👈 IMPORTANT
})
      })

      const data = await res.json()

      if (res.ok) {
        alert("Product created ✅")

        setForm({
          name: "",
          metal: "silver",
          purity: "",
          weight: "",
          makingCharge: "",
          stonePrice: "",
          description: "",
          type: "",
          categoryId: "",
          image: ""
        })
      } else {
        alert(data.error)
        console.log(data.errorDetails)
      }

    } catch (err) {
      alert("Something went wrong"+err)
    }

    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded">

        {/* Name */}
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        {/* Category */}
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full border p-2"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Metal */}
        <select
          name="metal"
          value={form.metal}
          onChange={handleChange}
          className="w-full border p-2"
        >
          <option value="silver">Silver</option>
          <option value="gold">Gold</option>
        </select>

        {/* Purity */}
        <input
          name="purity"
          placeholder="Purity (999, 925)"
          value={form.purity}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        {/* Weight */}
        <input
          type="number"
          name="weight"
          placeholder="Weight (grams)"
          value={form.weight}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        {/* Making Charge */}
        <input
          type="number"
          name="makingCharge"
          placeholder="Making Charge"
          value={form.makingCharge}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        {/* Stone Price */}
        <input
          type="number"
          name="stonePrice"
          placeholder="Stone Price"
          value={form.stonePrice}
          onChange={handleChange}
          className="w-full border p-2"
        />

 <select
  name="type"
  value={form.type}
  onChange={handleChange}
  className="w-full border p-2"
  required
>
  <option value="">Select Type</option>
  <option value="GOLD">Gold</option>
  <option value="SILVER">Silver</option>
  <option value="DIAMOND">Diamond</option>
  <option value="PLATINUM">Platinum</option>
  <option value="GEMSTONE">Gemstone</option>
</select>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2"
        />

        {/* 🖼️ Image Upload */}
        <div>
          <input type="file" onChange={handleImageUpload} />

          {uploading && <p>Uploading...</p>}

          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="w-32 h-32 object-cover mt-2"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || uploading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Creating..." : "Add Product"}
        </button>

      </form>
    </div>
  )
}