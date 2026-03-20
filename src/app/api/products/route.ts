import { prisma } from "../../../../lib/prisma"
import { NextResponse } from "next/server"
import cloudinary from "../../../../lib/cloudinary"
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const search = searchParams.get("search") || ""
  const category = searchParams.get("category")
  const page = Number(searchParams.get("page")) || 1
  const limit = 12

  const products = await prisma.product.findMany({
    where: {
      name: { contains: search, mode: "insensitive" },
      category: category
        ? {
            slug: category
          }
        : undefined,
      isActive: true
    },
    include: {
      images: true,
      variants: true,
      category: true,
      collection: true
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" }
  })

  return NextResponse.json(products)
}

export async function POST(req: Request) {
  const body = await req.json()

  const {
    name,
    slug,
    description,
    sku,
    categoryId,
    weight,
    purity,
    type,
    images
  } = body

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      description,
      sku,
      weight,
      purity,
      type,
      category: {
        connect: {
          id: categoryId
        }
      }
    }
  })

  const uploadedImages = await Promise.all(
    images.map(async (image: string) => {
      const result = await cloudinary.uploader.upload(image, {
        folder: "products"
      })

      return {
        productId: product.id,
        url: result.secure_url
      }
    })
  )

  await prisma.productImage.createMany({
    data: uploadedImages
  })

  return NextResponse.json({
    product,
    images: uploadedImages
  })
}

