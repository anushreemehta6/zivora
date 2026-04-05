import { prisma } from './lib/prisma';

async function main() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true, images: true },
      take: 5
    });
    console.log('--- PRODUCTS ---');
    console.log(JSON.stringify(products, null, 2));

    const metalRates = await prisma.metalRate.findMany();
    console.log('--- METAL RATES ---');
    console.log(JSON.stringify(metalRates, null, 2));
  } catch (err: any) {
    console.error('--- DEBUG ERROR ---');
    console.error(err.message || err);
    if (err.code) console.error('Error Code:', err.code);
    if (err.meta) console.error('Error Meta:', JSON.stringify(err.meta));
  } finally {
    await prisma.$disconnect();
  }
}

main();
