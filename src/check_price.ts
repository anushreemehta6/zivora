import { prisma } from '../lib/prisma';
async function main() {
  const p = await prisma.product.findUnique({
    where: { slug: 'mangalsutra' },
    include: { category: true }
  });
  console.log('MANGALSUTRA:', JSON.stringify(p, null, 2));
  
  const rates = await prisma.metalRate.findMany();
  console.log('RATES:', JSON.stringify(rates, null, 2));
}
main().finally(() => prisma.$disconnect());
