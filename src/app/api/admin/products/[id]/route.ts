import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { calculateProductPrice } from "@/lib/calculatePrice";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();

    // GET EXISTING PRODUCT
    const existingProduct = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        {
          error: "Product not found",
        },
        { status: 404 }
      );
    }

    // UPDATED VALUES OR FALLBACK TO EXISTING
   const type =
  (body.type || existingProduct.type || "")
    .trim()
    .toUpperCase();

const purity =
  (body.purity || existingProduct.purity || "")
    .trim()
    .toUpperCase();

    

    const weight =
      body.weight !== undefined
        ? Number(body.weight)
        : existingProduct.weight || 0;

    const makingCharges =
      body.makingCharges !== undefined
        ? Number(body.makingCharges)
        : existingProduct.makingCharges || 0;

    const stonePrice =
      body.stonePrice !== undefined
        ? Number(body.stonePrice)
        : existingProduct.stonePrice || 0;

    // FETCH LATEST METAL RATE - Use centralized utility instead
    // Create a temporary product object for price calculation
    const productForCalculation = {
      type,
      purity,
      weight,
      makingCharges,
      stonePrice,
    };

    // Use centralized pricing utility
    const priceData = await calculateProductPrice(productForCalculation);
    const finalPrice = priceData.finalPrice;

    // UPDATE PRODUCT
    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },

      data: {
        name: body.name ?? existingProduct.name,

        description:
          body.description ??
          existingProduct.description,

        slug:
          body.name
            ? body.name
                .toLowerCase()
                .replace(/\s+/g, "-")
            : existingProduct.slug,

        sku:
          body.sku ??
          existingProduct.sku,

        type,

        purity,

        makingCharges,

        weight,

        stonePrice,

        // AUTO CALCULATED PRICE
        price: finalPrice,

        comparePrice:
          body.comparePrice !== undefined
            ? Number(body.comparePrice)
            : existingProduct.comparePrice,

        isFeatured:
          body.isFeatured !== undefined
            ? body.isFeatured
            : existingProduct.isFeatured,

        isActive:
          body.isActive !== undefined
            ? body.isActive
            : existingProduct.isActive,

        tags:
          body.tags || existingProduct.tags,
      },
    });

    return NextResponse.json({
  ...updatedProduct,
  dynamicPrice: finalPrice
});

  } catch (error: any) {
    console.error("PATCH PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to update product",
        message: error.message,
      },
      { status: 500 }
    );
  }
}