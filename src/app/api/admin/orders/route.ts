import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {

  const orders = await prisma.order.findMany({
  include: {
    user: {
      select: {
        id: true,
        name: true,
        email: true
      }
    },

    items: {
      include: {
        product: {
          include: {
            images: true
          }
        }
      }
    }
  },

  orderBy: {
    createdAt: "desc"
  }
})

  return NextResponse.json(orders)
}