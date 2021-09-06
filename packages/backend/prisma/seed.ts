import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      username: 'test1@example.com',
      password: '123456',
    },
  })

  await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      username: 'test2@example.com',
      password: '123456',
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
