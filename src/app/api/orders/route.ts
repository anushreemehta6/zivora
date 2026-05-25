import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"
import { calculateProductPrice } from "@/lib/calculatePrice"

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

  const { addressId, address, paymentMethod, items, discount, giftWrap } = body

  if (!items || items.length === 0) {
    return NextResponse.json(
      { error: "Cart is empty" },
      { status: 400 }
    )
  }

  let finalAddressId = addressId

  // Create address inline if not provided
  if (!finalAddressId && address) {
    try {
      const createdAddress = await prisma.address.create({
        data: {
          userId,
          fullName: address.fullName,
          phone: address.phone,
          line1: address.line1,
          line2: address.line2 || "",
          city: address.city,
          state: address.state || "Maharashtra",
          postalCode: address.postalCode,
          country: address.country || "India"
        }
      })
      finalAddressId = createdAddress.id
    } catch (addrErr) {
      console.error("Address creation failed:", addrErr)
      return NextResponse.json(
        { error: "Failed to save shipping address" },
        { status: 400 }
      )
    }
  }

  if (!finalAddressId) {
    return NextResponse.json(
      { error: "Shipping address is required" },
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

      const price = priceData.dynamicPrice
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

  // authoritative price calculations
  const discountVal = discount || 0
  const giftWrapVal = giftWrap ? 50 : 0
  // Note: totalAmount already includes GST (from dynamicPrice)
  // so we just calculate the final amount without adding GST again
  const finalAmount = Math.max(0, totalAmount - discountVal + giftWrapVal)

  // Map payment method to uppercase enum
  let mappedPaymentMethod = "COD"
  if (paymentMethod) {
    const pmUpper = paymentMethod.toString().toUpperCase()
    if (["RAZORPAY", "STRIPE", "COD", "UPI"].includes(pmUpper)) {
      mappedPaymentMethod = pmUpper
    } else if (pmUpper === "PAY ONLINE" || pmUpper === "ONLINE") {
      mappedPaymentMethod = "RAZORPAY"
    }
  }

  const order = await prisma.order.create({
    data: {
      userId,
      addressId: finalAddressId,
      totalAmount,
      discount: discountVal,
      finalAmount,
      paymentMethod: mappedPaymentMethod as any,
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

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const userId = session.user.id

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId
      },
      include: {
        address: true,
        items: {
          include: {
            product: {
              include: {
                images: true
              }
            },
            variant: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    )
  }
}