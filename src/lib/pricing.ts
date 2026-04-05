import { prisma } from "./prisma"

export async function calculateProductPrice(product: any) {
  const metalRate = await prisma.metalRate.findUnique({
    where: {
      metal_purity: {
        metal: product.type,
        purity: product.purity || ""
      }
    }
  })

  if (!metalRate) throw new Error("Metal rate not found")

  const weight = product.weight ?? 0
  const makingCharges = product.makingCharges ?? 0
  const stonePrice = product.stonePrice ?? 0
const rate = metalRate.adminPrice ?? metalRate.price

const basePrice =
  weight * rate +
  weight * makingCharges +
  stonePrice
  const gst = basePrice * 0.03

  const finalPrice = basePrice + gst

  return {
    basePrice,
    gst,
    finalPrice
  }
}