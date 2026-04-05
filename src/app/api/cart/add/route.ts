import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const userId = session.user.id

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
          variant: true
        }
      }
    }
  })

  return NextResponse.json(cart)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const userId = session.user.id
  const { productId, variantId, quantity } = await req.json()

  let cart = await prisma.cart.findUnique({
    where: { userId }
  })

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId }
    })
  }

  const item = await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      variantId,
      quantity
    }
  })

  return NextResponse.json(item)
}