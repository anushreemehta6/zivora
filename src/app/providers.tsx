"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { CartProvider } from "@/context/CartContext"
import { WishlistProvider } from "@/context/WishlistContext"
import { Toaster } from "react-hot-toast"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
      <WishlistProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </WishlistProvider>
    </SessionProvider>
  )
}

