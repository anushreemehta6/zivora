import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { calculateProductPrice } from "@/lib/calculatePrice"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    if (!slug) throw new Error("Slug missing")
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        images: true,
        category: true,
        collection: true,
        reviews: {
          include: {
            user: {
              select: {
                name: true
              }
            }
          },
          orderBy: {
            createdAt: "desc"
          }
        }
      }
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const typedProduct = product as any;

    // Calculate average rating
    const averageRating = typedProduct.reviews.length > 0
      ? typedProduct.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / typedProduct.reviews.length
      : 4.8

    // Use centralized pricing utility
    const priceData = await calculateProductPrice(product)

    return NextResponse.json({
      ...product,
      dynamicPrice: priceData.dynamicPrice,
      averageRating: parseFloat(averageRating.toFixed(1)),
      reviewCount: typedProduct.reviews.length
    })

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    )
  }
}
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const body = await req.json()

  const product = await prisma.product.update({
    where: { slug },
    data: body
  })

  return NextResponse.json(product)
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  await prisma.product.delete({
    where: { slug }
  })

  return NextResponse.json({ message: "Deleted" })
}