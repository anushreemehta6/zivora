import { prisma } from './lib/prisma';

async function main() {
  try {
    console.log('=== DB METAL RATES & PRODUCTS INSPECTION ===');
    
    const metalRates = await prisma.metalRate.findMany();
    console.log('\n--- Metal Rates in DB ---');
    console.log(JSON.stringify(metalRates, null, 2));
    
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        purity: true,
        weight: true
      }
    });
    console.log('\n--- Products in DB ---');
    console.log(JSON.stringify(products, null, 2));
    
  } catch (err: any) {
    console.error('Error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
