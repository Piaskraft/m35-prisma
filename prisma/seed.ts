import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Czyścimy dane (kolejność ważna: najpierw zależne)
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  // Produkty startowe
  const p1 = await prisma.product.create({
    data: { name: 'Klucz 17', price: 49, description: 'CR-V' },
  });
  const p2 = await prisma.product.create({
    data: { name: 'Zestaw bitów', price: 29 },
  });

  // Przykładowe zamówienia powiązane z produktami
  await prisma.order.create({
    data: { productId: p1.id, client: 'Jan Nowak', address: 'Berlin, DE' },
  });
  await prisma.order.create({
    data: { productId: p2.id, client: 'Marta Kowalska', address: 'Hamburg, DE' },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
