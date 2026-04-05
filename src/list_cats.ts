import { prisma } from './lib/prisma';
async function main() {
  const cats = await prisma.category.findMany();
  console.log('CATEGORIES:', JSON.stringify(cats, null, 2));
}
main().finally(() => prisma.$disconnect());
