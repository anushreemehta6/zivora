import { NextResponse } from "next/server"
import { prisma } from "../../../../../lib/prisma"

export async function POST(req: Request) {

  try {

    const { code, cartTotal } = await req.json()

    const coupon = await prisma.coupon.findUnique({
      where: { code }
    })

    if (!coupon || !coupon.isActive) {
      return NextResponse.json(
        { error: "Invalid coupon" },
        { status: 400 }
      )
    }

    if (coupon.expiryDate && new Date() > coupon.expiryDate) {
      return NextResponse.json(
        { error: "Coupon expired" },
        { status: 400 }
      )
    }

    if (coupon.minAmount && cartTotal < coupon.minAmount) {
      return NextResponse.json(
        { error: "Minimum cart amount not reached" },
        { status: 400 }
      )
    }

    let discountAmount = 0

    if (coupon.discountType === "percentage") {
      discountAmount = (cartTotal * coupon.discount) / 100
    } else {
      discountAmount = coupon.discount
    }

    const finalAmount = cartTotal - discountAmount

    return NextResponse.json({
      cartTotal,
      discountAmount,
      finalAmount
    })

  } catch (error) {

    return NextResponse.json(
      { error: "Coupon validation failed" },
      { status: 500 }
    )

  }
}