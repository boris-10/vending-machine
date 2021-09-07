// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import { hash } from 'bcrypt'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

function hashPassword(password: string) {
  if (process.env.BCRYPT_SALT == null) {
    throw new Error('env.BCRYPT_SALT missing')
  }
  return hash(password, Number(process.env.BCRYPT_SALT))
}

async function main() {
  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      username: 'test1@example.com',
      password: await hashPassword('123456'),
      role: 'seller',
    },
  })

  await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      username: 'test2@example.com',
      password: await hashPassword('123456'),
      role: 'seller',
    },
  })

  await prisma.user.upsert({
    where: { id: 3 },
    update: {},
    create: {
      username: 'test3@example.com',
      password: await hashPassword('123456'),
    },
  })

  await prisma.user.upsert({
    where: { id: 4 },
    update: {},
    create: {
      username: 'test4@example.com',
      password: await hashPassword('123456'),
    },
  })

  await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: {
      productName: 'Apple',
      amountAvailable: 3,
      cost: 10,
      sellerId: 1,
    },
  })

  await prisma.product.upsert({
    where: { id: 2 },
    update: {},
    create: {
      productName: 'Soda',
      amountAvailable: 8,
      cost: 7,
      sellerId: 1,
    },
  })

  await prisma.product.upsert({
    where: { id: 3 },
    update: {},
    create: {
      productName: 'Banana',
      amountAvailable: 1,
      cost: 4,
      sellerId: 2,
    },
  })

  await prisma.product.upsert({
    where: { id: 4 },
    update: {},
    create: {
      productName: 'Coffee',
      amountAvailable: 2,
      cost: 12,
      sellerId: 2,
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
