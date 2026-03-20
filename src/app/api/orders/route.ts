import { prisma } from "../../../../lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../lib/auth"
import { NextResponse } from "next/server"
import { calculateProductPrice } from "../../../../lib/pricing"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const userId = session.user.id
  const body = await req.json()

  const { addressId, paymentMethod, items } = body

  if (!items || items.length === 0) {
    return NextResponse.json(
      { error: "Cart is empty" },
      { status: 400 }
    )
  }

  // Fetch products from DB
  const productIds = items.map((item: any) => item.productId)

  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds }
    }
  })

  let totalAmount = 0

  const orderItems = await Promise.all(
    items.map(async (item: any) => {
      const product = products.find(p => p.id === item.productId)

      if (!product) {
        throw new Error("Product not found")
      }

      const priceData = await calculateProductPrice(product)

      const price = priceData.finalPrice
      const subtotal = price * item.quantity

      totalAmount += subtotal

      return {
        productId: item.productId,
        variantId: item.variantId || null,
        quantity: item.quantity,
        price
      }
    })
  )

  const order = await prisma.order.create({
    data: {
      userId,
      addressId,
      totalAmount,
      finalAmount: totalAmount,
      paymentMethod,
      items: {
        create: orderItems
      }
    },
    include: {
      items: true
    }
  })

  return NextResponse.json(order)
}