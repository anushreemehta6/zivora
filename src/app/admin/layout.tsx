import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/auth"
import { ReactNode } from "react"
import { redirect } from "next/navigation"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  // ❌ Not logged in
  if (!session) {
    redirect("/login")
  }

  // ❌ Not admin
  if (session.user.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      {children}
    </div>
  )
}