import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const { code, discount, discountType, isActive, expiryDate, minAmount } = await req.json();
    const coupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        discount: Number(discount),
        discountType,
        isActive: isActive ?? true,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        minAmount: minAmount ? Number(minAmount) : null,
      }
    });
    return NextResponse.json(coupon);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create coupon", details: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(coupons);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch coupons" }, { status: 500 });
  }
}