import { prisma } from "../../../../../lib/prisma"
import { NextResponse } from "next/server"
import { calculateProductPrice } from "../../../../../lib/pricing"

export async function GET(req: Request, { params }: any) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      images: true,
      variants: true
    }
  })

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 })
  }

  const priceData = await calculateProductPrice(product.id)

  return Response.json({
    ...product,
    price: priceData.finalPrice,
    gst: priceData.gst
  })
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json()

  const product = await prisma.product.update({
    where: { id: params.id },
    data: body
  })

  return NextResponse.json(product)
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.product.delete({
    where: { id: params.id }
  })

  return NextResponse.json({ message: "Deleted" })
}