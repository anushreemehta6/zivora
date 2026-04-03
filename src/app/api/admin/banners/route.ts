import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const { title, image, link, isActive } = await req.json();
    const banner = await prisma.banner.create({
      data: { title, image, link, isActive: isActive ?? true }
    });
    return NextResponse.json(banner);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create banner", details: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(banners);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch banners" }, { status: 500 });
  }
}
