import { prisma } from "../../../../../lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../../lib/auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const userId = session.user.id
  const { productId } = await req.json()

  const wishlist = await prisma.wishlist.upsert({
    where: { userId },
    create: { userId },
    update: {}
  })

  const item = await prisma.wishlistItem.create({
    data: {
      wishlistId: wishlist.id,
      productId
    }
  })

  return NextResponse.json(item)
}