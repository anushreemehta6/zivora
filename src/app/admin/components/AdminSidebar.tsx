"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  BarChart3, 
  Tag, 
  PackagePlus, 
  Coins, 
  Image as ImageIcon, 
  TicketPercent,
  Settings,
  LogOut
} from "lucide-react"

const menu = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
  { name: "Add Category", path: "/admin/category", icon: Tag },
  { name: "Add Product", path: "/admin/product", icon: PackagePlus },
  { name: "Silver Price", path: "/admin/silver-price", icon: Coins },
  { name: "Banners", path: "/admin/banners", icon: ImageIcon },
  { name: "Coupons", path: "/admin/coupons", icon: TicketPercent },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-72 h-screen bg-[#1F2933] text-white flex flex-col border-r border-white/5 sticky top-0 overflow-y-auto">
      <div className="p-8 mb-4">
        <Link href="/">
          <h1 className="logo-gradient text-4xl font-bold tracking-tighter">Zivora</h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">Admin Portal</p>
        </Link>
      </div>

      <nav className="flex-grow px-4">
        <ul className="space-y-1">
          {menu.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-xl shadow-primary/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-white" : "text-primary"} />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-6 mt-auto border-t border-white/5 space-y-4">
        <button className="flex items-center gap-4 px-4 py-3 w-full text-sm font-bold text-gray-400 hover:text-white transition-colors">
          <Settings size={18} />
          Settings
        </button>
        <button className="flex items-center gap-4 px-4 py-3 w-full text-sm font-bold text-red-400 hover:text-red-300 hover:bg-red-500/5 rounded-xl transition-all">
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </div>
  )
}
