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
  const sort = searchParams.get("sort") || "newest"
  
  const slugsParam = searchParams.get("slugs")
  const excludeId = searchParams.get("excludeId")
  const customLimit = searchParams.get("limit")
  
  const page = Number(searchParams.get("page")) || 1
  const limit = customLimit ? Number(customLimit) : 12

  let orderBy: any = { createdAt: "desc" }
  if (sort === "price-asc") {
    orderBy = { price: "asc" }
  } else if (sort === "price-desc") {
    orderBy = { price: "desc" }
  } else if (sort === "trending") {
    orderBy = { isFeatured: "desc" }
  } else if (sort === "name-asc") {
    orderBy = { name: "asc" }
  } else if (sort === "name-desc") {
    orderBy = { name: "desc" }
  }

  let categoryFilter: any = undefined
  if (category) {
    const categoryTerms = [category]
    if (category.endsWith("s") && category.length > 1) {
      categoryTerms.push(category.slice(0, -1))
    } else {
      categoryTerms.push(category + "s")
    }

    categoryFilter = {
      OR: categoryTerms.flatMap(term => [
        {
          slug: {
            contains: term,
            mode: "insensitive"
          }
        },
        {
          name: {
            contains: term,
            mode: "insensitive"
          }
        }
      ])
    }
  }

  // Construct dynamic Prisma where clause
  let whereClause: any = {}
  
  if (slugsParam) {
    const slugList = slugsParam.split(",").map(s => s.trim()).filter(Boolean)
    whereClause = {
      slug: { in: slugList },
      isActive: true
    }
  } else {
    whereClause = {
      name: { contains: search, mode: "insensitive" },
      isActive: true,
      category: categoryFilter,
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
    }
  }

  // Handle product exclusion if provided
  if (excludeId) {
    whereClause.id = { not: excludeId }
  }

  const products = await prisma.product.findMany({
    where: whereClause,
    include: {
      images: true,
      variants: true,
      category: true,
      collection: true
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: orderBy
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

