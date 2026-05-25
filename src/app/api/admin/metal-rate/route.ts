import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {

  try {

    const { metal, purity, price, adminPrice } = await req.json()

    const rate = await prisma.metalRate.upsert({
      where: {
        metal_purity: {
        metal: metal.toUpperCase(),
purity: purity.toUpperCase(),
        }
      },
      update: {
        price,
        adminPrice
      },
      create: {
       metal: metal.toUpperCase().trim(),
  purity: purity.toUpperCase().trim(),
        price,
        adminPrice
      }
    })

    return NextResponse.json(rate)

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to update metal rate" },
      { status: 500 }
    )

  }
}