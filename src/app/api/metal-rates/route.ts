import { prisma } from "../../../../lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const rates = await prisma.metalRate.findMany()

  return NextResponse.json(rates)
}