"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"

export default function NameFilterInput() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams?.get("search") || "")

  useEffect(() => {
    setValue(searchParams?.get("search") || "")
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams?.toString() || "")
    if (value.trim()) {
      params.set("search", value.trim())
    } else {
      params.delete("search")
    }
    // Retain other params but navigate to the main products list
    // to search all categories/filters, or maintain current page path.
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleClear = () => {
    setValue("")
    const params = new URLSearchParams(searchParams?.toString() || "")
    params.delete("search")
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="relative group">
      <input
        type="text"
        placeholder="Filter by name..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-gray-300 text-secondary placeholder-gray-400 focus:bg-white shadow-sm"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-400 hover:text-red-500 transition-colors p-0.5"
            title="Clear search"
          >
            <X size={13} />
          </button>
        )}
        <button
          type="submit"
          className="text-gray-400 group-hover:text-primary transition-colors hover:scale-105 active:scale-95 duration-200 p-0.5"
          title="Search"
        >
          <Search size={14} />
        </button>
      </div>
    </form>
  )
}
