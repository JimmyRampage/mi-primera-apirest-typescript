import prisma from './prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const password = '1234';
  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@email.com',
      password: hash,
      phone: '+34123456789'
    }
  });

  console.log('Usuario creado:', user);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// ejecutar con npx ts-node src/utils/seed.ts