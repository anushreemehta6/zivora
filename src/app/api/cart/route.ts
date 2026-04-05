import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { calculateProductPrice } from "@/lib/pricing"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: {
      items: {
        include: {
          product: true,
          variant: true
        }
      }
    }
  })

  if (!cart) return Response.json({ items: [], total: 0 })

  let cartTotal = 0

  const itemsWithPrice = await Promise.all(
    cart.items.map(async (item) => {
      const priceData = await calculateProductPrice(item.product)

      const itemTotal = priceData.finalPrice * item.quantity

      cartTotal += itemTotal

      return {
        ...item,
        price: priceData.finalPrice,
        subtotal: itemTotal
      }
    })
  )

  return Response.json({
    items: itemsWithPrice,
    total: cartTotal
  })
}