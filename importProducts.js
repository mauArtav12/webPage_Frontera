const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  const rawData = fs.readFileSync('products.json');
  const products = JSON.parse(rawData);

  for (const product of products) {
    // Ignorar el id del JSON para que PostgreSQL genere uno nuevo
    const { id, ...rest } = product;
    await prisma.product.create({ data: rest });
  }

  console.log('✅ Productos importados');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
