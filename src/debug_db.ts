import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkMetalRates() {
  const rates = await prisma.metalRate.findMany();
  console.log("METAL RATES IN DB:", JSON.stringify(rates, null, 2));

  const products = await prisma.product.findMany({
    take: 5,
    include: { category: true }
  });
  console.log("SAMPLE PRODUCTS:", JSON.stringify(products.map(p => ({
    name: p.name,
    type: p.type,
    purity: p.purity,
    price: p.price
  })), null, 2));
}

checkMetalRates()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
