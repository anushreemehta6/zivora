import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },

      data: {
        name: body.name,
        description: body.description,
        slug: body.slug,
        price: body.price ? Number(body.price) : null,
        comparePrice: body.comparePrice
          ? Number(body.comparePrice)
          : null,
        sku: body.sku,
        type: body.type,
        purity: body.purity,
        makingCharges: body.makingCharges
          ? Number(body.makingCharges)
          : null,
        weight: body.weight
          ? Number(body.weight)
          : null,
        stonePrice: body.stonePrice
          ? Number(body.stonePrice)
          : null,

        isFeatured: body.isFeatured,
        isActive: body.isActive,

        tags: body.tags || [],
      },
    });

    return NextResponse.json(updatedProduct);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}