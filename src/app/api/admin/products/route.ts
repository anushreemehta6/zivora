import { NextResponse } from "next/server"
import { prisma } from "../../../../../lib/prisma"
import { error } from "console"

export async function POST(req: Request) {

  try {

    const body = await req.json()

    const {
      name,
      metal,
      purity,
      weight,
      makingCharge,
      stonePrice = 0,
      category,
      description,
      type,
      categoryId,
      image,
    } = body

    // Get latest metal rate
    const metalRate = await prisma.metalRate.findFirst({
      where: {
        metal,
        purity
      },
      orderBy: {
        id: "desc"
      }
    })

    if (!metalRate) {
      return NextResponse.json(
        { error: "Metal rate not found",errorDetails: `No rate found for ${metal} with purity ${purity}` },
        { status: 404 }
      )
    }

    // Price calculations
    const metalPrice = metalRate.price * weight
    const makingPrice = makingCharge * weight

    const basePrice = metalPrice + makingPrice + stonePrice

   const product = await prisma.product.create({
  data: {
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    description,
    sku: `${Date.now()}`,
    type: type, // 👈 IMPORTANT FIX
    purity,
    weight,
    makingCharges: makingCharge,
    stonePrice,
    price: basePrice,

    category: {
      connect: { id: categoryId } // ✅ STRING (correct)
    },

    // 🔥 FIX IMAGE HERE
    images: {
      create: [
        {
          url: image
        }
      ]
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
      orderBy: {
        id: "desc"
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}