import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const search = searchParams.get("search") || ""
  const category = searchParams.get("category")
  const occasion = searchParams.get("occasion")
  const bond = searchParams.get("bond")
  const tag = searchParams.get("tag")
  const minPrice = Number(searchParams.get("minPrice")) || undefined
  const maxPrice = Number(searchParams.get("maxPrice")) || undefined
  
  const page = Number(searchParams.get("page")) || 1
  const limit = 12

  const products = await prisma.product.findMany({
    where: {
      name: { contains: search, mode: "insensitive" },
      isActive: true,
      category: category
        ? {
            slug: category
          }
        : undefined,
      collection: occasion
        ? {
            slug: occasion
          }
        : undefined,
      tags: (tag || bond)
        ? {
            has: tag || bond || ""
          }
        : undefined,
      price: {
        gte: minPrice,
        lte: maxPrice
      }
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

  // Add Dynamic Pricing Calculation
  const updatedProducts = await Promise.all(
    products.map(async (product) => {
      const metalRate = await prisma.metalRate.findFirst({
        where: {
          metal: {
            equals: product.type,
            mode: "insensitive"
          },
          purity: {
            equals: product.purity || "",
            mode: "insensitive"
          }
        },
        orderBy: { updatedAt: "desc" }
      })

      let dynamicPrice = product.price || 0
      if (metalRate) {
        const currentRate = metalRate.adminPrice ?? metalRate.price ?? 0
        const metalPrice = currentRate * (product.weight || 0)
        const makingPrice = (product.makingCharges || 0) * (product.weight || 0)
        dynamicPrice = metalPrice + makingPrice + (product.stonePrice || 0)
      }

      return {
        ...product,
        dynamicPrice: dynamicPrice
      }
    })
  )

  return NextResponse.json(updatedProducts)
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

