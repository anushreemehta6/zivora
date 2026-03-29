"use client"
import { useState } from "react"
import Button from "@/components/ui/Button"
import { useForm } from "react-hook-form"

export default function Page() {
  const { register, handleSubmit, reset } = useForm()
  const [file, setFile] = useState<File | null>(null)

  // 🔹 Upload to Cloudinary
  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "my_unsigned_preset")

    const res = await fetch(
     `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )

    const data = await res.json()
    return data.secure_url
  }

  const onSubmit = async (data: any) => {
    let imageUrl = ""

    // 🔥 Upload image first
    if (file) {
      imageUrl = await uploadToCloudinary(file)
    }

    const res = await fetch("/api/admin/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        image: imageUrl, // ✅ send URL
      }),
    })

    if (res.ok) {
      alert("Category added ✅")
      reset()
      setFile(null)
    }
  }

  return (
    <div className="m-2 p-2">
      <h1 className="text-3xl font-semibold">Add Category</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div className="flex flex-col gap-4">

          <input
            {...register("name")}
            placeholder="Category Name"
            className="border p-2 rounded-[10px]"
          />

          <input
            {...register("slug")}
            placeholder="slug"
            className="border p-2 rounded-[10px]"
          />

          <input
            {...register("description")}  // 🔥 FIXED (was Description)
            placeholder="Category Description"
            className="border p-2 rounded-[10px]"
          />

          {/* 🔥 File Upload */}
        <div>
  {/* 🔥 Label triggers file input */}

  <label
  htmlFor="fileUpload"
  className="bg-black text-white px-4 py-2 rounded cursor-pointer inline-block"
>
  Choose File
</label>

<input
  id="fileUpload"
  type="file"
  hidden
   onChange={(e) => setFile(e.target.files?.[0] || null)}
/>

  {file && (
    <p className="text-sm mt-2 text-gray-600">
      Selected: {file.name}
    </p>
  )}
</div>

        </div>

        <Button variant="dark"  type ="submit" className="bg-black text-white px-4 py-2">
          Add Category
        </Button>
      </form>
    </div>
  )
}