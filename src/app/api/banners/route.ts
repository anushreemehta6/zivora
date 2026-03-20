import { prisma } from "../../../../lib/prisma"

export async function GET() {
  const banners = await prisma.banner.findMany({
    where: { isActive: true }
  })

  return Response.json(banners)
}