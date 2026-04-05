import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const coupon = await prisma.coupon.create({
      data: body
    })

    return NextResponse.json(coupon)

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create coupon", errorDetails: error },
      { status: 500 }
    )
  }
}

export async function GET() {

  const coupons = await prisma.coupon.findMany()

  return NextResponse.json(coupons)
}