import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { calculateProductPrice } from "@/lib/calculatePrice"
import { error } from "console"

export async function POST(req: Request) {

  try {

    const body = await req.json()

    const {
  name,
  purity,
  weight,
  makingCharge,
  stonePrice = 0,
  category,
  description,
  type,
  categoryId,
  images = [],
  tags = []
} = body

    // Get latest metal rate
    const metalRate = await prisma.metalRate.findFirst({
      where: {
        metal: {
         equals: type.toUpperCase(),
          mode: "insensitive"
        },
        purity: {
          equals: purity?.toUpperCase() || "",
          mode: "insensitive"
        }
      },
      orderBy: {
        updatedAt: "desc"
      }
    })

    if (!metalRate) {
      return NextResponse.json(
        { error: "Metal rate not found",errorDetails: `No rate found for ${type} with purity ${purity}` },
        { status: 404 }
      )
    }

    // Price calculations
    const currentRate =
  metalRate.adminPrice ??
  metalRate.price ??
  0

const metalPrice =
  currentRate * weight
    const makingPrice = makingCharge * weight

    const basePrice = metalPrice + makingPrice + stonePrice

   const product = await prisma.product.create({
  data: {
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    description,
    sku: `${Date.now()}`,
   type: type.toUpperCase().trim(),

purity: purity.toUpperCase().trim(),
    weight,
    makingCharges: makingCharge,
    stonePrice,
    price: basePrice,
    tags: tags,
    

    category: {
      connect: { id: categoryId }
    },

    images: {
      create: images.map((url: string) => ({ url }))
    }
  }
})

    return NextResponse.json(product)

  } catch (error: any) {
  console.log("FULL ERROR:", error)

  return NextResponse.json(
    {
      error: "Product creation failed",
      message: error.message
    },
    { status: 500 }
  )
}

}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { images: true, category: true },
      orderBy: { createdAt: "desc" }
    })

    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        const priceData = await calculateProductPrice(product)

        return {
          ...product,
          dynamicPrice: priceData.dynamicPrice
        }
      })
    )

    return NextResponse.json(updatedProducts)

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}
