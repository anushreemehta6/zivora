import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const { rating, comment, userId } = body;

    if (!rating || !userId) {
      return NextResponse.json(
        { error: "Rating and User ID are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: "Authorized user not found. Please log in again." },
        { status: 401 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { slug }
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const review = await prisma.review.create({
      data: {
        rating: Number(rating),
        comment,
        userId,
        productId: product.id
      }
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Review error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
