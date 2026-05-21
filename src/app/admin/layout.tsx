import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { ReactNode } from "react"
import AdminSidebar from "./components/AdminSidebar"
import { redirect } from "next/navigation"
import { User, Bell, Search } from "lucide-react"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login")
  }

  return (
  <div className="flex h-screen overflow-hidden bg-[#f8f9fc]">
    
    {/* SIDEBAR */}
    <AdminSidebar />

    {/* RIGHT SECTION */}
    <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
      
      {/* TOP BAR */}
      <header className="h-20 shrink-0 bg-white border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-40">
        
        <div className="relative w-96 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
            size={18}
          />

          <input
            type="text"
            placeholder="Search administration..."
            className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-primary/20 transition-all outline-none"
          />
        </div>

        <div className="flex items-center gap-6">
          <button className="p-2.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-full transition-all relative">
            <Bell size={20} />

            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
          </button>

          <div className="h-8 w-px bg-gray-100" />

          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-secondary uppercase tracking-wider">
                {session.user.name}
              </p>

              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Administrator
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <User size={20} />
            </div>
          </div>
        </div>
      </header>

      {/* SCROLLABLE CONTENT */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-10">
        <div className="animate-in fade-in slide-in-from-bottom duration-700 min-w-0">
          {children}
        </div>
      </main>
    </div>
  </div>
)
}
