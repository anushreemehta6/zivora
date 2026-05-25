import { prisma } from "./prisma";

interface PriceCalculationResult {
  dynamicPrice: number;
  gst: number;
  finalPrice: number;
}

/**
 * Calculates the dynamic price for a product using the latest metal rate
 * 
 * Formula:
 * basePrice = (latestMetalRate × weight) + (makingCharges × weight) + stonePrice
 * gst = basePrice × 0.03 (3% GST)
 * finalPrice = basePrice + gst
 * 
 * The dynamicPrice returned includes GST (this is what the user pays)
 * 
 * @param product - Product object with type, purity, weight, makingCharges, stonePrice
 * @returns { dynamicPrice, gst, finalPrice } - All prices are included with GST applied
 */
export async function calculateProductPrice(product: any): Promise<PriceCalculationResult> {
  try {
    // Normalize type and purity for consistent metal rate lookup
    const normalizedType = (product.type || "").trim().toUpperCase();
    const normalizedPurity = (product.purity || "").trim().toUpperCase();

    // Fetch the latest metal rate
    const metalRate = await prisma.metalRate.findFirst({
      where: {
        metal: {
          equals: normalizedType,
          mode: "insensitive",
        },
        purity: {
          equals: normalizedPurity,
          mode: "insensitive",
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    // Use adminPrice if available, otherwise fall back to price
    const currentRate = metalRate?.adminPrice ?? metalRate?.price ?? 0;

    // Get product measurements
    const weight = product.weight ?? 0;
    const makingCharges = product.makingCharges ?? 0;
    const stonePrice = product.stonePrice ?? 0;

    // Calculate base price
    const basePrice = weight * currentRate + weight * makingCharges + stonePrice;

    // Calculate GST (3%)
    const gst = basePrice * 0.03;

    // Final price includes GST (what user pays)
    const finalPrice = basePrice + gst;

    return {
      dynamicPrice: finalPrice, // This includes GST
      gst,
      finalPrice, // Same as dynamicPrice
    };
  } catch (error) {
    console.error("Error calculating product price:", error);
    
    // Fallback: return a safe default price
    return {
      dynamicPrice: product.price ?? 0,
      gst: 0,
      finalPrice: product.price ?? 0,
    };
  }
}
