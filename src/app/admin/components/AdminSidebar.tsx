"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const menu = [
  { name: "Dashboard", path: "/admin" },
  { name: "Analytics", path: "/admin/analytics" },
  { name: "Add Category", path: "/admin/category" },
  { name: "Add Product", path: "/admin/product/add" },
  { name: "Silver Price", path: "/admin/silver-price" },
  { name: "Banners", path: "/admin/banners" },
  { name: "Coupons", path: "/admin/coupons" },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 h-screen bg-[#1F2933] text-white p-5">

      <ul className="space-y-3">
        {menu.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`block p-2 rounded ${
                pathname === item.path
                  ? "bg-white text-black"
                  : "hover:bg-gray-800"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}