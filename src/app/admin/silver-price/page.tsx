"use client"

import { useState } from "react"

export default function Page() {
  const [form, setForm] = useState({
    metal: "silver",
    purity: "",
    price: "",
    adminPrice: ""
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e:any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/admin/metal-rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          metal: form.metal,
          purity: form.purity,
          price: Number(form.price),
          adminPrice: Number(form.adminPrice)
        })
      })

      const data = await res.json()

      if (res.ok) {
        alert("Rate updated ✅")
        setForm({
          metal: "silver",
          purity: "",
          price: "",
          adminPrice: ""
        })
      } else {
        alert(data.error)
      }

    } catch (err) {
      alert("Something went wrong")
    }

    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Update Metal Rate
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >

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
          type="text"
          name="purity"
          placeholder="Purity (e.g. 999, 925)"
          value={form.purity}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Market Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        {/* Admin Price */}
        <input
          type="number"
          name="adminPrice"
          placeholder="Admin Price"
          value={form.adminPrice}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Saving..." : "Update Rate"}
        </button>
      </form>
    </div>
  )
}